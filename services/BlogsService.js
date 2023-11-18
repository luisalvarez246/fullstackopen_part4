/* eslint-disable indent */
const	Blog = require('../models/Blog');

const	getAllBlogs = async (request, response) => 
{
	try
	{
		const	result = await Blog.find({});

		response.json(result);
	}
	catch(error)
	{
		console.log(error);
	}
}

const	saveBlog = async (request, response) => 
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
		console.log(error);
	}
}

module.exports = { getAllBlogs, saveBlog };
