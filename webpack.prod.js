const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
	output: {
		filename: '[name].min.js'
	},
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true,
			uglifyOptions: { ecma: 5 },
		}),
		new ExtractTextPlugin('[name].min.css')
	]
});
