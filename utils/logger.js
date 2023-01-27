const symbols = require('log-symbols')
const chalk = require('chalk')

exports.log = (text) => {
  console.log(symbols.info, text);
}

exports.success = (text) => {
  console.log(symbols.success, chalk.green(text))
}

exports.warn = (text) => {
  console.log(symbols.warning, chalk.yellow(text))
}

exports.error = (text) => {
  console.log(symbols.error, chalk.red(text))
}