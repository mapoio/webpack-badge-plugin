import path from 'path'
import {DefinePlugin} from 'webpack'

const CONTEXT = path.resolve(__dirname),
      {NODE_ENV} = process.env,
      createPath = nPath => path.resolve(CONTEXT, nPath),
      SRC_PATH = createPath('src'),
      NODE_MODULES = createPath('node_modules')

var config = {
  context: CONTEXT,
  entry: './src/plugin.js',
  target: 'node',

  output: {
    path: createPath('dist'),
    library: 'webpack-minio-plugin',
    libraryTarget: 'umd',
    filename: 'plugin.js'
  },

  plugins: [
    new DefinePlugin({
      __DEV__: NODE_ENV === 'development' || NODE_ENV === 'test'
    })
  ],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js/,
        loader: 'eslint-loader',
        include: [SRC_PATH],
        exclude: [NODE_MODULES]
      },
      {
        test: /\.js/,
        loader: 'babel-loader',
        include: [SRC_PATH, createPath('test')],
        exclude: [NODE_MODULES]
      }
    ]
  },

  externals: NODE_ENV === 'test' ? [] : [
    'lodash',
    'badges',
    'recursive-readdir',
    'progress'
  ]
}

module.exports = config
