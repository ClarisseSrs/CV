const GoogleFontsPlugin = require('google-fonts-plugin')

module.exports = {
  publicPath: '/cv/',
  // If you don't publish at the root of your Gitlab Page
  // publicPath: process.env.NODE_ENV === 'production' ? `/${process.env.CI_PROJECT_NAME}/` : '/',
  configureWebpack: {
    plugins: [
      new GoogleFontsPlugin('./src/fonts.json')
    ],
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  }
}
