// Polyfill Buffer for browser (required for isomorphic-git in Vite/webpack)
import { Buffer } from "buffer";
if (typeof window !== "undefined" && !window.Buffer) {
  window.Buffer = Buffer;
}

import { ZipReader, ZipWriter, Uint8ArrayWriter, TextReader, BlobReader, BlobWriter, Uint8ArrayReader } from "@zip.js/zip.js";
import { ref } from "vue";

const defaultMeta = {
  mode: 0o100644,
  mtime: () => new Date(),
  ctime: () => new Date(),
  atime: () => new Date(),
  symlink: false,
  directory: false,
  data: undefined,
  target: undefined,
};

// Helper for error creation
function makeFsError(type, message, code, errno) {
  const err = new Error(`${type}: ${message}`);
  err.code = code;
  err.errno = errno;
  return err;
}

export let fs

export class ZipGitFS {
  constructor(zipBlob = null, options, temporary = false) {
    this.entries = new Map();
    this.modified = new Set();
    this.dirIndex = new Map(); // Directory index for faster lookups
    this._initDirIndex(".git/");
    this.entries.set(".git/", { filename: ".git/", directory: true });
    this.ready = zipBlob ? this.loadFromBlob(zipBlob, options) : Promise.resolve();
    this._queue = Promise.resolve(); // Async queue for mutating ops
    if (!temporary) { fs = this }
  }

  async loadFromBlob(zipBlob, options) {
    const zipReader = new ZipReader(new BlobReader(zipBlob), options);
    const entries = await zipReader.getEntries();
    await Promise.all(
      entries.map(async (entry) => {
        if (!entry.directory) {
          const data = await entry.getData(new Uint8ArrayWriter());
          this.entries.set(
            entry.filename,
            this._createFileEntry(entry.filename, data)
          );
        } else {
          this.entries.set(
            entry.filename,
            this._createDirEntry(entry.filename)
          );
        }
      })
    );
    await zipReader.close();
  }

  async readFile(filepath, options = {}) {
    const normalizedPath = filepath.startsWith("/")
      ? filepath.slice(1)
      : filepath;
    const entry = this.entries.get(normalizedPath);
    if (!entry || entry.directory) {
      throw makeFsError(
        "ENOENT",
        `no such file or directory, open '${filepath}'`,
        "ENOENT",
        -2
      );
    }
    if (options.encoding === "utf8") {
      return new TextDecoder().decode(entry.data);
    }
    return entry.data;
  }

  async writeFile(filepath, data, options = {}) {
    return this._enqueue(async () => {
      const path = filepath.startsWith("/")
        ? filepath.slice(1)
        : filepath;
      this.entries.set(
        path,
        this._createFileEntry(path, data, options)
      );
      this.modified.add(path);
    });
  }

  async mkdir(dirpath, options = {}) {
    return this._enqueue(async () => {
      const dirPath = (dirpath.startsWith("/") ? dirpath.slice(1) : dirpath) + (dirpath.endsWith("/") ? "" : "/");
      this.entries.set(dirPath, this._createDirEntry(dirPath, options));
      this.modified.add(dirPath);
    });
  }

  async readdir(dirpath) {
    const searchPath = dirpath.startsWith("/")
      ? dirpath.slice(1) + (dirpath.endsWith("/") ? "" : "/")
      : dirpath + (dirpath.endsWith("/") ? "" : "/");
    const children = this.dirIndex.get(searchPath) || new Set();
    return Array.from(children);
  }

  async stat(filepath) {
    const normalizedPath = filepath.startsWith("/")
      ? filepath.slice(1)
      : filepath;
    const currentTime = new Date();
    const entry = this.entries.get(normalizedPath);
    if (entry) {
      const isDir = entry.directory;
      return {
        dev: 1,
        ino: 1,
        mode: entry.mode || (isDir ? 0o40755 : 0o100644),
        nlink: 1,
        uid: 1,
        gid: 1,
        rdev: 0,
        size: entry.data ? entry.data.length : 0,
        blksize: 4096,
        blocks: Math.ceil((entry.data ? entry.data.length : 0) / 4096),
        atimeMs: entry.atime ? entry.atime.getTime() : currentTime.getTime(),
        mtimeMs: entry.mtime ? entry.mtime.getTime() : currentTime.getTime(),
        ctimeMs: entry.ctime ? entry.ctime.getTime() : currentTime.getTime(),
        birthtimeMs: entry.ctime
          ? entry.ctime.getTime()
          : currentTime.getTime(),
        atime: entry.atime || currentTime,
        mtime: entry.mtime || currentTime,
        ctime: entry.ctime || currentTime,
        birthtime: entry.ctime || currentTime,
        type: isDir ? "dir" : entry.symlink ? "symlink" : "file",
        isFile: () => !isDir && !entry.symlink,
        isDirectory: () => isDir,
        isSymbolicLink: () => !!entry.symlink,
        isBlockDevice: () => false,
        isCharacterDevice: () => false,
        isFIFO: () => false,
        isSocket: () => false,
      };
    }
    const dirPath = normalizedPath.endsWith("/")
      ? normalizedPath
      : normalizedPath + "/";
    const hasChildren = Array.from(this.entries.keys()).some(
      (key) => key.startsWith(dirPath) && key !== dirPath
    );
    if (hasChildren)
      return {
        dev: 1,
        ino: 1,
        mode: 0o40755,
        nlink: 1,
        uid: 1,
        gid: 1,
        rdev: 0,
        size: 0,
        blksize: 4096,
        blocks: 0,
        atimeMs: currentTime.getTime(),
        mtimeMs: currentTime.getTime(),
        ctimeMs: currentTime.getTime(),
        birthtimeMs: currentTime.getTime(),
        atime: currentTime,
        mtime: currentTime,
        ctime: currentTime,
        birthtime: currentTime,
        type: "dir",
        isFile: () => false,
        isDirectory: () => true,
        isSymbolicLink: () => false,
        isBlockDevice: () => false,
        isCharacterDevice: () => false,
        isFIFO: () => false,
        isSocket: () => false,
      };
    throw makeFsError(
      "ENOENT",
      `no such file or directory, stat '${filepath}'`,
      "ENOENT",
      -2
    );
  }

