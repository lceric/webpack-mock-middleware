# webpack-mock-middleware
webpack工程处理mock数据中间件

# 用法
mock目录建立与服务地址对应，如/api/user ->  mock/api/user.js

```bash
# install
npm i -D webpack-mock-middleware

# use
require('webpack-mock-middleware')
```
webpack before
```js

const isMock = process.env.npm_config_mock;
const eMock = require('./e-mock-middle.js')
module.exports = app => {
  if (isMock) {
    app.all("/api/*", function(req, res, next) {
      eMock(req, res, next);
    });
  }
};

// devServer
{
    devServer: {
        before: mockProxy,
    }
}

```