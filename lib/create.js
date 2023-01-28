const { writeFileTree } = require('../utils/index')
// const { log } = require('../utils/logger')

module.exports = function create(name) {
	writeFileTree(name, {
		'Rademe.md': 'Rademe',
	})
}
