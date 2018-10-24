const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('lib'),
    filename: 'umd.js',
    libraryTarget: 'umd',
    // See https://github.com/webpack/webpack/issues/6522
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
