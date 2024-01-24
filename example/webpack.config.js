const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mockMiddleware = require('../src/index')

const setupMiddlewares = mockMiddleware({
  mockDir: path.join(__dirname, 'mock'),
  // mock: false,
  // prefix: '/mock/*',
  // middlewares: []
  // middlewares: (middlewares) => middlewares
  // multiple: [
  //   {
  //     prefix: '/mock/*',
  //     mockDir: path.join(__dirname, 'mock'),
  //   },
  //   {
  //     prefix: '/mock1/*',
  //     mockDir: path.join(__dirname, 'mock1'),
  //   },
  //   {
  //     prefix: '/mock2/*',
  //     mockDir: path.join(__dirname, 'mock2'),
  //   },
  // ],
})

module.exports = {
  entry: path.join(__dirname, './src/app.js'),
  devServer: {
    port: 9002,
    setupMiddlewares,
  },
  plugins: [new HtmlWebpackPlugin()],
}
