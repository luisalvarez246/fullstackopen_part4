/* eslint-disable no-undef */
/* eslint-disable indent */
const	Blog = require('../models/Blog');

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
	const	user = request.user;
	let		blog;

	if (!user)
	{
		return (response.status(401).json({ error: 'invalid token'}));
	}
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
	const	blogId = request.params.id;
	const	user = request.user;
	let		blog;

	if (!user)
	{
		return (response.status(401).json({ error: 'invalid token'}));
	}
	try
	{
		blog = await Blog.findById(blogId);
		if ((user.id) && (blog.user.toString() === user.id))
		{
			await Blog.findByIdAndDelete(blogId);
			response.status(204).end()
		}
		else
		{
			return (response.status(401).json({ error: 'a blog can only be deleted by his/her owner'}));
		}
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
		likes: request.body.likes,
		userId: request.body.userId,
	}

	try
	{
		const	updatedBlog = await Blog.findByIdAndUpdate(id, {likes: blog.likes, user: blog.userId}, {runValidators: true, context: 'query'});
		response.json(updatedBlog);
	}
	catch(error)
	{
		next(error);
	}
}

module.exports = { getAllBlogs, saveBlog, deleteBlog, updateBlogById };
