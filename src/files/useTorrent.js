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

// Memory-based fallback storage
class MemoryFileSystem {
	constructor() {
		this.files = new Map()
		this.metadata = new Map()
	}

	async getDirectoryHandle() {
		return this // self-reference for compatibility
	}

	async getFileHandle(name, options = {}) {
		if (!this.files.has(name) && options.create) {
			this.files.set(name, null)
		}
		return {
			createWritable: async () => ({
				write: async (data) => {
					this.files.set(name, data)
				},
				close: async () => { }
			}),
			getFile: async () => {
				const data = this.files.get(name)
				return new File([data], name)
			}
		}
	}

	async removeEntry(name) {
		this.files.delete(name)
		this.metadata.delete(name)
	}

	entries() {
		return Array.from(this.files.keys()).map(name => [name])
	}
}

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

	async function requestStoragePermission() {
		try {
			// Request persistent storage permission
			const persist = await navigator.storage.persist()
			if (!persist) {
				console.warn('Storage persistence denied')
			}
			// Check if we have enough storage quota
			const estimate = await navigator.storage.estimate()
			console.log(`Storage quota: ${estimate.quota} bytes`)
			console.log(`Storage usage: ${estimate.usage} bytes`)
			return true
		} catch (e) {
			console.error('Storage permission error:', e)
			return false
		}
	}

	async function initStorage() {
		try {
			// Check if we're in private/incognito mode
			const storageTest = await navigator.storage.estimate();
			if (!storageTest.quota) {
				throw new Error('Storage quota is 0, likely in private mode');
			}

			if ('storage' in navigator && 'getDirectory' in navigator.storage) {
				const permission = await navigator.permissions.query({
					name: 'persistent-storage'
				});

				if (permission.state === 'granted' || permission.state === 'prompt') {
					await requestStoragePermission();
					opfsRoot = await navigator.storage.getDirectory();
					filesDir = await getFilesDirectory();
					return true;
				}
			}

			throw new Error('Storage API not available or permission denied');
		} catch (e) {
			console.warn('OPFS not available, falling back to in-memory storage:', e);
			opfsRoot = new MemoryFileSystem();
			filesDir = opfsRoot;
			return true;
		}
	}

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
			await initStorage()
			webTorrentClient = new WebTorrent()
			// Add global download progress listener
			webTorrentClient.on('download', (bytes) => {
				const activeTorrent = webTorrentClient.torrents[webTorrentClient.torrents.length - 1]
				if (activeTorrent) {
					Object.assign(downloadStatus, {
						done: activeTorrent.done,
						progress: activeTorrent.progress,
						downloaded: activeTorrent.downloaded,
						downloadSpeed: activeTorrent.downloadSpeed
					})
				}
			})
			initialized.value = true
			await loadStoredFiles()
		} catch (e) {
			console.error('Torrent system initialization failed:', e)
			return false
		}
	}

	async function saveDownloadedFile(file, infoHash) {
		const safeFileName = sanitizeFileName(file.name)
		try {
			const fileHandle = await filesDir.getFileHandle(safeFileName, { create: true })
			const writable = await fileHandle.createWritable()
			const buffer = await file.arrayBuffer()
			await writable.write(buffer)
			await writable.close()

			await saveMetadata(safeFileName, {
				originalName: file.name,
				type: file.type || 'application/octet-stream',
				lastModified: Date.now(),
				infoHash
			})

			return safeFileName
		} catch (e) {
			console.error('Error caching downloaded file:', e)
			return null
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
				// If this was a downloaded file, try to use its original infoHash
				const options = metadata.infoHash ? { infoHash: metadata.infoHash } : undefined
				await shareFile(newFile, name, options)
			}
		}
	}

	async function shareFile(file, name, options = {}) {
		return new Promise((resolve) => {
			webTorrentClient.seed([file], options, (torrent) => {
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

	async function findFileByInfoHash(infoHash) {
		if (!filesDir) return null

		// Search through all files and their metadata
		for await (const [name] of filesDir.entries()) {
			if (name.endsWith('.meta.json')) continue
			const metadata = await getMetadata(name)
			if (metadata?.infoHash === infoHash) {
				const file = await loadFromOPFS(name)
				if (file) {
					// Create an enhanced File object with additional WebTorrent-like properties
					const enhancedFile = new File([file], metadata.originalName, {
						type: metadata.type
					})
					// Add WebTorrent-specific properties
					enhancedFile.path = metadata.originalName
					enhancedFile.length = file.size
					enhancedFile.progress = 1
					enhancedFile.downloaded = file.size
					// Add blob method to cached file
					enhancedFile.blob = async () => new Blob([await enhancedFile.arrayBuffer()], { type: enhancedFile.type })
					return enhancedFile
				}
			}
		}
		return null
	}

	async function download(id) {
		if (!initialized.value) await init()

		// First check if we already have this file cached
		const cachedFile = await findFileByInfoHash(id)
		if (cachedFile) {
			console.log('File found in cache, returning without download')
			return [cachedFile] // Return as array to match WebTorrent's files array format
		}

		return new Promise(async (resolve) => {
			function handler(torrent) {
				const torrentFiles = torrent.files.map(file => {
					// Add blob method to each file
					file.blob = () => new Promise((resolve, reject) => {
						// Create a stream from the file
						const chunks = []
						const stream = file.createReadStream()

						stream.on('data', chunk => chunks.push(chunk))
						stream.on('end', () => {
							const blob = new Blob(chunks, { type: file.type || 'application/octet-stream' })
							resolve(blob)
						})
						stream.on('error', reject)
					})
					return file
				})

				// Save files when download completes
				torrent.on('done', async () => {
					for (const file of torrentFiles) {
						await saveDownloadedFile(file, torrent.infoHash)
					}
				})

				resolve(torrentFiles)
			}

			let existing = await webTorrentClient.get(id)
			if (existing) {
				handler(existing)
			} else {
				const magnetUri = buildMagnetUri(id)
				webTorrentClient.add(magnetUri, handler)
			}
		})
	}

	async function clearFiles() {
		if (!filesDir) return

		// Stop all active torrents first
		for (const [filename, fileData] of files) {
			if (fileData?.torrent) {
				fileData.torrent.destroy()
			}
		}

		// Clear the files Map
		files.clear()

		try {
			// Clear the files directory
			for await (const [name] of filesDir.entries()) {
				await filesDir.removeEntry(name)
			}
			console.log('Files directory cleared successfully')
		} catch (error) {
			console.error('Error clearing files directory:', error)
			throw error
		}
	}

	async function clearOPFS() {
		if (!opfsRoot) return

		// Stop all torrents and clear files first
		await clearFiles()

		try {
			// Clear the entire OPFS root
			for await (const [name, handle] of opfsRoot.entries()) {
				if (handle.kind === 'file') {
					await opfsRoot.removeEntry(name)
				} else if (handle.kind === 'directory') {
					await opfsRoot.removeEntry(name, { recursive: true })
				}
			}
			console.log('OPFS cleared successfully')
		} catch (error) {
			console.error('Error clearing OPFS:', error)
			throw error
		}
	}

	return {
		files,
		initialized,
		downloadStatus,
		init,
		upload,
		download,
		deleteFile,
		trackers,
		clearFiles,
		clearOPFS
	}
}
