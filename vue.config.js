module.exports={
    devServer:{
      // proxy: 'http://localhost:3000',//告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到http://localhost:4000。
      // host: '0.0.0.0',
      // port: 6000,
      open: true,
      // https: false,
      // proxy: null, // string | Object
      proxy:{//代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
        '/api':{//axios访问 /api ==  target + /api  
          target:'http://localhost:3000',
          // target:'http://121.196.217.110:6000',
          // target:baseUrl.https,
          changeOrigin:true,//创建虚拟服务器 
          ws:true,//websocket代理
        },
      }
    },
    css: {
         loaderOptions: {
           css: {},
           postcss: {
             plugins: [
               require('postcss-px2rem')({
                 remUnit: 75
               })
                 ]
               }
             }
         },
  }