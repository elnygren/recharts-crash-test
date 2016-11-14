const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const R = require('ramda')
const webpack = require('webpack')

// postCSS
const precss = require('precss')
const autoprefixer = require('autoprefixer')
const postcssImport = require('postcss-import')


// constants

const PRODUCTION = process.argv.find(x => x == '--PRODUCTION')
const BASE_DIR = path.join(path.resolve(__dirname), 'frontend')


// PRODUCTION_CONFIG is built on top of DEV_CONFIG

const WEBPACK_DEV_CONFIG = {
    devtool: 'eval',
    entry: path.join(BASE_DIR, 'src', 'index.js'),
    output: {
        path: path.join(BASE_DIR, 'bundles'), // add to .gitignore
        // filename: '[name]-[hash].js', // unimportant for humans
        filename: 'billing_bundle.js'
    },
    module: {
        loaders: [
          // PostCSS
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', '!css-loader!postcss-loader')
          },

          // Babel with reasonable presets
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              // 'plugins': ['recharts'],
              presets: ['es2015', 'react'],
            }
          },
        ]
    },
    postcss: (webpack) => [ // https://github.com/postcss/postcss-loader
      postcssImport({addDependencyTo: webpack}),
      precss,
      autoprefixer
    ],
    resolve: {
      root: path.join(path.resolve(__dirname), 'src'),
      modulesDirectories: ['node_modules'], // node_modules is in project root
      extensions: ['', '.js']
    },
    plugins: [
      new ExtractTextPlugin('billing_styles.css'),
    ],
    externals: {
    // jquery available inside webpack bundle
    'jquery': '$'
  }
}


if (PRODUCTION) {

  // plugins

  const prod_plugins = R.union(WEBPACK_DEV_CONFIG.plugins, [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        output: {comments: false},
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ])


  // loaders

  const prod_loaders = R.update(0, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', 'css-loader?minimize!postcss-loader')
  }, WEBPACK_DEV_CONFIG.module.loaders)


  // production config

  const WEBPACK_PRODUCTION_CONFIG = R.compose(
    R.assoc('plugins', prod_plugins),
    R.assoc(['module', 'loaders'], prod_loaders),
    R.assoc('devtool', 'eval')
  )(WEBPACK_DEV_CONFIG)


  module.exports = WEBPACK_PRODUCTION_CONFIG
} else {
  module.exports = WEBPACK_DEV_CONFIG
}
