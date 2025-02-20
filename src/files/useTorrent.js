/**
 * File handling functions
 * @module Torrent
 * @group Files
 * */

// https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#torrentonwire-function-wire-
// https://github.com/webtorrent/parse-torrent

import { ref, reactive } from "vue";

export function useTorrent() {
	const files = reactive(new Map())
	const initialized = ref(false)
	const downloadStatus = reactive({
		done: false,
		progress: 0,
		downloadSpeed: 0,
		downloaded: 0,
	})
	let opfsRoot = null
	let webTorrentClient = null

	function sanitizeFileName(name) {
		return name.replace(/[^a-zA-Z0-9.-]/g, '_')
	}

	async function getMetadata(filename) {
		try {
			const metaHandle = await opfsRoot.getFileHandle(`${filename}.meta.json`)
			const metaFile = await metaHandle.getFile()
			const text = await metaFile.text()
			return JSON.parse(text)
		} catch (e) {
			return null
		}
	}

	async function saveMetadata(filename, metadata) {
		const metaHandle = await opfsRoot.getFileHandle(`${filename}.meta.json`, { create: true })
		const writable = await metaHandle.createWritable()
		await writable.write(JSON.stringify(metadata))
		await writable.close()
	}

	async function init() {
		try {
			opfsRoot = await navigator.storage.getDirectory()
			const WebTorrent = (await import("webtorrent/dist/webtorrent.min.js")).default
			webTorrentClient = new WebTorrent()
			initialized.value = true
			await loadStoredFiles()
		} catch (e) {
			console.error('Torrent system initialization failed:', e)
			return false
		}
	}

	async function loadStoredFiles() {
		if (!opfsRoot) return
		for await (const [name] of opfsRoot.entries()) {
			if (name.endsWith('.meta.json')) continue // Skip metadata files
			const metadata = await getMetadata(name)
			if (!metadata) continue

			const file = await loadFromOPFS(name)
			if (file) {
				const newFile = new File([file], metadata.originalName, {
					type: metadata.type
				})
				await shareFile(newFile, name)
				console.log('Loaded file:', metadata.originalName)
			}
		}
	}

	async function shareFile(file, name) {
		return new Promise((resolve) => {
			webTorrentClient.seed([file], (torrent) => {
				files.set(name, {
					file,
					torrent,
					info: {
						infoHash: torrent.infoHash,
						magnetURI: torrent.magnetURI,
						name: torrent.name,
						length: torrent.length
					}
				})
				resolve(files.get(name))
			})
		})
	}

	async function upload(inputFiles) {
		if (!initialized.value) await init()
		const results = []

		for (const file of inputFiles) {
			const savedName = await saveToOPFS(file)
			if (savedName) {
				const result = await shareFile(file, savedName)
				results.push(result)
			}
		}
		return results
	}

	async function deleteFile(filename) {
		const fileData = files.get(filename)
		if (fileData?.torrent) {
			fileData.torrent.destroy()
		}
		await opfsRoot?.removeEntry(filename)
		await opfsRoot?.removeEntry(`${filename}.meta.json`).catch(() => { })
		files.delete(filename)
	}

	async function saveToOPFS(file) {
		if (!opfsRoot) return null
		try {
			const safeFileName = sanitizeFileName(Date.now() + '_' + file.name)
			const fileHandle = await opfsRoot.getFileHandle(safeFileName, { create: true })
			const writable = await fileHandle.createWritable()
			await writable.write(file)
			await writable.close()

			// Save metadata separately
			await saveMetadata(safeFileName, {
				originalName: file.name,
				type: file.type,
				lastModified: file.lastModified
			})

			return safeFileName
		} catch (e) {
			console.error('Error saving to OPFS:', e)
			return null
		}
	}

	async function loadFromOPFS(filename) {
		if (!opfsRoot) return null
		try {
			const fileHandle = await opfsRoot.getFileHandle(filename)
			return await fileHandle.getFile()
		} catch (e) {
			console.error('Error loading from OPFS:', e)
			return null
		}
	}

	async function download(id) {
		if (!initialized.value) await init()

		const magnetUri = `magnet:?xt=urn:btih:${id}&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com`



		return new Promise(async (resolve) => {

			function handler(torrent) {
				const torrentFiles = torrent.files
				webTorrentClient.on('download', (torrent) => {
					Object.assign(downloadStatus, {
						done: torrent.done,
						progress: torrent.progress,
						downloaded: torrent.downloaded,
						downloadSpeed: torrent.downloadSpeed
					})
				})
				resolve(torrentFiles)
			}
			let old = await webTorrentClient.get(id)
			if (old) { handler(old) } else {
				webTorrentClient.add(magnetUri, handler)
			}


		})
	}

	return {
		files,
		initialized,
		downloadStatus,
		init,
		upload,
		download,
		deleteFile
	}
}
