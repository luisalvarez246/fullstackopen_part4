const	Blog = require('../models/Blog');
const	User = require('../models/User');

const resetDB = async (request, response) =>
{
	await Blog.deleteMany({});
	await User.deleteMany({});

	response.status(204).end();
};

module.exports = { resetDB };