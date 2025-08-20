## Here's what we have for now

```js
async function mergeFromZip(zipBlob, options = {}) {
	const tempFs = new ZipGitFS(zipBlob, options, true);
	await tempFs.ready;
	// Only import files not under .git/
	const importFiles = Array.from(tempFs.entries.keys()).filter(
		(f) => !f.endsWith("/") && !f.startsWith(".git/")
	);
	if (!importFiles.length)
		return { success: false, error: "No files to import." };
	const preview =
		importFiles.slice(0, 20).join("\n") +
		(importFiles.length > 20 ? `\n...and ${importFiles.length - 20} more` : "");
	if (!window.confirm(`Import these files?\n\n${preview}`))
		return { success: false, error: "User cancelled import." };
	const importBranch = `import-${Date.now()}`;
	try {
		await git.branch({ fs, dir: "/", ref: importBranch });
		await git.checkout({ fs, dir: "/", ref: importBranch });
		// Only add/overwrite files from zip, do not remove any existing files
		for (const path of importFiles)
			ensureParentDirs(fs, path),
				fs.entries.set(path, { ...tempFs.entries.get(path) }),
				fs.modified.add(path);
		await git.add({ fs, dir: "/", filepath: "." });
		await git.commit({
			fs,
			dir: "/",
			message: "Import from uploaded zip",
			author: { name: "System", email: "system@import" },
		});
		await git.checkout({ fs, dir: "/", ref: "main" });
		const result = await git.merge({
			fs,
			dir: "/",
			ours: "main",
			theirs: importBranch,
		});
		await git.deleteBranch({ fs, dir: "/", ref: importBranch });
		return {
			success: true,
			conflicts: result.conflicts || [],
			mergeCommit: result.oid,
		};
	} catch (error) {
		try {
			await git.checkout({ fs, dir: "/", ref: "main", force: true });
			await git.deleteBranch({ fs, dir: "/", ref: importBranch });
		} catch (e) {
			console.log(e);
		}
		return { success: false, error: error.message };
	} finally {
		tempFs.dispose();
	}
}

function ensureParentDirs(fs, filePath) {
	const parts = filePath.split("/");
	for (let i = 1; i < parts.length; i++) {
		const dir = parts.slice(0, i).join("/") + "/";
		if (dir && !fs.entries.has(dir))
			fs.entries.set(dir, fs._createDirEntry(dir));
	}
}

const uploadStatus = ref("");
const isUploading = ref(false);

async function uploadRepo(ev) {
	const file = ev.target.files[0];
	if (!file?.name.endsWith(".zip")) {
		uploadStatus.value = "Please select a .zip file";
		return;
	}

	isUploading.value = true;
	uploadStatus.value = "Merging uploaded repository...";

	try {
		const password = window.prompt("Zip file password");
		const result = await mergeFromZip(file, { password });

		if (result.success) {
			uploadStatus.value = "Successfully merged uploaded repository";
			await saveRepo();
			await refreshRepoState();
		} else {
			uploadStatus.value = `Merge failed: ${result.error}`;
		}
	} catch (error) {
		uploadStatus.value = `Upload failed: ${error.message}`;
	} finally {
		isUploading.value = false;
		ev.target.value = "";
	}
}
```
