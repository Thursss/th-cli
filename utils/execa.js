const execa = require('execa')

exports.run = (command, args) => {
	if (!args) [command, ...args] = command.split(/\s+/)
	return execa(command, args)
}
