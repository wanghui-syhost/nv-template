module.exports = function (router, mockjs) {
  router.get('/api/info/infos', function (req, res, next) {
      res.reply({ 
        list: [
          {
            CREATE_TIME: "2017-12-18 11:23:59",
            CREATE_USER:"1",
            END_TIME:"2017-12-20 00:00:00",
            ID:"1",
            INFO_DETAILS:"不知道a,不知道啊",
            INFO_NAME:"不是项目审批",
            INFO_TYPE:"拒绝审批",
            ROW_ID:1,
            STATUS:"TODO",
            UPDATE_TIME:"2017-10-18 11:24:05",
            UPDATE_USER:"1"
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
            ID:"11E7D960D65AC4E4AC7AE58809333CF0",
            NAME:"第一赛季",
            VALUE:"s1"
          },
          {
            ID:"11E7D960D65AC4E4AC7AE58809333CF0",
            NAME:"第二赛季",
            VALUE:"s2"
          },
          {
            ID:"11E7D960D65AC4E4AC7AE58809333CF0",
            NAME:"第三赛季",
            VALUE:"s3"
          },
          {
            ID:"11E7D960D65AC4E4AC7AE58809333CF0",
            NAME:"第四赛季",
            VALUE:"s4"
          }
        ])
      default:
        return next()
    }
  })
  

  return router
}