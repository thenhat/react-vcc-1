const coreplugin = require('coreplugin');
const pluginConfig = require('./plugin.config');

coreplugin.purge(pluginConfig, process.argv);