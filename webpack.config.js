const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const modeConfig = (mode) => require(`./buildUtils/webpack.${mode}`);

const getIncludeDirs = () => [path.join(__dirname, 'src')];

const getPlugins = (analyse) => {
	const plugins = [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new CopyWebpackPlugin({
			patterns: ['favicon', 'svg', 'style.css', 'manifest.json', 'robots.txt'].map((file) => ({
				from: path.join(__dirname, `public/${file}`),
				to: path.join(__dirname, `dist/${file}`),
			})),
		}),
		// ___ANTD___ specific
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es-us/),
	];
	if (analyse) {
		plugins.push(new BundleAnalyzerPlugin());
	}
	return plugins;
};

module.exports = (props) => {
	let mode = 'production';
	if (props?.development) {
		mode = 'development';
	}

	return merge(
		{
			entry: path.join(__dirname, 'src/components/index.tsx'),
			module: {
				rules: [
					{
						test: /\.(png|svg|jpg|gif)$/,
						exclude: /(node_modules)/,
						use: 'file-loader',
					},
					{
						test: /\.(ts|tsx)$/,
						include: getIncludeDirs(),
						loader: 'ts-loader',
					},
				],
			},
			plugins: getPlugins(props.analyze),
			resolve: {
				alias: {
					'app-ui': path.resolve(__dirname, 'src'),
					// UI
					components: path.resolve(__dirname, 'src/components'),
					lib: path.resolve(__dirname, 'src/lib'),
					'ui-utils': path.resolve(__dirname, 'src/utils'),
					styles: path.resolve(__dirname, 'src/styles'),
					'ui-types': path.resolve(__dirname, 'src/types'),
					client: path.resolve(__dirname, 'src/client'),
					store: path.resolve(__dirname, 'src/store'),
				},
				extensions: ['.tsx', '.ts', '.js', '.json'],
			},
			target: 'web',
		},
		modeConfig(mode),
	);
};
