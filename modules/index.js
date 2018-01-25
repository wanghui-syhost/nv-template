import './notification'
import './theme'


window.Notification.requestPermission((x) => {
    return 
    console.log("获取授权", x)

    const notity = new Notification("标题", {
        dir: 'auto',
        body: "恭喜，中了奖，中了好多奖，中了一堆奖-----------------------------------------------",
        silent: true,
        icon: '/static/notity.jpg'
    })
    console.log(notity)
    notity.onclick = function ()  {
        console.log(this)
        notity.close()
        // window.alert(`你点了消息`)
    }
})