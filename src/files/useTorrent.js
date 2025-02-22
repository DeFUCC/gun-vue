/**
 * File handling functions
 * @module Torrent
 * @group Files
 * */

// https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#torrentonwire-function-wire-
// https://github.com/webtorrent/parse-torrent

import { ref, reactive } from "vue";
import { useStorage } from "@vueuse/core";

import WebTorrent from "webtorrent/dist/webtorrent.min.js"

export const defaultTrackers = [
	'udp://tracker.leechers-paradise.org:6969',
	'udp://tracker.coppersurfer.tk:6969',
	'udp://tracker.opentrackr.org:1337',
	'udp://explodie.org:6969',
	'udp://tracker.empire-js.us:1337',
	'wss://tracker.btorrent.xyz',
	'wss://tracker.openwebtorrent.com'
]

export const trackers = useStorage('trackers', defaultTrackers)

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
	let filesDir = null

	async function getFilesDirectory() {
		const dir = await opfsRoot.getDirectoryHandle('files', { create: true })
		return dir
	}

	function buildMagnetUri(infoHash) {
		const encodedTrackers = trackers.value.map(t => `&tr=${encodeURIComponent(t)}`).join('')
		return `magnet:?xt=urn:btih:${infoHash}${encodedTrackers}`
	}

	function sanitizeFileName(name) {
		return name.replace(/[^a-zA-Z0-9.-]/g, '_')
	}

	async function getMetadata(filename) {
		try {
			const metaHandle = await filesDir.getFileHandle(`${filename}.meta.json`)
			const metaFile = await metaHandle.getFile()
			const text = await metaFile.text()
			return JSON.parse(text)
		} catch (e) {
			return null
		}
	}

	async function saveMetadata(filename, metadata) {
		const metaHandle = await filesDir.getFileHandle(`${filename}.meta.json`, { create: true })
		const writable = await metaHandle.createWritable()
		await writable.write(JSON.stringify(metadata))
		await writable.close()
	}

	async function init() {
		try {
			opfsRoot = await navigator.storage.getDirectory()
			filesDir = await getFilesDirectory()
			webTorrentClient = new WebTorrent()
			initialized.value = true
			await loadStoredFiles()
		} catch (e) {
			console.error('Torrent system initialization failed:', e)
			return false
		}
	}

	async function loadStoredFiles() {
		if (!filesDir) return
		for await (const [name] of filesDir.entries()) {
			if (name.endsWith('.meta.json')) continue // Skip metadata files
			const metadata = await getMetadata(name)
			if (!metadata) continue

			const file = await loadFromOPFS(name)
			if (file) {
				const newFile = new File([file], metadata.originalName, {
					type: metadata.type
				})
				await shareFile(newFile, name)
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
		await filesDir?.removeEntry(filename)
		await filesDir?.removeEntry(`${filename}.meta.json`).catch(() => { })
		files.delete(filename)
	}

	async function saveToOPFS(file) {
		if (!filesDir) return null
		try {
			const safeFileName = sanitizeFileName(file.name)
			const fileHandle = await filesDir.getFileHandle(safeFileName, { create: true })
			const writable = await fileHandle.createWritable()
			await writable.write(file)
			await writable.close()


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
		if (!filesDir) return null
		try {
			const fileHandle = await filesDir.getFileHandle(filename)
			return await fileHandle.getFile()
		} catch (e) {
			console.error('Error loading from OPFS:', e)
			return null
		}
	}

	async function download(id) {
		if (!initialized.value) await init()

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
			if (old) {
				handler(old)
			} else {
				const magnetUri = buildMagnetUri(id)
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
		deleteFile,
		trackers
	}
}
