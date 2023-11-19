/* eslint-disable indent */
const	Blog = require('../models/Blog');

const	getAllBlogs = async (request, response, next) => 
{
	try
	{
		const	result = await Blog.find({});

		response.json(result);
	}
	catch(error)
	{
		next(error);
	}
}

const	saveBlog = async (request, response, next) => 
{
	const	body = request.body;
	const	blog = new Blog(
	{
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	})

	try
	{
		const	savedBlog = await blog.save();

		response.json(savedBlog);
	}
	catch(error)
	{
		next(error);
	}
}

module.exports = { getAllBlogs, saveBlog };
