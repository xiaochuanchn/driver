<template>
    <div class="report_add">
        <div class="detail">
            <h3>Add Detail</h3>

            <van-cell-group>
                 <van-field  placeholder="请选择时间" @focus="get_time" v-model="value"/>
            </van-cell-group>
            <van-popup v-model="show" position="bottom" :overlay="false">
                <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    @confirm="onConfirm"
                    @cancel='onCancel'
                    item-height:40
                    />
            </van-popup>
            <input type="text" name="" id="location" placeholder="location" v-model="location">
            <textarea name="" id="description"  placeholder="description" v-model="description"></textarea>
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
      show:false,
      value:"",
      location:"",
      description:""
    };
  },
    methods:{
        cancel(){
            this.$parent.ok=false;
        },
        get_time(){
            this.show = true;
        },
        onConfirm(value){
            this.show = false;
            this.value = value.getFullYear()+"/"+(value.getMonth()+1)+"/"+value.getDate()+" "+value.getHours()+":"+value.getMinutes();
        },
        onCancel(){
            this.show = false;
        },
        submit(){
            
            this.$store.dispatch(
                "addReport",
                {time:this.value,location:this.location,description:this.description,name:this.$store.state.user.data.name,plateNumber:this.$store.state.user.data.plateNumber}
            );
            this.$parent.ok = false;
            // this.$router.push('/report')
        }
    }
}
</script>

<style>
    .report_add{left:0;right:0;top:0;bottom:0;position:fixed;background:rgba(0, 0, 0, 0.5);z-index:1000}
    .report_add .detail{position:absolute;width:550px;height:600px;top:0;bottom:0;right:0;left:0;margin:auto;border-radius: 10px;background:#fff;padding:20px;display:flex;flex-direction: column;}
    .report_add .detail h3{text-align: center;font-size:32px;color:#999;font-weight: 400;padding:20px;margin-bottom:20px;}
    .report_add .detail #location{height:60px;line-height: 60px;font-size:24px;border-radius: 10px;outline: none;margin:30px 0;border:2px solid #e7e7e7;padding:7px 15px;}
    .report_add .detail #description{height:200px;line-height: 46px;padding:10px 0;font-size:24px;border-radius: 10px;outline: none;border:2px solid #e7e7e7;padding:7px 15px;}
    .report_add .btns{position:absolute;bottom:0;height:60px;display:flex;width:100%;left:0;}
    .report_add .btns button{flex:1;background:#444;color:#fff;border:0;font-size:24px;border-radius: 0 0 0 10px;}
    .report_add .btns button.submit{border-radius: 0 0 10px 0;}
    .report_add .btns span{background:#D1D1D1;width:2px;}
    .report_add .van-cell{font-size:24px;line-height:40px;border:2px solid #e7e7e7;}
    .report_add .van-cell-group{border-radius:10px;}
    .report_add .van-field__control{text-align:left;}
</style>
