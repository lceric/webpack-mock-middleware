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