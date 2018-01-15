# web基础应用平台

项目运行打包 依赖node
node v6.11.3 LTS 版本 
下载地址:
https://nodejs.org/en/


## bash

``` bash

# 安装依赖 /Install dependencies
npm install --registry=https://registry.npm.taobao.org

# 安装失败可以采用cnpm 或yarn 阿里npm镜像 https://npm.taobao.org/

> npm install -g cnpm --registry=https://registry.npm.taobao.org
> cnpm install 
或采用yarn安装
> yarn install 


npm install -g http-server
# 开发环境 localhost:9999
npm run dev

# 生产环境打包
npm run build


# vue -eslint
https://github.com/vuejs/eslint-plugin-vue-libs

```


## 项目结构参考:
```
build webpack的相关配置 请勿随意修改
   |--build.js build 文件
   |--check-version文件
   |--dev-server 开发服务器
   |--webpack.base.conf.js 基本配置 
   |--webpack.dev.conf.js  开发配置
   |--webpack.prod.conf.js 生产配置

.src 程序代码
|--core
    |--api api接口
    |--assets 样式资源目录 css资源 图片 字体 第三方库 主题等
    |--components 组件 公用组件 和自定义组件 业务组件
    |--mock mockjs 模拟数据接口
    |--router 路由配置
      --index.js 路由和组件的配置
    |--store  全局数据状态管理
       |--modules 各个模块
       |--index.js 数据状态出口文件
       |--actions 动作 可以使异步函数等
       |--getters 全局状态输出文件 vuex getters
    |--styles 全局样式文件
    |--utils 工具类 请求拦截 其他的一些工具类
       |--fetch axios 请求拦截
       |--validate 正则校验等
       |--index 其他一些通用工具
    |--views 页面 可以根据不同的模块逻辑划分不同的页面
       |--login 登录界面
    App.vue 程序根组件
    config.js 全局配置
    filters.js 全局filters 用于格式化字段 如时间日期的格式化等 价格的格式化等
    global.js 全局函数 方便各个地方使用
    main.js 程序入口
--project
  project中所有结构和core一致 请参考上面
--favicon.ico favicon图标
--package.json 文件
--README.md 说明文件
  
  注意点:
  1. project的store中现在只支持一个module 名称为project 所有的数据状态放在模块project下面
  2.程序主入口在core-> main 中 需要引入库的请在npm中注册 js地图等可以在index.html直接注册


### 项目中常见问题和解决方案
1.npm 安装一直报错 ?
  > 注意node的版本 推荐使用LTS版本
  使用阿里镜像地址安装
  删除项目中的node_modules 重新安装

2.端口号冲突 listen EADDRINUSE 
直接任务管理器中停用node进程即可
或 netstat -nao    找到冲突端口pid   taskkill /PID /F ${pid} 即可

3.项目更新后 编译失败 请查看错误 
4.代码不规范 eslint报错 请按照要求 更正代码规范


### 所用到的技术栈
* vue vue-router vuex element-ui axios npm node 
* es6 主要是let const 解构 promise 等
* node 命令 `npm run dev` `npm run build` `npm install`等
* 项目结构约定

### 主题修改
1. 定义好主题名称${THEME-NAME}
2. 存入到store app theme中 
3. 如果有背景 存入到 store app appStyle中
4. http://element.eleme.io/#/zh-CN/component/custom-theme 让UI配合修改全局的element-variables.css et 编译
5. 生成 theme 找到theme/index.css 全局替换`.el-`  为 `.${THEME-NAME}  .el-` 并考入项目目录中 入口引入即可



### 兼容IE10+  请求暂时不能兼容IE9(20171011)
 




### 需要思考和解决的问题 todo 

store 本地化 ??? syncStore












###  数据采用线上mock easyz-mock

