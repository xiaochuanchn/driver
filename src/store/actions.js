export default {
    userCheck:function({commit},playload){
        return window.axios({
            url:"/api/login",
            method:"post",
            data:{username:playload.username,password:playload.password}
        }).then(function(res){
            
            if(res.data.error==0){
                commit('userCheck',res.data.data)
                return {auth:true}
            }else{
                return {auth:false}
            }
            
        })
    },
    autoLogin:function({commit}){
        return window.axios({
            url:"/api/user",
        }).then(function(res){
            if(res.data.error==0){
                commit('userCheck',res.data.data)
                return {auth:true}
            }else{
                return {auth:false}
            }
            
        })
    },
    getPlateNumber:({commit})=>{
      return window.axios({
            url:"/api/car",
        }).then(function(res){
            if(res.data.error==0){
                commit('getPlateNumber',res.data.data)
                return {status:true}
            }else{
                return {status:false}
            }
        })
    },
    addReport:({commit},playload)=>{
        window.axios({
        url:"/api/accidentReport/add",
        method:"post",
        data:{time:playload.time,location:playload.location,description:playload.description,name:playload.name,plateNumber:playload.plateNumber,}
        }).then(function(res){
            commit('addReport',res.data[0])
        })
        },
    getReport:({commit})=>{

        return window.axios({
        url:"/api/accidentReport",
        method:"get",
    }).then(function(res){
        commit('getReport',res.data.data)
        return {status:true}
    })
    },
    getTask:({commit},playload)=>{
        return window.axios({
        url:"/api/dailyWork",
        data:playload,
        method:"post",
    }).then(function(res){
        window.console.log(res)
        if(res.data.error==0){
            commit('getTask',res.data.data)
            return {status:true}
        }else{
            return {status:false}
        }
    })
    },
    updateTask:({commit},playload)=>{
       return window.axios({
            url:"/api/dailyWork/check",
            data:playload,
            method:"post"
        }).then(function(res){
            if(res.data.error==0){
                commit('updateTask',playload)
                return {status:true}
            }else{
                return {status:false}
            }
        })
    },
    addTask:({commit},playload)=>{
       return window.axios({
            url:"/api/dailyWork/add",
            data:playload,
            method:"post"
        }).then(function(res){
            if(res.data.error==0){
                commit('addTask',res.data.data[0])
                return {status:true}
            }else{
                return {status:false}
            }
        })
    },
    updatePlateNumber:({commit},playload)=>{
       return window.axios({
            url:"/api/car/check",
            data:playload,
            method:"post"
        }).then(function(res){
            if(res.data.error==0){
                commit('updatePlateNumber',playload)
                return {status:true}
            }else{
                return {status:false}
            }
        })
    },
    addFuel:({commit},playload)=>{
       return window.axios({
            url:"/api/fuel/add",
            data:playload,
            method:"post"
        }).then(function(res){
            window.console.log(res)
            if(res.data.error==0){
                commit('addFuel',res.data.data[0])
                return {status:true}
            }else{
                return {status:false}
            }
        })
    }
}