import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'client/src/index.jsx'),
  target: 'web',
  output: {
    path: `${__dirname}/client/dist`,
/* Note: Physical files are only output by
 the production build task `npm run build`.*/
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    rules: [
      { test: /(\.css)$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })

      },
      { test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file'
      },
      {
        test: /\.(woff|woff2)$/,
        use: 'url?prefix=font/&limit=5000'
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=application/octet-stream'
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
