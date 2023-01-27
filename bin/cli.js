#! /usr/bin/env node

const program = require('commander')

// 版本号
program.version(require('../package.json').version, '-v', 'version')

program
	// 定义命令和参数
	.command('init <template-name> <object-name>')
	.description('创建新项目')
	.action((template, name) => {
		require('../lib/init')(template, name)
	})

// 解析命令行
program.parse(process.argv)
