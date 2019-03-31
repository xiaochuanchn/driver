<template>
    <div id="app_request">
        <div class="nav">
            <van-nav-bar title="Request"  left-arrow @click-left="onClickLeft" >
            </van-nav-bar>
        </div>
        <div class="list">
            <div class="title">
                <p>Dear <span> MS yang,</span></p>
                <p>Please find below list for todays task:</p>
            </div>
            <ul>
                <li @click="mc('MC')">
                    <div class="content">
                        <div class="left">
                            <h3>MC</h3>
                            <p>Choose a date for leaving</p>
                        </div>
                        <div class="arrow">
                            <img src="arrowUrl" alt="">
                        </div>
                    </div>
                    <div class="info">notice:xxxxxxxxxxxx</div>
                </li>
                <li @click="offduty('OFFDUTY')">
                    <div class="content">
                        <div class="left">
                            <h3>OFF DUTY</h3>
                            <p>Choose a date for leaving</p>
                        </div>
                        <div class="arrow">
                            <img src="arrowUrl" alt="">
                        </div>
                    </div>
                    <div class="info">notice:xxxxxxxxxxxx</div>
                </li>
            </ul>
        </div>
        <RequestAdd v-show="show"></RequestAdd>
    </div>
</template>
<script>
import RequestAdd from './Request_add';
export default {
    data:function(){
        return {
           arrowUrl: require("../assets/image/arrow@2x.png"), 
           show:false,
           title:''
        }
    },
    components: {
        RequestAdd
    },
    methods:{
        mc(title){
            this.show=true;
            this.title = title;
        },
        offduty(ev,title){
            this.show=true;
            this.title=title;
        },
        onClickLeft(){
            this.$router.push('/home');
        }
    }
}
</script>
<style>
    #app_request{width:100%;height:100%;position:relative;}
    #app_request .nav{height:100px;background:#f4f4f4;padding: 0 28px;position:relative;padding-bottom:20px;}
    #app_request .list .title{font-size:24px;line-height:48px;color:#999;border-bottom:2px solid #D4D4D4;padding:30px 28px;}
    #app_request .list ul{padding:0 28px;}
    #app_request .list ul li{border-bottom:2px solid rgba(153, 153, 153, 0.35);padding:30px 0;}
    #app_request .list ul li .content{display:flex;justify-content: space-between;}
    #app_request .list ul li .content .left{width:90%}
    #app_request .list ul li .content .arrow{width:32px;height:32px;}
    #app_request .list ul li .content .arrow img{width:32px;height:32px;}
    #app_request .list ul li h3{font-size:32px;line-height:46px;padding-bottom:30px;}
    #app_request .list ul li p{font-size:28px;line-height:46px;padding-bottom:30px;}
    #app_request .list ul li .info{font-size:28px;line-height:46px;}
</style>

