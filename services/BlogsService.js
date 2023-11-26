/* eslint-disable indent */
const	Blog = require('../models/Blog');
const	User = require('../models/User');

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
	const	user = await User.find({});
	const	blog = new Blog(
	{
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user[0].id
	})

	try
	{
		const	savedBlog = await blog.save();

		response.status(201).json(savedBlog);
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
		response.json(updatedBlog);
	}
	catch(error)
	{
		next(error);
	}
}

module.exports = { getAllBlogs, saveBlog, deleteBlog, updateBlogById };
