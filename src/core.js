const cwdPath = process.cwd()
const path = require('path')
const pathtoRegexp = require('path-to-regexp')

module.exports = (options) => {
  const mockDir = options.mockDir || path.join(cwdPath, './mock')
  const prefix = options.prefix
  const keys = []
  const regexp = pathtoRegexp(prefix, keys, {})

  return async (req, res, next) => {
    const matched = regexp.exec(req.path)
    let relativePath = ''

    if (matched && Array.isArray(matched) && matched[1]) {
      relativePath = matched[1]
    }

    if (!relativePath) {
      console.warn('[MOCK VALID FAIL] ' + req.path)
      next()
      return
    }
    
    let mockPath = path.join(mockDir, relativePath + '.js')
    delete require.cache[mockPath]

    try {
      let generateMock = require(mockPath)
      let isFun = typeof generateMock === 'function'
      let resData = isFun ? await generateMock(req, res, next) : generateMock

      res.json(resData)
    } catch (error) {
      console.warn('[MOCK FAIL] ' + req.path)
    } finally {
      next()
    }
  }
}
