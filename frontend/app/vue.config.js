module.exports = {
  devServer: {
    proxy: {
        '^/rest': {
          target: 'http://api:3000',
          changeOrigin: true,
          pathRewrite: {
          }
        },
        '^/jobs': {
          target: 'http://jobs:3000',
          changeOrigin: true,
          pathRewrite: {
            '^/jobs': '/'
          }
        }
    }
  },
  "transpileDependencies": [
      "vuetify"
  ]
}