# webpack-mock-middleware
在webpack开发模式，该中间件配合`devServer.before`提供了一种快速本地mock数据的方案。
mock目录下为数据js，与接口地址相对应，如`axios.get('/api/user')` -> mock目录下`api/user.js`

## 用法

```bash
# install
npm i -D webpack-mock-middleware

# use
require('webpack-mock-middleware')
```

#### 启动
```bash
# package.json中的script加入mock启动标识
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "dev": "npm run serve",
    "dev:mock": "npm run dev --mock"
  }
}
# 启动
npm run dev:mock
# 也可以
npm run dev --mock

# 可通过此判断是否mock模式启动
process.env.npm_config_mock

```


## 示例

### 工程目录

```bash
|--mock
  |--mock.js
  |--api
    |--user.js # /api/user
    |--queryuser.js # /api/queryuser
|--vue.config.js

```

**mock/mock.js**
```js
// mock.js
const eMock = require('webpack-mock-middleware')
const isMock = process.env.npm_config_mock
module.exports = app => {
  if (isMock) {
    app.all('/api/*', function(req, res, next) {
      console.log('---', req.path)
      eMock(req, res, next)
    })
  }
}
```
**vue.config.js**
```
// vue.config.js devServer
const mockProxy = require('mock.js');
{
  devServer: {
    before: mockProxy,
  }
}

```
### mock 数据示例

#### 数据

```js
// mock/api/user.js
module.exports = {
  data: [
    {
      username: 'Eric a',
      age: 10000
    },
    {
      username: 'Eric b',
      age: 10000
    },
    {
      username: 'Eric c',
      age: 10000
    }
  ],
  code: 200,
  message: '操作成功'
};
```

#### 动态数据

```js
// mock/api/queryuser.js
module.exports = req => {
  // TODO 此处可以通过传参，动态组织返回数据
  // 此处有三个参数req,res,next, 具体查看epress文档
  let query = req.query;
  // 此处可以接收参数
  console.log(query);
  let data = [
    {
      id: 1,
      name: 'Eric a'
    },
    {
      id: 2,
      name: 'Eric b'
    }
  ];
  let filterRes = data.filter(itm => itm.id == query.id);
  return {
    code: 200,
    data: filterRes,
    message: filterRes.length ? '获取成功' : '暂无数据'
  };
};
```
