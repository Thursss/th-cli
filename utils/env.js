const { run } = require('./execa')

let _hasGit = null

exports.hasGit = async () => {
  try {
    await run('git --version')
    return (_hasGit = true)
  } catch (error) {
    return (_hasGit = false)
  }
}
