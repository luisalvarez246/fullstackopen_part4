const	testingRouter = require('express').Router();
const	testingService = require('../services/testingService');

testingRouter.post('/reset', async (request, response) =>
{
	await testingService.resetDB(request, response);
})

module.exports = testingRouter;