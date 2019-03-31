<template>
    <div id="app_report">
        <div class="nav">
            <van-nav-bar title="Report"  left-arrow right-text="add" @click-left="onClickLeft" @click-right="onClickRight">
            </van-nav-bar>
        </div>
        <div class="list">
            <div class="title">
                <p>Dear <span> MS yang,</span></p>
                <p>Please find below list for todays task:</p>
            </div>
            <ul>
                <li v-for ="(item,index) in accidentReport" :key="item._id">
                    <span class="num">{{index+1}}</span>
                    <div class="info">
                        <p class="time">time:{{item.time}}</p>
                        <p class="location">location:{{item.location}}</p>
                        <p class="description">description:{{item.description}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <ReportAdd v-show="ok"></ReportAdd>
    </div>
</template>
<script>
import ReportAdd from "./Report_add"
import store from "../store"
export default {
    data:function(){
        return{
            ok:false,
            accidentReport:[],
        }
    },
    components: {
        ReportAdd
    },
    // computed: mapGetters("getReport"),
    methods:{
        onClickRight(){
            this.ok=true
        },
        onClickLeft(){
            this.$router.push('/home');
        }
    },
     beforeRouteEnter(to, from, next){
        store.dispatch('getReport').then((res)=>{
            res.status?next(_this=>_this.accidentReport = store.state.accidentReport):alert("1")
        })
      
    },
}
</script>

<style>
    #app_report{width:100%;height:100%;position:relative;}
    #app_report .nav{height:100px;background:#f4f4f4;padding: 0 28px;position:fixed;padding-bottom:20px;width:100%;z-index:100;}
    #app_report .list .title{font-size:24px;line-height:48px;color:#999;border-bottom:2px solid #D4D4D4;padding:30px 28px;font-size:24px;line-height:48px;color:#000;border-bottom:2px solid #D4D4D4;padding:30px 28px;position:fixed;top:100px;width:100%;background:#fff;z-index:100}
    #app_report .list ul{overflow:auto;position:absolute;width:100%;top:258px;}
    #app_report .list ul li{display:flex;font-size:28px;line-height:46px;color:#333;align-items: center;border-bottom:2px solid #e7e7e7;padding:20px 28px;width:100%}
    #app_report .list ul li .num{padding-right:28px;width:10%}
    #app_report .list ul li .info{width:90%;}
    #app_report .list ul li .info p{width:100%;padding:10px 10px;}
    #app_report .list ul li .info .location{border-top:2px dashed #e7e7e7;border-bottom:2px dashed #e7e7e7;}
</style>

