const	blogsRouter = require('express').Router();
const	blogService = require('../services/BlogsService');

blogsRouter.get('/', async (request, response) =>
{
	await blogService.getAllBlogs(request, response);
})

blogsRouter.post('/', async (request, response) =>
{
	await blogService.saveBlog(request, response);
})

module.exports = blogsRouter;