  async lstat(filepath) {
    return this.stat(filepath);
  }

  async unlink(filepath) {
    return this._enqueue(async () => {
      const path = filepath.startsWith("/")
        ? filepath.slice(1)
        : filepath;
      if (!this.entries.has(path)) {
        throw makeFsError(
          "ENOENT",
          `no such file or directory, unlink '${filepath}'`,
          "ENOENT",
          -2
        );
      }
      this.entries.delete(path);
      this.modified.add(path);
      this._initDirIndex(path);
    });
  }

  async rmdir(dirpath, options = {}) {
    return this._enqueue(async () => {
      const dirPath = (dirpath.startsWith("/") ? dirpath.slice(1) : dirpath) + (dirpath.endsWith("/") ? "" : "/");
      const children = await this.readdir(dirpath);
      if (children.length > 0 && !options.recursive) {
        throw makeFsError(
          "ENOTEMPTY",
          `directory not empty, rmdir '${dirpath}'`,
          "ENOTEMPTY",
          -39
        );
      }
      if (options.recursive) {
        for (const child of children) {
          const childPath = dirPath + child;
          const entry =
            this.entries.get(childPath) || this.entries.get(childPath + "/");
          if (entry && entry.directory) {
            await this.rmdir(childPath, { recursive: true });
          } else {
            await this.unlink(childPath);
          }
        }
      }
      this.entries.delete(dirPath);
      this.modified.add(dirPath);
      this.dirIndex.delete(dirPath);
    });
  }

  async exportZip(options) {
    return this._enqueue(async () => {
      const zipWriter = new ZipWriter(new BlobWriter(), options);
      for (const [filename, entry] of this.entries) {
        if (entry.directory) {
          // Export empty directories
          await zipWriter.add(filename, new TextReader(""));
          continue;
        }
        if (entry.symlink) {
          // Store symlink as a special file
          await zipWriter.add(
            filename,
            new TextReader(`SYMLINK:${entry.target}`)
          );
          continue;
        }
        const data = entry.data || new Uint8Array(0);
        await zipWriter.add(filename, new Uint8ArrayReader(data));
      }
      this.modified.clear(); // Clear modified after export
      return await zipWriter.close();
    });
  }

  async exists(filepath) {
    try {
      await this.stat(filepath);
      return true;
    } catch {
      return false;
    }
  }

  async readlink(filepath) {
    const normalizedPath = filepath.startsWith("/")
      ? filepath.slice(1)
      : filepath;
    const entry = this.entries.get(normalizedPath);
    if (!entry || !entry.symlink) {
      throw makeFsError("EINVAL", "not a symlink", "EINVAL", -22);
    }
    return entry.target;
  }

  async symlink(target, path) {
    return this._enqueue(async () => {
      const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
      this.entries.set(
        normalizedPath,
        this._createSymlinkEntry(normalizedPath, target)
      );
      this.modified.add(normalizedPath);
    });
  }

  async chmod(filepath, mode) {
    return this._enqueue(async () => {
      const path = filepath.startsWith("/")
        ? filepath.slice(1)
        : filepath;
      const entry = this.entries.get(path);
      if (entry) {
        entry.mode = mode;
        this.modified.add(path);
      }
    });
  }

  async utimes(filepath, atime, mtime) {
    return this._enqueue(async () => {
      const path = filepath.startsWith("/")
        ? filepath.slice(1)
        : filepath;
      const entry = this.entries.get(path);
      if (entry) {
        entry.atime = new Date(atime);
        entry.mtime = new Date(mtime);
        this.modified.add(path);
      }
    });
  }

  _enqueue(fn) {
    this._queue = this._queue.then(() => fn()).catch(() => { });
    return this._queue;
  }

  _initDirIndex(path) {
    const parts = path.split("/").filter(Boolean);
    let current = "";
    for (const part of parts) {
      const parent = current;
      current = current + part + "/";
      let children = this.dirIndex.get(parent) || new Set();
      children.add(part);
      this.dirIndex.set(parent, children);
    }
  }

  dispose() {
    this.entries.clear();
    this.modified.clear();
    this.dirIndex.clear();
  }

  _createFileEntry(filename, data, options = {}) {
    const now = new Date();
    const entry = {
      filename,
      ...defaultMeta,
      ...options,
      data:
        data instanceof Uint8Array
          ? data
          : typeof data === "string"
            ? new TextEncoder().encode(data)
            : data,
      directory: false,
      symlink: false,
      mtime: now,
      ctime: now,
      atime: now,
    };
    this._initDirIndex(filename);
    return entry;
  }

  _createDirEntry(filename, options = {}) {
    const now = new Date();
    const entry = {
      filename,
      ...defaultMeta,
      ...options,
      directory: true,
      symlink: false,
      mode: options.mode || 0o40755,
      mtime: now,
      ctime: now,
      atime: now,
    };
    this._initDirIndex(filename);
    return entry;
  }

  _createSymlinkEntry(filename, target, options = {}) {
    const now = new Date();
    const entry = {
      filename,
      ...defaultMeta,
      ...options,
      directory: false,
      symlink: true,
      target,
      mode: 0o120777,
      mtime: now,
      ctime: now,
      atime: now,
    };
    this._initDirIndex(filename);
    return entry;
  }
}
