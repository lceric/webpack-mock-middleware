const cwdPath = process.cwd();
const path = require("path");
const fs = require("fs");
const { Log } = require("./utils");
module.exports = (req, res, next, config) => {
  let mockPath = path.join(cwdPath, "mock" + req.path + ".js");
  Log(mockPath);
  delete require.cache[mockPath];
  fs.open(mockPath, "r", err => {
    if (err) {
      if (err.code === "ENOENT") {
        Log(req.path + "接口--------不走mock");
        next();
        return;
      }
      throw err;
    }
    let resData = require(mockPath);
    Log(resData);
    res.json({ ...resData });
  });
};
