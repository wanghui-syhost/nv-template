//const webpack = require('webpack')
module.exports = {
  // 项目nginx部署地址
  assetPublicPath: '/platform/',
  // 项目相关的配置
  project: {
    // 定义项目的标题
    title: "盈峰环境智慧水务平台",
  },
  proxy: {
    '/api/*': {
      target: 'http://192.168.37.6:8089', // 平台
      //target: 'http://192.168.31.22:8089', // 刑光辉
      // target: 'http://localhost:8080',// 本地
      filter(pathname, req) {
        if (pathname.match(/\/api/)) {
          return true
        }
      }
    }
  },
  // webpack(config, { dev }) {
  //   if (true) { // 开发环境配置
  //     config.plugins.push(
  //       new webpack.DefinePlugin({
  //         'process.env.BASE_URL': "'http://192.168.37.6:8089/api'"
  //       }),
  //     )
  //   } else { // 生产环境配置
      
  //    }
  //   return config
  // }
}