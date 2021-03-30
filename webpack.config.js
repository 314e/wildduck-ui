const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const BabelMultiTargetPlugin = require('webpack-babel-multi-target-plugin').BabelMultiTargetPlugin;

const modeConfig = (mode) => require(`./buildUtils/webpack.${mode}`);

const getCopyWebpackPlugins = (files) =>
	new CopyWebpackPlugin(
		files.map((file) => ({
			from: path.join(__dirname, `public/${file}`),
			to: path.join(__dirname, `dist/${file}`),
		}))
	);

const getIncludeDirs = () => [path.join(__dirname, 'src'), path.join(__dirname, 'submodules/wildduck-redux/src')];

const getPlugins = (analyse) => {
	const plugins = [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		getCopyWebpackPlugins(['favicon', 'svg', 'style.css', 'index.html', 'manifest.json', 'robots.txt']),
		// ___ANTD___ specific
		new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es-us/),
	];
	if (analyse) {
		plugins.push(new BundleAnalyzerPlugin());
	}
	return plugins;
};

module.exports = ({ mode, analyse } = { mode: 'production', analyse: false }) => {
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
						use: [
							{
								loader: 'awesome-typescript-loader',
							},
						],
					},
				],
			},
			plugins: getPlugins(analyse),
			resolve: {
				alias: {
					'app-ui': path.resolve(__dirname, 'src'),
					'app-redux': path.resolve(__dirname, 'submodules/wildduck-redux/src'),
					// UI
					components: path.resolve(__dirname, 'src/components'),
					lib: path.resolve(__dirname, 'src/lib'),
					'ui-utils': path.resolve(__dirname, 'src/utils'),
					styles: path.resolve(__dirname, 'src/styles'),
					'ui-types': path.resolve(__dirname, 'src/types'),
					// Redux
					actions: path.resolve(__dirname, 'submodules/wildduck-redux/src/actions'),
					'action-types': path.resolve(__dirname, 'submodules/wildduck-redux/src/actiontypes'),
					'redux-types': path.resolve(__dirname, 'submodules/wildduck-redux/src/types'),
					'redux-utils': path.resolve(__dirname, 'submodules/wildduck-redux/src/utils'),
					client: path.resolve(__dirname, 'submodules/wildduck-redux/src/client'),
					'redux-constants': path.resolve(__dirname, 'submodules/wildduck-redux/src/constants'),
					'redux-config': path.resolve(__dirname, 'submodules/wildduck-redux/src/config'),
					logic: path.resolve(__dirname, 'submodules/wildduck-redux/src/logic'),
					store: path.resolve(__dirname, 'submodules/wildduck-redux/src/store'),
				},
				extensions: ['.tsx', '.ts', '.js', '.json'],
				mainFields: [
					// these are generally shipped as a higher ES language level than `module`
					'es2015',
					// current leading de-facto standard - see https://github.com/rollup/rollup/wiki/pkg.module
					'module',
					'main',
				],
			},
			node: {
				console: true,
				fs: 'empty',
				net: 'empty',
				tls: 'empty',
			},
			target: 'web',
		},
		modeConfig(mode)
	);
};
