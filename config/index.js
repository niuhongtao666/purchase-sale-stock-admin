'use strict'


const path = require('path')

module.exports = {
	dev: {
		// Paths
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
		  '/api':{
		    target:'http://10.165.5.167:8088/',
        changeOrigin:true,
        pathRewrite:{
		      '^/api':''
        }
      }
    },

		// Various Dev Server settings
		// host: '10.165.106.200', // can be overwritten by process.env.HOST
    //
		host: '192.168.99.74', // can be overwritten by process.env.HOST
		port: 8283, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
		autoOpenBrowser: false,
		errorOverlay: true,
		notifyOnErrors: true,
		poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

		/**
		 * Source Maps
		 */

		// https://webpack.js.org/configuration/devtool/#development
		devtool: 'cheap-module-eval-source-map',

		// If you have problems debugging vue-files in devtools,
		// set this to false - it *may* help
		// https://vue-loader.vuejs.org/en/options.html#cachebusting
		cacheBusting: true,

		cssSourceMap: true
	},

	build: {
    prodEnv: require('./prod.env'),
    testEnv: require('./test.env'),
    devEnv: require('./dev.env'),
    jkEnv:require('./jk.env'),
		// Template for index.html
		index: path.resolve(__dirname, '../dist/index.html'),

		// Paths
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',

		/**
		 * Source Maps
		 */
		productionSourceMap: true,
		// https://webpack.js.org/configuration/devtool/#production
		devtool: '#source-map',
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		// Run the build command with an extra argument to
		// View the bundle analyzer report after build finishes:
		// `npm run build --report`
		// Set to `true` or `false` to always turn it on or off
		bundleAnalyzerReport: process.env.npm_config_report
	}
}
