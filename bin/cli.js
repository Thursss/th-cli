#! /usr/bin/env node

const program = require('commander')

// 版本号
program.version(require('../package.json').version, '-v', 'version')

program
	.command('init <template-name> <object-name>')
	.description('初始化新项目')
	.action((template, name) => {
		require('../lib/init')(template, name)
	})

//
program
	.command('create <object-name>')
	.description('创建新项目')
	.action((name) => {
		require('../lib/create')(name)
	})

// 解析命令行
program.parse(process.argv)
