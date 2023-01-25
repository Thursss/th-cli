#! /usr/bin/env node

const program = require('commander')

program
	// 定义命令和参数
	.command('create [name]')
	.description('create a new project')
	// -f or --force 为强制创建，如果创建的目录存在则直接覆盖
	.option('-f, --force', 'overwrite target directory if it exist')
	.action((name, options) => {
		// 打印结果，输出用户手动输入的项目名字
		console.log('name:', name)
	})

program
	// 配置版本号信息
	.version(`v${require('../package.json').version}`)
	.usage('<command> [option]')

// 解析用户执行命令传入参数
program.parse(process.argv)
