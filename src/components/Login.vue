<template>
    <div id="app_login" :style="{backgroundImage:bgUrl}">
        <div class="logo" :style="{backgroundImage:logo_bg}">
            <img :src="logoUrl" alt="">
        </div>
        <form>
            <div class="username commonInput">
                <span :style="{backgroundImage:userUrl}"></span>
                <input type="text" name="username" id="username" placeholder="username" v-model="username">
            </div>
            <div class="password commonInput">
                <span :style="{backgroundImage:passUrl}"></span>
                <input type="text" name="password" id="password" placeholder="password" v-model="password">
            </div>
            <div class="btn" @click="login">LOGIN</div>
            <div class="info">
                <p>Forget your password?</p>
                <p>Please contact admin for support</p>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data:function(){
        return {
            bgUrl:"url(" + require("../assets/image/loginBg@2x.png") + ")",
            userUrl:"url(" + require("../assets/image/user@2x.png") + ")",
            passUrl: "url(" + require("../assets/image/pass@2x.png") + ")",
            logoUrl: require("../assets/image/logo@2x.png"),
            logo_bg: "url(" + require("../assets/image/logo_bg@2x.png") + ")",
            username:'',
            password:'',
        }
    },
    methods: {
        login(){
            this.$store.dispatch(
                "userCheck",
                {username:this.username,password:this.password}
            ).then(
                res=>res.auth?this.$router.push("/home"):this.$dialog.alert({message: "账号或者密码有误"})
            )
        }
    }
}
</script>
<style>
    #app_login{height:100%;width:100%;position:relative;background-size: 100% 100%;background-repeat:no-repeat;}
    #app_login .logo{width:280px;height:280px;position:absolute;left:0;right:0;top:15%;margin:auto;background-size: cover}
    #app_login .logo img{margin-top:30px;margin-left:56px;height:163px;width:164px;}
    #app_login form{position:absolute;padding:0 60px;width:100%;box-sizing: border-box;top:40%;}
    #app_login form .commonInput{display:flex;border-bottom:2px solid #e7e7e7;}
    #app_login form span{width:40px;height:40px;margin:40px;margin-right:40px;background-size: cover}
    #app_login form input{border:0;line-height:40px;font-size:30px;outline: none;color:#999;font-weight:100;}
    #app_login form div.btn{border:0;width:100%;background:#444;border-radius:8px;height:100px;color:#fff;font-size:32px;margin-top:100px;line-height: 100px;text-align:center;}
    #app_login form .info{text-align:center;color:#999;font-size:26px;line-height:44px;margin-top:80px;}
</style>
