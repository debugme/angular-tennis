import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const getConfiguration = environment => {

  const clientConfiguration = {

    // -------------------------------------------------------------------------------------
    // Define the root dependencies for application modules and vendor modules.
    // Since browsers cache files by name and we assume vendor modules will be
    // changed less frequently than application modules, we intentionally want
    // to create separate bundles to reduce the number of files a browser will
    // need to download on future loads of our application.
    // -------------------------------------------------------------------------------------
    entry: {
      bundle: 'source/client/application/components/Application.js',
      vendor: ['moment', 'angular']
    },

    // -------------------------------------------------------------------------------------
    // Define which folder the application bundle and vendor bundle should be output into.
    // The bundle names include a hash of its contents as a browser cache-busting strategy.
    // This ensures that even though a bundle may be rebuilt in the future, if its contents
    // have not been changed, then its name will not change, which means that the browser
    // can assume any previous version it has downloaded and cached, can be used instead of
    // downloading the file again. Additionally by specifying the pathinfo to be true, we
    // are requesting that requires inside our bundle files should be commented to make it
    // explicit what file is actually being referenced by the require call.
    // -------------------------------------------------------------------------------------
    output: {
      path: path.join(__dirname, 'build', 'client'),
      filename: '[name].[chunkhash].js',
      pathinfo: true
    },

    // -------------------------------------------------------------------------------------
    // Our code is transformed from ES2015 and JSX into ES5, so we would like source maps
    // generated to facilitate debugging efforts. For development builds, we are happy
    // for the source map information to be added into the bundle. This yields larger
    // files but the bundling completes faster. However for production builds, we want the
    // smallest bundle files possible, so our strategy is to embed URIs to the source-map
    // file in the bundle file, which can be downloaded on demand.
    // -------------------------------------------------------------------------------------
    devtool: environment.production ? 'source-map' : 'eval',

    // -------------------------------------------------------------------------------------
    // We need to tell WebPack where to look for modules, what files should be considered as
    // modules and what aliases we can use to refer to specific modules when establishing
    // inter-module dependencies via import statements. These three requirements are satisfied
    // by filling in values for the "modules", "extensions" and "alias" properties respectively.
    // -------------------------------------------------------------------------------------
    resolve: {
      modules: ['node_modules', __dirname],
      extensions: ['.js', '.css', '.scss'],
      alias: {
        'Header': 'source/client/application/components/Header',
        'Content': 'source/client/application/components/Content',
        'Footer': 'source/client/application/components/Footer',
        'AvatarImage': 'source/client/images/avatar.jpg',
        'GeneralStyle': 'source/client/styles/general.scss',
        'LayoutStyle': 'source/client/styles/layout.scss',
        'ResponsiveStyle': 'source/client/styles/responsive.scss'
      }
    },

    // -------------------------------------------------------------------------------------
    // We need to tell WebPack how to transform each module it finds, so that it can be
    // converted into an executable form. In the case of JavaScript files written in ES2015+,
    // they need to be converted into ES5, in the case of SCSS files written in SASS,
    // they need to be converted into normal CSS and in the case of webfont files, the woff2
    // file needs to be copied over into the public folder. The rules specified below describe
    // which loader should be used to transform what types of files and what folders it should
    // not look into when trying to find files to transform. The "rules" section describes how
    // a loader should transform EACH file that it loads. The loaders below behave as follows:
    // 1. The babel-loader treats all .js and .jsx files as modules it needs to convert into ES5.
    //    It ignores all files found in the node_modules and public folders.
    // 2. The ExtractTextPlugin treats all .css and .scss files as modules. It converts each file
    //    from a SASS file into a CSS file. It then converts each CSS file into a CSS String.
    // 3. The first file-loader loads the WOFF file which is used to render the application icons.
    //    The "publicPath" and "outputPath" attributes are used to preserve folder structure when the
    //    WOFF file is copied into the "public" folder. The file name includes a cache-busting hash.
    // 4. The image-webpack-loader loads and compresses image files matched by the test. Then the
    //    url-loader looks at its limit and decides if the image should be encoded into base64
    //    and embedded into the page or if the image should be emitted as a separate file and
    //    referenced in the page instead. In the case below, any image under 8092 bytes will be
    //    base64-encoded and embedded into the page and any image above 8092 will be emitted as
    //    a separate file and referenced from the web page instead.
    // -------------------------------------------------------------------------------------

    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /(build|documentation|node_modules)/
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
            },
            {
              loader: 'image-webpack-loader'
            }
          ]
        }
      ]
    },

    // -------------------------------------------------------------------------------------
    // The "plugins" section describes how a plugin should transform ALL files a loader loads.
    // 1. The "CommonsChunkPlugin" stores data about which of the bundle and vendor files
    //    have changed in a manifest file. If we do not specify the manifest file, this
    //    information will be stored inside the vendor file, thus causing unneeded cache-busting.
    // 2. The "ExtractTextPlugin" is used to concatenate generated CSS files into a single CSS file.
    //    This file includes a hash generated from its contents in its name, thus offering the
    //    same cache-busting benefits as those provided for the generated Javascript bundles.
    // 3. The "HtmlWebpackPlugin" is used to automatically embed script/link tags for the
    //    generated bundle.js, vendor.js and bundle.css into the "index.html" file. This saves
    //    us the hassle of having to manually update the "index.html" file ourselves, each time
    //    the name of a bundled file changes.
    // -------------------------------------------------------------------------------------
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest']}),
      new ExtractTextPlugin('bundle.[contenthash].css'),
      new HtmlWebpackPlugin({template: 'source/client/application/index.html'}),
      new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
    ]
  }

// See "http://jlongster.com/Backend-Apps-with-Webpack--Part-I"
//     "http://jlongster.com/Backend-Apps-with-Webpack--Part-II"
//     "http://jlongster.com/Backend-Apps-with-Webpack--Part-III"
// For more details on how to add babel and hot-reloading to your back-end
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

  const serverConfiguration = {
    entry: {
      server: path.join(__dirname, 'source', 'server', 'server.js')
    },
    devtool: 'eval',
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /(build|documentation|node_modules)/
        }
      ]
    },
    target: 'node',
    output: {
      path: path.join(__dirname, 'build', 'server'),
      filename: '[name].js',
    },
    externals: nodeModules
  }

  return [clientConfiguration, serverConfiguration]
}

module.exports = getConfiguration