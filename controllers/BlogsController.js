const	blogsRouter = require('express').Router();
const	blogService = require('../services/BlogsService');

blogsRouter.get('/', async (request, response, next) =>
{
	await blogService.getAllBlogs(request, response, next);
})

blogsRouter.post('/', async (request, response, next) =>
{
	await blogService.saveBlog(request, response, next);
})

module.exports = blogsRouter;