# webpack-mock-middleware

Implement local mock data in webpack5 by configuring `devServer.setupMiddlewares`.

# Usage

```bash
npm i -D webpack-mock-middleware
```

The following is an example of how to configure `/mock/user -> mock/user.js`

1. import package

```js
// webpack.config.js
const genMockMiddleware = require('webpack-mock-middleware')
const setupMiddlewares = genMockMiddleware()

module.exports = {
  devServer: {
    setupMiddlewares,
  },
}
```

2. mkdir mock
3. create `user.js`

```bash
# Project directory
|-- mock
  |-- user.js
  |-- auth.js
|-- webpack.config.js
```

```js
// user.js
module.exports = {
  data: {
    username: 'eric',
  },
}
```

4. run dev server

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "dev": "npm run serve",
    "dev:mock": "npm run dev --mock"
  }
}
```

```bash
# npm run
npm run dev:mock
# or
npm run dev --mock
```

> By default, process.env.npm_config_mock is used to determine whether to enable mocking.

### Options

#### `mock?: boolean`

Default use `process.env.npm_config_mock`, Mock mode can be enabled by default using the `npm run dev --mock` command

#### `mockDir?: string`

Default use `path.join(process.cwd(), './mock')`

```js
{
  mockDir: path.join(__dirname, './custom-mock')
}
```

#### `prefix?: string`

Customize mock prefix path, Keep consistent with `express` routing, default use `/mock/*`

```js
{
  prefix: '/mock1/*'
}

// mock1/list.js
fetch('/mock1/list')
```

#### `middlewares?: SetupMiddlewares[] | MiddlewaresFunc`

Same as webpack devServer `setupMiddlewares`,use array will push to `middlewares`, use function will same as webpack `devServer.setupMiddlewares`

#### `multiple?: { mockDir: string, prefix: string }[]`

Multiple mock prefixes and directory configuration

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mockMiddleware = require('webpack-mock-middleware')

const setupMiddlewares = mockMiddleware({
  // mockDir: path.join(__dirname, 'mock'),
  // mock: false,
  // prefix: '/mock/*',
  // middlewares: []
  // middlewares: (middlewares) => middlewares
  multiple: [
    {
      prefix: '/mock/*',
      mockDir: path.join(__dirname, 'mock'),
    },
    {
      prefix: '/mock1/*',
      mockDir: path.join(__dirname, 'mock1'),
    },
    {
      prefix: '/mock2/*',
      mockDir: path.join(__dirname, 'mock2'),
    },
  ],
})

module.exports = {
  entry: path.join(__dirname, './src/app.js'),
  devServer: {
    port: 9002,
    setupMiddlewares,
  },
  plugins: [new HtmlWebpackPlugin()],
}
```

### Mock data

#### object

```js
// mock/user.js
module.exports = {
  data: [
    {
      username: 'Eric a',
      age: 10000,
    },
    {
      username: 'Eric b',
      age: 10000,
    },
    {
      username: 'Eric c',
      age: 10000,
    },
  ],
  code: 200,
  message: 'success',
}
```

#### 动态数据

```js
// mock/queryuser.js
module.exports = (req) => {
  // TODO 此处可以通过传参，动态组织返回数据
  // 此处有三个参数req,res,next, 具体查看epress文档
  let query = req.query
  // 此处可以接收参数
  console.log(query)
  let data = [
    {
      id: 1,
      name: 'Eric a',
    },
    {
      id: 2,
      name: 'Eric b',
    },
  ]
  let filterRes = data.filter((itm) => itm.id == query.id)
  return {
    code: 200,
    data: filterRes,
    message: filterRes.length ? '获取成功' : '暂无数据',
  }
}
```
