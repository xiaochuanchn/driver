<template>
    <div id="app_home" :style="{backgroundImage:bgUrl}">
        <div class="logo" :style="{backgroundImage:logo_bg}">
            <img :src="logoUrl" alt="">
        </div>
        <div class="title">
            <p class="name">{{user.name}}</p>
            <p class="plate_number">{{user.plateNumber}}</p>
        </div>
        <div class="buttons">
            <router-link to='/tasklist' tag='button'>Check In</router-link>
            <router-link to='/tasklist' tag='button'>Check In</router-link>
            <router-link to='/request' tag='button'>Leave Request</router-link>
            <router-link to='/platenumber' tag='button'>Change Vehicle</router-link>
            <router-link to='/fuel' tag='button'>Fuel</router-link>
            <router-link to='/report' tag='button'>Accident Report</router-link>
        </div>
        <div class="info">
            <!-- <p class="serve_info">This vehcile serving due Date:{{serveTime}}</p> -->
            <!-- <p class="fule_info">This month 500L fule now</p> -->
        </div>
        <div class="logout">
            <button @click="logout">LOGOUT</button>
        </div>
    </div>
</template>
<script>
import store from '../store'
export default {
    data:function(){
        return {
            bgUrl:"url(" + require("../assets/image/loginBg@2x.png") + ")",
            logoUrl: require("../assets/image/logo@2x.png"),
            logo_bg: "url(" + require("../assets/image/logo_bg@2x.png") + ")",
            user:"",
            serveTime:"XXXX/XX/XX",
        }
    },
    methods:{
        logout(){
            window.axios({
                url:'/api/logout'
            }).then(res=>{
                if(res.data.error==0){
                    this.$dialog.alert({message: "注销成功即将跳转到登录页面"}).then(
                        ()=>{
                            store.commit('logout'),
                            this.$router.push('/login')
                        }
                    )
                }else{
                    this.$dialog.alert({message: "注销失败"})
                }
            })
            
        }
    },
    beforeRouteEnter(to, from, next){
        store.dispatch("autoLogin").then(res=> res.auth ? next(_this=>_this.user = store.state.user.data) : next("/login"))
    },   
}
</script>

<style>
    #app_home{height:100%;width:100%;position:relative;background-size: 100% 100%;background-repeat:no-repeat;}
    #app_home .logo{width:280px;height:280px;position:absolute;left:0;right:0;top:180px;margin:auto;background-size: cover;}
    #app_home .logo img{margin-top:30px;margin-left:56px;width:163px;height:163px;}
    #app_home .title{position:absolute;top:32%;text-align:center;font-size:28px;line-height: 38px;color:#666;width:100%}
    #app_home .buttons{display:flex;justify-content: center;flex-wrap: wrap;position:absolute;top:39%;}
    #app_home button{width:298px;height:155px;background:rgba(255,255,255,1);box-shadow:0px 6px 6px 0px rgba(228,228,228,0.75);border-radius:4px;border:0;margin:0 30px 30px;color:#444;font-size:30px;}
    #app_home .info{position:absolute;top:82%;width:100%;text-align:center;color:#f00;font-size:24px;line-height:32px;}
    #app_home .logout{padding:0 60px;position: absolute;top:88%;width:100%;box-sizing: border-box;display:flex;}
    #app_home .logout button{border:0;width:100%;background:#444;border-radius:8px;height:100px;color:#fff;font-size:32px;}
</style>
