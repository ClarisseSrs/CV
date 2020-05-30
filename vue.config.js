const GoogleFontsPlugin = require('google-fonts-plugin')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/' + process.env.CI_PROJECT_NAME + '/'
    : '/',
    configureWebpack: {
    plugins: [
      new GoogleFontsPlugin('./src/fonts.json')
    ]
  }
}