const core = require('./core')

/**
 * webpack5 dev server mock middleware
 * @description webpack5 devServer setupMiddlewares
 * @param {Boolean} options.mock open mock mode, default use `process.env.npm_config_mock`, run by `npm run dev --mock`
 * @param {String} options.mockDir mock dir，default `path.join(process.cwd(), 'mock')`
 * @param {String} options.prefix mock api prefix，default `/mock/*`
 * @param {Array | Function} options.middlewares webpack devServer `setupMiddlewares`, use array will push to `middlewares`, use function will same as webpack `devServer.setupMiddlewares`
 * @param {Array} options.multiple multiple config
 * @example
 * ```js
 * const genMockMiddleware = require('webpack-mock-middleware')
 * const setupMiddlewares = genMockMiddleware()
 *
 * module.exports = {
 *   devServer: {
 *     setupMiddlewares
 *   }
 * }
 * ```
 *
 * @returns setupMiddlewares
 */
module.exports = (options) => {
  const genOptions = Object.assign({
    mock: process.env.npm_config_mock,
    prefix: '/mock/*',
  }, options || {})

  const {
    mock,
    prefix,
    middlewares: incomingMiddlewares,
    mockDir,
    multiple
  } = genOptions

  const isMock = mock

  return (middlewares, devServer) => {
    if (!devServer) {
      throw new Error('[MOCK ERROR]webpack-dev-server is not defined')
    }

    if (isMock) {
      if (multiple && Array.isArray(multiple)) {
        multiple.forEach(opt => {
          devServer.app.all(opt.prefix, (req, res, next) => {
            console.log('[MOCK PATH]', req.path)
            core(opt)(req, res, next)
          })
        })
      } else {
        devServer.app.all(prefix, (req, res, next) => {
          console.log('[MOCK PATH]', req.path)
          core(genOptions)(req, res, next)
        })
      }
    }

    if (incomingMiddlewares instanceof Array) {
      middlewares.push(...incomingMiddlewares)
    }

    if (incomingMiddlewares instanceof Function) {
      return incomingMiddlewares(middlewares, devServer, genOptions)
    }

    return middlewares
  }
}
