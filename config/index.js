var proxyConfig = require('./proxyConfig')

module.exports = {
  devServer: {
    //disableHostCheck: true,
    //contentBase: './dist',
    hot: true,
    host: '127.0.0.1',
    proxy: {
      '*': {    //将www.exaple.com印射为/apis
        target: 'http://localhost:8080/',  // 接口域名
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
      }
    }
  },
}