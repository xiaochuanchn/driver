<template>
    <div id="app_task_list">
        <div class="nav">
            <van-nav-bar title="TaskList"  left-arrow right-text="add" @click-left="onClickLeft" @click-right="onClickRight">
            </van-nav-bar>
        </div>
        <div class="list">
            <div class="title">
                <p>Dear <span> MS yang,</span></p>
                <p>Please find below list for todays task:</p>
            </div>
            <ul v-if="showList">
                <li  v-for="(item,index) in tasks" :key="item._id"  v-bind:style='item.taskStatus=="finished"?{background:"#f4f4f4",textDecoration:"line-through"}:""'>
                    <span class="num">{{index+1}}</span>
                    <p class="content">{{item.task}}</p>
                    <span class="del_line"></span>
                    <button class="start"  :disabled="item.taskStatus=='assigned'?false:true"  @click="start(item._id,item.taskStatus,$event) ">{{item.startTime?item.startTime:'start' }}</button>
                    <button class="finish" :disabled="item.taskStatus=='delieving'?false:true"  @click="finish(item._id,item.taskStatus,$event)">{{item.endTime?item.endTime:'finish' }}</button>
                </li>
            </ul>
            <ul v-else>
                no task today
            </ul>
        </div>
        <div class="btns">
            <button>CHECK OUT</button>
            <span></span>
            <button>HAND OVER</button>
        </div>
        <div class="add_task" v-show="show">
            <div class="detail">
                <h3>Add New Task</h3>
                <textarea name="" id="description"  placeholder="description" v-model="task"></textarea>
                <div class="btns">
                    <button @click="cancel">CANCEL</button>
                    <span></span>
                    <button class="submit" @click="add">SUBMIT</button>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import store from '../store'
export default {
    data:function(){

        return {
            showList:true,
            show:false,
            tasks:[],
            task:""
        }
    },
    methods:{
        onClickLeft(){
            this.$router.push('/home');
        },
        onClickRight(){
            this.show = true
        },
        cancel(){
            this.show = false;
        },
        start(id){
            store.dispatch('updateTask',{startTime:this.time(Date.now()),id:id,taskStatus:"delieving"}).then(res=>res.status?this.$dialog.alert({message: "提交成功"}):this.$dialog.alert({message: "提交失败"}))
        },
        finish(id){
            store.dispatch('updateTask',{endTime:this.time(Date.now()),id:id,taskStatus:"finished"}).then(res=>res.status?this.$dialog.alert({message: "提交成功"}):this.$dialog.alert({message: "提交失败"}))
        },
        time(time){
            let d=new Date(time);
            let hour = d.getHours();
            let min = d.getMinutes();
            return `${this.fillzero(hour)}:${this.fillzero(min)}`
        },
        fillzero(n){
            return n<10 ? '0' + n : '' + n
        },
        date(date){
            let d=new Date(date);
            let year = d.getFullYear();
            let month = d.getMonth()+1;
            let day = d.getDate();
            return date = `${year}-${this.fillzero(month)}-${this.fillzero(day)}`;
        },
        add(){
            store.dispatch('addTask',{taskStatus:"assigned",date:this.date(Date.now()),task:this.task,driver:store.state.user.data.name})
            .then(
                res=>{
                    if(res.status){
                    this.$dialog.alert({message: "提交成功"}).then(()=>{
                        this.show = false
                    })
                    }else{
                        this.$dialog.alert({message: "提交失败"})
                        }
                    })
            
        }
    },
    beforeRouteEnter(to, from, next){
        store.dispatch('getTask',{name:store.state.user.data.name,id:store.state.user.data._id,date:Date.now()}).then((res)=>{
            if(res.status){
                next(
                    _this=>{
                        _this.tasks = store.state.taskList;
                        _this.showList = true;
                        })
                }else{
                    next(
                    _this=>{
                        // _this.tasks = store.state.taskList;
                        _this.showList = false;
                        })
                    }
        })
    },
}
</script>

<style>
    #app_task_list{width:100%;height:100%;position:relative;}
    #app_task_list .nav{height:100px;background:#f4f4f4;padding: 0 28px;position:fixed;padding-bottom:20px;width:100%;z-index:100;}
    #app_task_list .list .title{font-size:24px;line-height:48px;color:#000;border-bottom:2px solid #D4D4D4;padding:30px 28px;position:fixed;top:100px;width:100%;background:#fff;z-index:100}
    #app_task_list .list ul{overflow:auto;position:absolute;width:100%;top:258px;bottom:100px;}
    #app_task_list .list ul li{display:flex;font-size:24px;line-height:26px;color:#999;align-items: center;border-bottom:2px solid #e7e7e7;padding:20px 28px;position:relative}
    #app_task_list .list ul li .num{padding-right:28px;color:#000;}
    /* #app_task_list .list ul li .del_line{position:absolute;width:100%;height:2px;background-color:#ccc;} */
    #app_task_list .list ul li .content{width:390px;line-height:46px;color:#000;}
    #app_task_list .list ul li button{width:120px;height:53px;background:rgba(243,243,243,1);border:2px solid rgba(231,231,231,1);border-radius:26px;color:#999;font-size:28px;margin-left:28px;}
    #app_task_list .btns{position:fixed;bottom:0;height:100px;display:flex;width:100%;}
    #app_task_list .btns button{flex:1;background:#444;color:#fff;border:0;font-size:32px;}
    #app_task_list .btns span{background:#D1D1D1;width:2px;}
    #app_task_list .add_task{left:0;right:0;top:0;bottom:0;position:absolute;background:rgba(0, 0, 0, 0.5);z-index:1000}


    #app_task_list .detail{position:absolute;width:550px;height:450px;top:0;bottom:0;right:0;left:0;margin:auto;border-radius: 10px;background:#fff;padding:20px;display:flex;flex-direction: column;}
    #app_task_list .detail .btns{position:absolute;bottom:0;height:60px;display:flex;width:100%;left:0;}
    #app_task_list .detail .btns button{flex:1;background:#444;color:#fff;border:0;font-size:24px;border-radius: 0 0 0 10px;}
    #app_task_list .detail .btns button.submit{border-radius: 0 0 10px 0;}
    #app_task_list .detail .btns span{background:#D1D1D1;width:2px;}
    #app_task_list .detail h3{text-align: center;font-size:32px;color:#000;font-weight: 400;padding:20px;margin-bottom:20px;}
    #app_task_list .detail #description{height:200px;line-height: 46px;padding:20px;font-size:24px;border-radius: 10px;outline: none;border:2px solid #e7e7e7;}
</style>
