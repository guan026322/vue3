const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    port: 3000,
    host: 'localhost'
  },
  lintOnSave: false
})
