module.exports = function (router, mockjs) {
  router.get('/api/info/infos', function (req, res, next) {
    res.reply({
      list: [
        {
          CREATE_TIME: "2017-12-18 11:23:59",
          CREATE_USER: "1",
          END_TIME: "2017-12-20 00:00:00",
          ID: "1",
          INFO_DETAILS: "不知道a,不知道啊",
          INFO_NAME: "不是项目审批",
          INFO_TYPE: "拒绝审批",
          ROW_ID: 1,
          STATUS: "TODO",
          UPDATE_TIME: "2017-10-18 11:24:05",
          UPDATE_USER: "1"
        }
      ],
      totalCount: 1
    })
  })

  router.get('/api/dictionary/code', function (req, res, next) {
    const { CODE } = req.query
    switch (CODE) {
      case 'HOBBY':
        return res.reply([
          {
            ID: "11E7D960D65AC4E4AC7AE58809333CF0",
            NAME: "第一赛季",
            VALUE: "s1"
          },
          {
            ID: "11E7D960D65AC4E4AC7AE58809333CF1",
            NAME: "第二赛季",
            VALUE: "s2"
          },
          // {
          //   ID:"11E7D960D65AC4E4AC7AE58809333CF2",
          //   NAME:"第三赛季",
          //   VALUE:"s3"
          // },
          // {
          //   ID:"11E7D960D65AC4E4AC7AE58809333CF3",
          //   NAME:"第四赛季",
          //   VALUE:"s4"
          // }
        ])
      default:
        return next()
    }
  })

  // 动态选项卡接口
  router.get('/api/tab/menus', function (req, res, nenxt) {
    const { CODE } = req.query
    switch (CODE) {
      case 'PROJECT_TAB':
        res.reply(
          [
            {
              "IS_DELETED": "NO",
              "APPLICATION_KEY": "business",
              "CREATE_USER": "11E787B2A7179B4E9911D583E7E8BEA9",
              "TAB_CODE": "PROJECT_TAB",
              "SORT": 1,
              "UPDATE_USER": "11E787B2A7179B4E9911D583E7E8BEA9",
              "ID": "11E7F0F02A5EE997934301ED9C206E0X",
              "CREATE_TIME": 1515029995000,
              "UPDATE_TIME": 1515029995000,
              "URL": "/project/alert?a=a&b=b&c=3",
              "NAME": "内部页面"
            },
            {
              "IS_DELETED": "NO",
              "APPLICATION_KEY": "business",
              "CREATE_USER": "11E787B2A7179B4E9911D583E7E8BEA9",
              "TAB_CODE": "PROJECT_TAB",
              "SORT": 1,
              "UPDATE_USER": "11E787B2A7179B4E9911D583E7E8BEA9",
              "ID": "11E7F0F02A5EE997934301ED9C206E01",
              "CREATE_TIME": 1515029995000,
              "UPDATE_TIME": 1515029995000,
              "URL": "http://www.baiduc.com",
              "NAME": "项目详情1"
            },
            {
              "IS_DELETED": "NO",
              "APPLICATION_KEY": "business",
              "CREATE_USER": "11E787B2A7179B4E9911D583E7E8BEA9",
              "TAB_CODE": "PROJECT_TAB",
              "SORT": 2,
              "UPDATE_USER": "11E787B2A7179B4E9911D583E7E8BEA9",
              "ID": "11E7F0F02380A465934301ED9C206E01",
              "CREATE_TIME": 1515029984000,
              "UPDATE_TIME": 1515029984000,
              "URL": "http://www.baidu.com",
              "NAME": "百度"
            }
          ]
        )
        break;
      default:
        next()
    }
  })

  // router.get('/api/user/getPath', function (req, res, next) {
  //   const { CODE } = req.query
  //   return res.reply([
  //     {
  //       homePath: 'wwwwwwwwwwwwwww'
  //     }
  //   ])
  //   // return next()
  // })
  

  return router
}