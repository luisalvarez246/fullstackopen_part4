const	loginRouter = require('express').Router();
const	loginService = require('../services/loginService');

loginRouter.post('/', async (request, response, next) =>
{
	await loginService.userLogin(request, response, next);
})

module.exports = loginRouter;