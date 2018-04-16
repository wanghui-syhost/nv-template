//const webpack = require('webpack')
module.exports = {
  // 项目nginx部署地址
  assetPublicPath: '/platform/',
  // 项目相关的配置
  project: {
    // 定义项目的标题
    title: "欢迎来到盈峰环境智慧水务平台",
  },
  proxy: {
<<<<<<< Updated upstream
    '/api/*': { //平台api管理
      // target: 'http://192.168.37.6:8089', // 平台
      // target: 'http://192.168.31.22:8089', // 邢光辉 ,   
=======
    '/api/*': {
      //target: 'http://192.168.37.6:8089', // 平台
      // target: 'http://192.168.31.22:8089', // 邢光辉
>>>>>>> Stashed changes
      target: 'http://localhost:8089',// 本地
      filter(pathname, req) {
        if (pathname.match(/\/api/)) {
          return true
        }
      }
    },  
    '/file/*': { // 平台文件管理
      target: 'http://192.168.37.6:8808', 
      filter(pathname, req) {
        if (pathname.match(/\/file/)) {
          return true
        }
      }
    }
  },
  webpack(config, { dev }, webpack) { 
    // if (true) { // 开发环境配置
    //   config.plugins.push(
    //     new webpack.DefinePlugin({
    //       'process.env.BASE_URL': "'http://192.168.37.6:8092'"
    //     }),
    //   )
    // } else { // 生产环境配置
    // }

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SOCKET_URL': "'http://192.168.37.6:8092'"
      })
    )

    return config
  }
}