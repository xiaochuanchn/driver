<template>
    <div id="app_plate_number">
        <div class="nav">
            <van-nav-bar title="Change Vehicle"  left-arrow @click-left="onClickLeft" >
            </van-nav-bar>
        </div>
        <div class="plate">
            <h3>{{plateNumber}}</h3>
        </div>
        <div class="chose_plate">
            <div class="info">
                <p>Not my car?</p>
                <p>Just enter a new plate number</p>
                <van-cell-group>
                    <van-field  placeholder="请选择车牌号" @focus="get_plate" v-model="value"/>
                </van-cell-group>
                <van-popup v-model="show" position="bottom" :overlay="false">
                    <van-picker :columns="columns"  show-toolbar @cancel="onCancel" @confirm="onConfirm" />
                </van-popup>
            </div>
        </div>
        <button @click="submit">SUBMIT</button>
    </div>
</template>
<script>
import store from '../store'
export default {
    data(){
        return {
            show:false,
            value:'',
            columns: [],
        }
    },
    computed:{
        plateNumber:()=>{return store.getters.user.data.plateNumber }
    },
     methods:{
         get_plate(){
             this.show = true;
         },
         onCancel(){
             this.show = false;
         },
         onConfirm(value){
             this.value = value;
             this.show = false;
         },
         onClickLeft(){
            this.$router.push('/home');
        },
        submit(){
            store.dispatch('updatePlateNumber',{id:store.state.user.data._id,plateNumber:this.value}).then(
                res=>res.status?this.$dialog.alert({message: "修改成功"}).then(()=>{this.value=""}):this.$dialog.alert({message: "修改失败"})
            )
        }
     },
    beforeRouteEnter(to, from, next){
        store.dispatch('getPlateNumber').then(
            res=>res.status?next(_this=>{store.state.plateNumbers.forEach((value)=>{_this.columns.push(value.plateNumber)})}):this.$dialog.alert({message: "加载失败"})
        )
    },
}
</script>
<style>
    #app_plate_number{height:100%;width:100%;position:relative;background:#f4f4f4;}
    #app_plate_number .nav{height:100px;background:#f4f4f4;padding: 0 28px;position:relative;padding-bottom:20px;}
    #app_plate_number .plate{background:#fff;text-align: center;border-bottom:2px solid rgba(153, 153, 153, 0.35);margin-bottom:20px;padding:80px 0;}
    #app_plate_number .plate h3{text-align:center;font-size:30px;color:#999;line-height:120px;border-radius: 20px;width:600px;height:120px;border:2px solid rgba(153, 153, 153, 0.35);background:#e7e7e7;margin:0 auto;}
    #app_plate_number .plate input{border:0;border-bottom:2px solid rgba(66, 66, 66, 0.3);width:600px;margin-top:50px;text-align: center;outline: none;font-size:36px;padding:30px 0;}
    #app_plate_number .chose_plate{width:600px;margin:0 auto;}
    #app_plate_number .chose_plate .info{padding:50px 0;}
    #app_plate_number .chose_plate p{text-align:center;font-size:24px;line-height:48px;}
    #app_plate_number button{background:#444;color:#fff;border:0;font-size:32px;position:absolute;bottom:0;width:100%;height:100px;}
</style>

