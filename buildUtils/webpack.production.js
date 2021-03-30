const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'production',
	output: {
		filename: 'bundle.main.[contenthash:8].js',
		chunkFilename: 'bundle.[name].[contenthash:8].js',
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				include: /(src)/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								javascriptEnabled: true,
							},
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css',
		}),
	],
};
