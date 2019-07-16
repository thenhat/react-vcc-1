const path = require('path');
const config = require('./config');

module.exports = {
	root: path.join(__dirname, './'),
	namespace: 'IMSWidgets',
	name: process.env.NAME,
	version: process.env.VERSION,
	env: process.env.NODE_ENV,
	publicUrl: config.publicUrl,
	staticUrl: config.staticUrl,
	purgeUrl: 'http://graphs.cdn.vccloud.vn/__purge/',
	plugins: {
		name: 'sample',
		entry: path.join(__dirname, './plugin.register.js'),
		locales: {
			en: {
				scope: path.join(__dirname, './'),
				value: require('./src/locales/en.json')
			}
		},
		alias: {
			'config': path.join(__dirname, './config'), // @sample/config
			'assets': path.join(__dirname, './src/assets'),
			'constants': path.join(__dirname, './src/constants')
		},
		statics: path.join(__dirname, './statics')
	},
	request: {
		timeout: 100000,
		maxRetryErrorAuthentication: 5
	},
	devServer: {
		host: '127.0.0.1',
		port: 1200
	}
};