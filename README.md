# webpack-mock-middleware

webpack 工程处理 mock 数据中间件
[介绍](https://strun.club/#/article?articleid=94e45ab8ab7d11e9ac1d00163e055a14)

[工作图](https://strun.club/#/article?articleid=94e45ab8ab7d11e9ac1d00163e055a14)

# 用法

mock 目录建立与服务地址对应，如/api/user -> mock/api/user.js

```bash
# install
npm i -D webpack-mock-middleware

# use
require('webpack-mock-middleware')
```

> webpack before

```js
// mock.js
const isMock = process.env.npm_config_mock;
const eMock = require('./e-mock-middle.js');
module.exports = app => {
  if (isMock) {
    app.all("/api/*", function(req, res, next) {
      eMock(req, res, next);
    });
  }
};

// vue.config.js devServer
const mockProxy = require('mock.js');
{
  devServer: {
    before: mockProxy,
  }
}

```

# Demo

> vue cli3 构建项目
> 下面是工程目录

### 工程目录

```bash
|--mock
  |--mock.js
  |--api
    |--user.js # /api/user
    |--queryuser.js # /api/queryuser
|--vue.config.js

```

### mock 数据示例

#### 数据

```js
// api/user.js
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
// api/queryuser.js
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
### 提供mock.js,接入webpack-mock-middleware
#### 准备
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

# 判断是否已mock模式启动可通过此获取
process.env.npm_config_mock

```
#### mock.js接入
```js
// mock.js
const isMock = process.env.npm_config_mock;
const eMock = require('webpack-mock-middleware')
module.exports = app => {
  if (isMock) {
    app.all("/api/*", function(req, res, next) {
      eMock(req, res, next);
    });
  }
};

```
### webpack接入
> 在这里以vue.config.js示例
```js
// vue.config.js

const mockProxy = require('mock.js');
{
  devServer: {
    before: mockProxy,
  }
}

```