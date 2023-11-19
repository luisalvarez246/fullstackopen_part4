const	app = require('./app');
const	config = require('./utils/config');
const	logger = require('./utils/logger');

app.listen(config.PORT, () => 
{
	logger.info(`Server running on port ${config.PORT}`);
	logger.info('\x1b[34m%s\x1b[0m', `http://localhost:${config.PORT}/api/blogs`);
})