#! /usr/bin/env node

const program = require('commander')

// 版本号
program.version(require('../package.json').version, '-v', 'version')

program
	// 定义命令和参数
	.command('init <type>')
	.description('创建新项目')
	.action((type) => {
		require('../lib/init')(type)
	})

// 解析命令行
program.parse(process.argv)
