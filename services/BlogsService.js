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

const	deleteBlog = async (request, response, next) =>
{
	const	id = request.params.id;

	try
	{
		await Blog.findByIdAndDelete(id);
		response.status(204).end()
	}
	catch(error)
	{
		next(error);
	}
}

const	updateBlogById = async (request, response, next) =>
{
	const	id = request.params.id;
	const	blog =
	{
		likes: request.body.likes
	}

	try
	{
		const	updatedBlog = await Blog.findByIdAndUpdate(id, {likes: blog.likes}, {runValidators: true, context: 'query'});
		response.json(updtedBlog);
	}
	catch(error)
	{
		next(error);
	}
}

module.exports = { getAllBlogs, saveBlog, deleteBlog, updateBlogById };
