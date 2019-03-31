export default {
    userCheck:(state,playload)=>{
        state.user.data = playload; 
        state.user.auth = true;
    },
    getPlateNumber:(state,playload)=>state.plateNumbers = playload,
    addReport:(state,playload)=>state.accidentReport.push(playload),
    getReport:(state,playload)=>state.accidentReport = playload,
    getTask:(state,playload)=>state.taskList = playload,
    addTask:(state,playload)=>state.taskList.push(playload),
    addFuel:(state,playload)=>state.fuel = playload,
    logout:(state)=>{
        state.user.auth=false;
        delete state.user.data;
    },
    updateTask:(state,playload)=>{
        state.taskList.forEach((value)=>{
            if(value._id==playload.id){
                if(playload.startTime){
                    value.startTime=playload.startTime;
                }else{
                    value.endTime=playload.endTime;
                }
                value.taskStatus=playload.taskStatus
            }
        })
    },
    updatePlateNumber:(state,playload)=>{
        window.console.log(playload)
        state.user.data.plateNumber = playload.plateNumber;
    }
}