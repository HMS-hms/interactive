const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/baidu_api_speech': {
        target: 'http://vop.baidu.com/server_api',
        changeOrigin: true,
        pathRewrite: { '^/baidu_api_speech': '' },
      },
      '/baidu_api_emotion': {
        target: 'https://aip.baidubce.com/rpc/2.0/nlp/v1/emotion',
        changeOrigin: true,
        pathRewrite: { '^/baidu_api_emotion': '' },
      },
      '/generate_picture':{
        target: 'http://localhost:5000/generatePic',
        changeOrigin: true,
        pathRewrite: { '^/generate_picture': '' },
      }
    },
  },
});
