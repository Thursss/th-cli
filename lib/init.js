const fs = require('fs')
const chalk = require('chalk')
const symbols = require('log-symbols')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const ora = require('ora')
const handlebars = require('handlebars')

const templateGitMap = {
	uniapp: 'direct:https://gitee.com/thursss/uniapp-template.git#master',
}

module.exports = async function init(type) {
	const gitUrl = templateGitMap[type]

	if (!gitUrl) {
		console.log(symbols.warning, chalk.yellow('还没有这种模板...'))
		return
	}

	const answers = await inquirer.prompt([
		{
			name: 'name',
			message: '请输入项目名称',
		},
		{
			name: 'author',
			message: '请输入作者名称',
		},
		{
			name: 'description',
			message: '请输入项目描述',
		},
	])

	// 错误提示项目已存在，避免覆盖原有项目
	if (fs.existsSync(answers.name)) {
		console.log(symbols.error, chalk.red('项目已存在'))
		return
	}

	const spinner = ora('正在下载模板...')
	spinner.start()

	download(
		gitUrl,
		answers.name,
		{
			clone: true,
		},
		(err) => {
			if (!err) {
				spinner.succeed()

				const meta = {
					name: answers.name,
					description: answers.description,
					author: answers.author,
				}
				const fileName = `${answers.name}/package.json`
				if (fs.existsSync(fileName)) {
					const content = fs.readFileSync(fileName).toString()
					const result = handlebars.compile(content)(meta)
					fs.writeFileSync(fileName, result)
				}

				console.log(symbols.success, chalk.green('项目初始化完成'))
			} else {
				spinner.fail()
				console.log(symbols.error, chalk.red(`拉取远程仓库失败 ${err}`))
			}
		}
	)

	console.log(answers.description, answers.author)
}
