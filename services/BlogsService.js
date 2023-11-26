/* eslint-disable no-undef */
/* eslint-disable indent */
const	Blog = require('../models/Blog');
const	User = require('../models/User');
const	jwt = require('jsonwebtoken');
const	tokenHelper = require('../utils/token_helper');

const	getAllBlogs = async (request, response, next) => 
{
	try
	{
		const	result = await Blog.find({}).populate('user', {blogs: 0});

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
	const	decodedToken = jwt.verify(tokenHelper.getToken(request), process.env.SECRET)
	let		user;
	let		blog;

	if (!decodedToken.id)
	{
		return (response.status(401).json({ error: 'invalid token' }))
	}
	user = await User.findById(decodedToken.id);
	blog = new Blog(
	{
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id
	})

	try
	{
		const	savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();

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
