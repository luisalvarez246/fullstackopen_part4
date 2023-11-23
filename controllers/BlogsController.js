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

blogsRouter.delete('/:id', async (request, response, next) =>
{
	await blogService.deleteBlog(request, response, next);
})

module.exports = blogsRouter;