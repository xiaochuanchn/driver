<template>
    <div id="app_fuel">
        <!-- <div class="nav"> -->
            <van-nav-bar title="Fuel"  left-arrow @click-left="onClickLeft" >
            </van-nav-bar>
        <!-- </div> -->
        <div class="litres">
            <h3>Litres</h3>
            <input type="text" name="" v-model="fuel">
        </div>
        <div class="location">
            <h3>Location</h3>
            <van-cell-group>
                 <van-field  placeholder="请选择地址" @focus="get_location" v-model="value"/>
            </van-cell-group>
            <van-popup v-model="show" position="bottom" :overlay="false">
                <van-picker :columns="columns"  show-toolbar @cancel="onCancel" @confirm="onConfirm"/>
            </van-popup>
        </div>
        <button @click="sub">SUBMIT</button>
    </div>
    
</template>
<script>
import store from '../store'
export default {
    data(){
        return {
            show:false,
            value:'',
            fuel:"",
            columns: []
        }
    },
     methods:{
         get_location(){
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
        sub(){

            store.dispatch('addFuel',{driver:store.state.user.data.name,plateNumber:store.state.user.data.plateNumber,fuel:this.fuel,location:this.value})
            .then((res=>{
                if(res.status){
                    this.$dialog.alert({message: "添加成功"})
                    this.value=""
                    this.fuel=""
                }else{
                    this.$dialog.alert({message: "添加失败"})
                }
                }))
        }
     },
    beforeRouteEnter(to, from, next){
         window.axios({
            url:"/api/fuelLocation",
            }).then(function(res){
            let locationArr = [];
            for(var i=0;i<res.data.data.length;i++){
                locationArr.push(res.data.data[i].location)
            }
            next((_this)=>{
                _this.columns = locationArr;
            })
        });
    },
}
</script>
<style>
    #app_fuel{height:100%;width:100%;position:relative;background:#f4f4f4;}
    #app_fuel h3{text-align:center;font-size:30px;color:#999;line-height:48px;padding:30px 0;}
    #app_fuel .litres{background:#fff;text-align: center;padding-bottom:100px;border-bottom:2px solid rgba(153, 153, 153, 0.35);margin-bottom:20px;padding-top:50px;}
    #app_fuel .litres input{border:0;border-bottom:2px solid rgba(66, 66, 66, 0.3);width:600px;margin-top:20px;text-align: center;outline: none;font-size:36px;padding:30px 0;}
    #app_fuel .location{width:600px;margin:0 auto;position: relative;}
    #app_fuel .location h3{margin-bottom:30px}
    #app_fuel button{background:#444;color:#fff;border:0;font-size:32px;position:absolute;bottom:0;width:100%;height:100px;}
</style>

