const run = async () => {
  const res = await fetch('/mock/list')
  console.log(res)

  const funcRes = await fetch('/mock/func')
  console.log(funcRes)

  const mock1FuncRes = await fetch('/mock1/func')
  console.log(mock1FuncRes)

  const mock2AsyncFuncRes = await fetch('/mock2/asyncfunc')
  console.log(mock2AsyncFuncRes)

  const asyncFuncRes = await fetch('/mock/asyncfunc')
  console.log(asyncFuncRes)

  const queryuserRes = await fetch('/mock/queryuser?id=1')
  console.log(queryuserRes)
}

run()
