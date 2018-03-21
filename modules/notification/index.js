//import io from 'socket.io-client'
//const io = require('./socket.io')
import { Notification } from 'element-ui'


// window.Notification.requestPermission()

// const p = () => import('socket.io-client')
// p() .then(io => {
//     const socket = io.connect(`${process.env.SOCKET_URL}?Authorization=${localStorage.getItem('user.token')}`)
//     socket.emit('joinRoom', '11E787B2A7179B4E9911D583E7E8BEA9')

//     socket.on('connect', function (...arg) {

//     })

//     socket.on('receiveMessage', function (data) {
//         const { title, type, content, url } =  data
//         notity(title, content, url)
//     })

//     function notity (title, content, url) {
//         (new Promise((resolve, reject) => {
//             if (window.Notification) {
//                 window.Notification.requestPermission((result) => {
//                     if (result === 'denied') {
//                         reject()
//                     } else {
//                         resolve()
//                     }
//                 })
//             } else {
//                 reject()
//             }
//         })).then(() => {
//             const notity = new window.Notification(title, {
//                 dir: 'auto',
//                 body: content,
//                 silent: true,
//                 icon: '/static/notity.jpg'
//             })
//             notity.onclick = function ()  {
//                 if (url) {
//                     unfetch.open(url)
//                 }
//                 notity.close()
//             }
//         }).catch(() => {
//             new Notification({
//                 type: 'success',
//                 title: title,
//                 message: content,
//                 onClick: function () {
//                     console.log(this)
//                 }
//             })
//         })
//     }
// })
