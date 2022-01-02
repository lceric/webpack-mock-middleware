const cwdPath = process.cwd()
const fs = require('fs')
const path = require('path')
module.exports = (req, res, next) => {
  let mockPath = path.join(cwdPath, 'mock' + req.path + '.js')
  delete require.cache[mockPath]
  fs.open(mockPath, 'r', (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.warn('[fail mock] ' + req.path)
        next()
        return
      }
      throw err
    }
    let generateMock = require(mockPath)
    let isFun = typeof generateMock === 'function'
    let resData = isFun ? generateMock(req, res, next) : generateMock
    res.json(resData)
  })
}
