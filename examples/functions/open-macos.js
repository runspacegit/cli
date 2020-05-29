const {exec} = require('child_process')

module.exports = (_, callback) => {
  exec('open https://0x77.page', callback)
}
