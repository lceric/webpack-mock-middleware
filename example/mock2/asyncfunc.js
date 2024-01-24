module.exports = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        list: ['mock2']
      })
    }, 500)
  })
}