module.exports = {
  project: {
    // 定义项目的标题
    title: "盈峰环境业务管理系统",
  },
  proxy: {
    '/api/*': {
      // target: 'http://192.168.37.6:8089', // 平台
      // target: 'http://192.168.31.22:8089', // 刑光辉
      target: 'http://localhost:8089', // 本地
      filter(pathname, req) {
        if (pathname.match(/\/api/)) {
          return true
        }
      }
    }
  },
  /* webpack(config, { dev }) {
    if (dev) { // 开发环境配置
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.BASE_URL': "'http://192.168.37.6:8089/api'"
        }),
      )
    } else { // 生产环境配置
      
     }
    return config
  } */
}