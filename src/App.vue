<template>
  <div id="app" :style="{height:screenHeight+'px'}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

   data () {
    return {
      screenWidth: document.documentElement.clientWidth, // 屏幕宽度
      screenHeight: document.documentElement.clientHeight // 屏幕高度
    }
  },
  mounted () {
    var _this = this
    window.onresize = function () { // 定义窗口大小变更通知事件
      _this.screenWidth = document.documentElement.clientWidth // 窗口宽度
      _this.screenHeight = document.documentElement.clientHeight // 窗口高度
    }
  },

}
</script>
