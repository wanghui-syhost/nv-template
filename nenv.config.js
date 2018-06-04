//const webpack = require('webpack')
module.exports = {
  // 项目nginx部署地址
  assetPublicPath: '/platform/',
  // 项目相关的配置
  project: {
    // 定义项目的标题
    title: "欢迎来到盈峰环境智慧水务平台",
    login_page_title: "盈峰环境智慧水务平台",
    login_page_title_en: "infore environmental intelligent water service platform"
  },
  proxy: {
    '/api/*': { //平台api管理
      target: 'http://192.168.37.6:8089', // 平台
      // target: 'http://192.168.31.22:8089', // 邢光辉 ,   
      //target: 'http://localhost:8089',// 本地
      filter(pathname, req) {
        if (pathname.match(/\/api/)) {
          return true
        }
      }
    },  
    '/file/*': { // 平台文件管理
      target: 'http://localhost:8808', 
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
    //       'process.env.BASE_URL': "'/gis'"
    //     }),
    //   )
    // } else { // 生产环境配置
    // }

    config.plugins.push(
      // new webpack.DefinePlugin({
      //   'process.env.SSO_URL': "'http://192.168.37.6:8090/sso/index.html#/'",
      //   'process.env.SSO_CALLBACK_URL': "'http://localhost:8808/#/sso'",
      //   // 'process.env.LOGIN_PATH': '/sso'
      // })
    )

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.SOCKET_URL': "'http://192.168.37.6:8092'"
      })
    )

    return config
  }
}