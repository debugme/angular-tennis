import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import dotenv from 'dotenv'

dotenv.load()

const getConfiguration = environment => {

  const clientConfiguration = {

    entry: {
      bundle: 'source/client/application/components/Application',
      vendor: ['angular']
    },

    output: {
      path: path.join(__dirname, 'build', 'client'),
      filename: '[name].[chunkhash].js',
      pathinfo: true
    },

    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval',

    resolve: {
      modules: ['node_modules', __dirname],
      extensions: ['.js', '.css', '.jpg', '.scss'],
      alias: {
        'AppHeader': 'source/client/application/components/app-header',
        'AppContent': 'source/client/application/components/app-content',
        'AppFooter': 'source/client/application/components/app-footer',
        'AvatarImage': 'source/client/images/avatar',
        'GeneralStyle': 'source/client/styles/general',
        'LayoutStyle': 'source/client/styles/layout',
        'ResponsiveStyle': 'source/client/styles/responsive',
        'VariablesPartial': 'source/client/styles/partials/_variables',
        'FlexLayoutMixin': 'source/client/styles/mixins/flex-layout',
        'CardLayoutMixin': 'source/client/styles/mixins/card-layout'
      }
    },

    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /(build|node_modules)/
        },
        {
          loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
          test: /\.s?css/
        },
        {
          loader: 'file-loader?name=[name].[hash].[ext]',
          test: /\.(woff2)$/
        },
        {
          test: /\.(jpe?g|png|gif|svg)/,
          use: [
            {
              loader: 'url-loader', options: {
                limit: 4096
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }),
      new ExtractTextPlugin('bundle.[contenthash].css'),
      new HtmlWebpackPlugin({ template: 'source/client/application/index.html' }),
      new webpack.DefinePlugin({ 'process.env.PORT': JSON.stringify(process.env.PORT) }),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
    ]
  }

  const serverConfiguration = {

    entry: {
      server: 'source/server/server'
    },

    devtool: 'eval',

    resolve: {
      modules: ['node_modules', __dirname],
      extensions: ['.js', '.json'],
      alias: {
        'Content': 'source/server/connectors/content',
        'Matches': 'source/server/connectors/matches',
        'Geocode': 'source/server/connectors/geocode',
        'Weather': 'source/server/connectors/weather',
        'Logging': 'source/server/connectors/logging',
        'Routing': 'source/server/connectors/routing',
        'Express': 'source/server/connectors/express',
        'WebpackConfig': 'webpack.config.babel',
        'MatchesData': 'source/server/datastore/tournament'
      }
    },

    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /(build|node_modules)/
        }
      ]
    },

    target: 'node',

    output: {
      path: path.join(__dirname, 'build', 'server'),
      filename: '[name].js',
    },

    externals: nodeExternals()
  }

  return [clientConfiguration, serverConfiguration]
}

module.exports = getConfiguration