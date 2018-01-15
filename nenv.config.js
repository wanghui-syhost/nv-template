const webpack = require('webpack')
module.exports = {
  project: {
    // 定义项目的标题
    title: "盈峰环境业务管理系统",
  },
  proxy: {
    '/api/*': {
      target: 'http://192.168.37.6:8089',
      filter(pathname, req) {
        if (pathname.match(/\/api/)) {
          return true
        }
      }
    }
  },
  webpack(config, { dev }) {
    // 如果是非调试环境, 就直连后台
    // if (!dev || true) {
    //   config.plugins.push(
    //     new webpack.DefinePlugin({
    //       'process.env.BASE_URL': "'http://192.168.37.6:8089/api'"
    //     }),
    //   )
    // }
    return config
  }
}