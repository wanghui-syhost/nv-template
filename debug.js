const build = require('../nenv/server/build')
const dir = __dirname
console.log(dir)

build(dir)
.catch(err => {
  console.log(err)
    // process
})