const fs = require('fs')
const path = require('path')

const fse = require('fs-extra')

function deleteRemovedFiles(directory, newFiles, previousFiles) {
	// get all files that are not in the new filesystem and are still existing
	const filesToDelete = Object.keys(previousFiles).filter(
		(filename) => !newFiles[filename]
	)

	// delete each of these files
	return Promise.all(
		filesToDelete.map((filename) => {
			return fse.unlink(path.join(directory, filename))
		})
	)
}

/**
 * 写入文件
 * @param {string} dir
 * @param {Record<string,string|Buffer>} files
 * @param {Record<string,string|Buffer>} [previousFiles]
 * @param {Set<string>} [include]
 */
exports.writeFileTree = (
	dir,
	files,
	// previousFiles,
	include
) => {
	// if (previousFiles) {
	// 	await deleteRemovedFiles(dir, files, previousFiles)
	// }
	Object.keys(files).forEach((name) => {
		if (include && !include.has(name)) return

		const filePath = path.join(dir, name)
		if (typeof files[name] === 'object') {
			this.writeFileTree(filePath, files[name], include)
		} else {
			fse.ensureDirSync(path.dirname(filePath))
			fse.writeFileSync(filePath, files[name])
		}
	})
}

/**
 * 读取文件
 * @param {string} dir
 * @param {string} mode
 * @param {set<string>} exclude
 */
exports.readFileTree = (dir, mode, exclude) => {
	if (!fs.existsSync(dir)) return

	const dirCurren = fs.readdirSync(dir)
	const fileTree = {}

	dirCurren.forEach((name) => {
		if (exclude && exclude?.has(name)) return

		const filePath = path.join(dir, name)
		const info = fs.statSync(filePath)
		if (info.isDirectory()) {
			fileTree[name] =
				mode === 'details'
					? {
							name,
							path: filePath,
							...this.readFileTree(filePath, mode, exclude),
					  }
					: this.readFileTree(filePath, mode, exclude)
		} else {
			fileTree[name] =
				mode === 'details'
					? {
							path: filePath,
							name,
							data: fs.readFileSync(filePath, 'utf8'),
					  }
					: fs.readFileSync(filePath, 'utf8')
		}
	})

	return fileTree
}
