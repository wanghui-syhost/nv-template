<template>
  <div class="login">
    <div class="login__main">
        <div class="login__left">
            <div class="login__form">
                <div class="login__info">
                    <span class="login__logo"></span>
                    <span class="login__title">盈峰环境智慧水务平台
                        <span class="login__title-desc">infore environmental intelligent water service platform</span>
                    </span>
                </div>
                <div>
                    <span class="login__username--icon" :class="{'on':focus.isUsernameFocus}"></span>
                    <input type="text" v-model="loginForm.loginName" placeholder="用户名" autocomplete @focus="onFocus('username')" class="login__username" maxlength="20">   
                </div>
                <div>
                    <span class="login__pass--icon" :class="{'on':focus.isPassFocus}"></span>
                    <input type="password" v-model="loginForm.pwd" placeholder="密码" autocomplete="off" @focus="onFocus('pass')"  class="login__pass" @keyup.enter="handleLogin"  maxlength="20">
                </div>
                <button class="login__login-btn" @click="handleLogin">登录</button>
            </div>
        </div>
        <div class="login__right">

        </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5';
import vuex, { mapActions } from 'vuex'
// import { getUserMenu, GetValCode, ModifyPass } from '@core/api/'
// import store from '@core/store/'
// // 获取全局的路由配置信息
// import { AllRoutes } from '@core/router/index';
// import Config from '@core/config';
// import {checkType} from '@core/utils/validate'
import utils from 'nenv/utils'
export default {
  name: "login",
  data(){
      return {
        focus:{
        isUsernameFocus:false,
        isPassFocus: false,
        
        },
        loginForm: {
            loginName: 'super',
            pwd: '123456'
        },
      }
  },
  methods:{
    onFocus(type){
        let me = this
        debugger
        me.focus={
            isUsernameFocus:type=='username',
            isPassFocus: type=='pass'
        }
    },
    handleLogin(){
        let me = this
        let reqParams = {
            'loginName': me.loginForm.loginName,
            'pwd': md5(md5(me.loginForm.pwd))
        }
        me.login(reqParams)
          .then(() => {
            me.$router.push('/home')
            me.loading = false

          }).catch((error) => {
            me.loading = false
            console.log(error)
          })
    },
    ...mapActions(['login']),
    ...mapActions('user', [
      'userLogin'
    ])
  }
}
</script>
<style scoped lang ="scss">
html,body, #nenv_root{
    height: 100%;
    width: 100%;
}
.login{
    position: absolute;
    top:0;
    margin:0 auto;
    right: 0;
    left:0;
    bottom: 0;
    height: 100%;
    width: 100%;
    text-align: center;
    background-image: url(./assets/login/ic_login_bg.png);
    background-size: cover;
    &__main{
        height:auto;
        min-height: 800px;
        margin-top:80px;
        display: flex;
        justify-content: center;
    }
    &__left{
        width: 550px;
        height: 800px;
        min-width:550px ;
        max-width: 550px;
        text-align: center;
        background: #FFF;
    }
    &__form{
        text-align: center;
        margin-left: 100px;
    }
    &__info{
        margin-top: 260px;
        display: flex;
        overflow: hidden;
    }
    &__logo{
        width:60px;
        height:60px; 
        display: inline-block;
        background:  url(./assets/login/ic_login_logo_60x60.png);
        border-radius: 4px ; 
    }
    &__title{
        font-size: 28px;
        color:#666;
        line-height: 28px;
        height: 28px;
        flex:1;
        display: inline-block;
        vertical-align: top;
        text-align: left;
        padding-left: 13px;
        &-desc{
          position: relative;
          width: 100%;
          margin-top: 9px;
          display: inline-block;
          font-size: 11px;
          text-align: left;

        }
    }

    &__username--icon{
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url(./assets/login/ic_login_username.png);
        position: relative;
        left: -215px;
        top: 40px;
        &.on{
            background: url(./assets/login/ic_login_username_on.png);
        }
    }
    &__username{
        display: block;
        width:349px;
        height: 50px;
        text-align:left;
        border:none;
        color:#333;
        font-size: 16px;
        padding-left: 33px;
        outline: none;
        border-bottom:1px solid #ccc;
    }
    &__pass--icon{
        width: 18px;
        height: 18px;
        display: inline-block;
        position: relative;
        left: -215px;
        top: 40px;
        background: url(./assets/login/ic_login_pass.png);
        &.on{
            background: url(./assets/login/ic_login_pass_on.png);
        }
    }
    &__pass{
        width:349px;
        height: 50px;
        border:none;
        color:#333;
        font-size: 16px;
        padding-left: 33px;
        outline: none;
        border-bottom:1px solid #ccc;
        display: block;
        text-align:left;
    }
    input[type=text]:focus, input[type=password]:focus {
        border-bottom:1px solid #3C8CFF;
        color:#333;
    }
    &__login-btn{
        margin-top:50px;
        display: block;
        width:361px;
        height:60px; 
        /* background:url(./assets/login/ic_login_btn-bg.png); */
        background:linear-gradient(rgba(98,104,254,1),rgba(89,157,255,1));
        border-radius: 24px ; 
        box-shadow: 0 2px 4px 0px #CCD0E6;
        outline: none;
        color:#fff;
    }
    &__right{
        flex:auto;
        max-width: 890px;
        background:url(./assets/login/ic_login_right.png);

    }

}

</style>


