<template>
    <div class="request_add">
        <div class="detail">
            <h3>Choose Date</h3>
            <div class="startDate">
                <van-cell-group>
                    <van-field  placeholder="请选择起始时间" @focus="get_startTime" v-model="startTime"/>
                </van-cell-group>
                <van-popup v-model="showStart" position="bottom" :overlay="false">
                    <van-datetime-picker
                        v-model="currentDate"
                        type="date"
                        @confirm="onConfirmStart"
                        @cancel='onCancelStart'
                        item-height:40
                        />
                </van-popup>
            </div>
            <div class="endDate">
                <van-cell-group>
                    <van-field  placeholder="请选择结束时间" @focus="get_endTime" v-model="endTime"/>
                </van-cell-group>
                <van-popup v-model="showEnd" position="bottom" :overlay="false">
                    <van-datetime-picker
                        v-model="currentDate"
                        type="date"
                        @confirm="onConfirmEnd"
                        @cancel='onCancelEnd'
                        item-height:40
                        />
                </van-popup>
            </div>
            <div class="reason">
                <textarea name="" class="content"  placeholder="reason" v-model="reason"></textarea>
            </div>
            <div class="btns">
                <button @click="cancel">CANCEL</button>
                <span></span>
                <button class="submit" @click="submit">SUBMIT</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
     data() {
    return {
      currentDate: new Date(),
      showStart:false,
      showEnd:false,
      startTime:null,
      endTime:null,
      reason:''
    };
  },
    methods:{
        cancel(){
            this.$parent.show=false;
        },
        get_startTime(){
            this.showStart = true;
        },
        get_endTime(){
            this.showEnd = true;
        },
        onConfirmStart(value){
            this.showStart = false;
            this.startTime = value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate();
        },
        onCancelStart(){
            this.showStart = false;
        },
        onConfirmEnd(value){
            this.showEnd = false;
            this.endTime = value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate();
        },
        onCancelEnd(){
            this.showEnd = false;
        },
        submit(){
            this.$parent.show=false;
            window.axios({
                url:"/api/leaveRecord/add",
                method:"post",
                data:{startTime:this.startTime,endTime:this.endTime,reason:this.reason,type:this.$parent.title,name:this.$store.state.user.data.name,id:this.$store.state.user.data._id}
            }).then(function(res){
                window.console.log(res)
            })
        }
    }
}
</script>

<style>
    .request_add{left:0;right:0;top:0;bottom:0;position:fixed;background:rgba(0, 0, 0, 0.5);z-index:1000}
    .request_add .detail{position:absolute;width:550px;height:600px;top:0;bottom:0;right:0;left:0;margin:auto;border-radius: 10px;background:#fff;padding:20px;display:flex;flex-direction: column;}
    .request_add .detail h3{text-align: center;font-size:32px;color:#999;font-weight: 400;padding:20px;margin-bottom:20px;}
    .request_add .detail .startDate{margin-bottom:20px;}
    .request_add .btns{position:absolute;bottom:0;height:60px;display:flex;width:100%;left:0;}
    .request_add .btns button{flex:1;background:#444;color:#fff;border:0;font-size:24px;border-radius: 0 0 0 10px;}
    .request_add .btns button.submit{border-radius: 0 0 10px 0;}
    .request_add .btns span{background:#D1D1D1;width:2px;}
    .request_add .van-cell{font-size:24px;line-height:40px;border:2px solid #e7e7e7;}
    .request_add .van-cell-group{border-radius:10px;}
    .request_add .van-field__control{text-align:left;}
    .request_add .reason{height:200px;line-height: 46px;padding:20px;font-size:24px;border-radius: 10px;outline: none;border:2px solid #e7e7e7;margin-top:30px;}
    .request_add .reason .content{width:100%;border:0;}
</style>
