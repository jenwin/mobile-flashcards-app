const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
}