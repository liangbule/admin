module.exports = {
    devServer: {
      proxy: 'http://localhost:3000/api',
      proxy: 'http://localhost:3004'
    },
    publicPath: './',
    lintOnSave: false
  }
  