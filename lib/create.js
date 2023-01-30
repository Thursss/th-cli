const path = require('path')

const { run } = require('../utils/execa')
const { writeFileTree, readFileTree } = require('../utils/fse')
// const { log } = require('../utils/logger')

module.exports = async function create(name) {
	const { stdout } = await run('npm root -g')
	const templateFileTree = readFileTree(
		path.join(stdout, require('../package.json').name, 'template')
	)

	const modulesFileTree = readFileTree(
		path.join(stdout, require('../package.json').name, 'modules'),
		'details'
	)

	console.log('modulesFileTree: \n', modulesFileTree)

	writeFileTree(name, templateFileTree)
}
