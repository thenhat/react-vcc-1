let config = {};

switch (process.env.NODE_ENV) {
	case 'production':
		config = require('./env/production');
		break;
	case 'closebeta':
		config = require('./env/closebeta');
		break;
	case 'beta':
		config = require('./env/beta');
		break;
	default:
		config = require('./env/development');
		break;
}

module.exports = config;