const	usersRouter = require('express').Router();
const	usersService = require('../services/UsersService');

usersRouter.get('/', async (request, response, next) =>
{
	await usersService.getAllUsers(request, response, next);
})

usersRouter.post('/', async (request, response, next) =>
{
	await usersService.saveUser(request, response, next);
})

module.exports = usersRouter;