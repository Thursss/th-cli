const fs = require('fs')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const ora = require('ora')
const handlebars = require('handlebars')

const { run } = require('../utils/execa')
const { log, success, error } = require('../utils/logger')
const { hasGit } = require('../utils/env')

const templateGitMap = {
	'uniapp-vue3-ts': 'direct:https://gitee.com/thursss/uniapp-template.git#master',
}

module.exports = async function init(template, name) {
	const gitUrl = templateGitMap[template]

	if (!gitUrl) {
		log('还没有这种模板...')
		return
	}

	const answers = await inquirer.prompt([
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
	if (fs.existsSync(name)) {
		error('项目已存在')
		return
	}

	const spinner = ora('正在下载模板...')
	spinner.start()

	download(
		gitUrl,
		name,
		{
			clone: true,
		},
		async (err) => {
			if (!err) {
				spinner.succeed()

				const meta = {
					name: name,
					description: answers.description,
					author: answers.author,
				}
				const fileName = `${name}/package.json`
				if (fs.existsSync(fileName)) {
					const content = fs.readFileSync(fileName).toString()
					const result = handlebars.compile(content)(meta)
					fs.writeFileSync(fileName, result)
				}

				success('项目初始化完成')

				if (hasGit()) {
					log('初始化git仓库')
					try {
						await run(`git init ${name}`)
						success('git初始化成功')
					} catch ({ stderr, exitCode }) {
						error(`git初始化失败：${stderr} (${exitCode})`)
					}
				}
			} else {
				spinner.fail()
				error(`拉取远程仓库失败 ${err}`)
			}
		}
	)
}
