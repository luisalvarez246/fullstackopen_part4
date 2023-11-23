const	supertest = require('supertest');
const	app = require('../app');
const	dbConnect = require('../utils/dbConnect');
const	Blog = require('../models/Blog');
const	helper = require('./test_helper');

const	api = supertest(app);
const	url = '/api/blogs';

beforeEach(async() =>
{
	await Blog.deleteMany({});

	const	blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
	const	promiseArray = blogObjects.map(blog => blog.save());

	await Promise.all(promiseArray);
}, 10000)

afterAll(() =>
{
	dbConnect.closeDB();
})

describe('GET request testing', () =>
{
	test('blogs are returned as JSON', async () =>
	{
		//arrange
		let	response;
		//act
		response = await api.get(url);
		//assert
		expect(response.status).toBe(200);
		expect(response.header['content-type']).toMatch(/application\/json/);
	})

	test('get returns the right amount of blogs in initialBlogs', async () =>
	{
		//arrange
		let	response;
		let blogs;
		//act
		response = await api.get(url);
		blogs = response.body;
		//assert
		expect(blogs).toHaveLength(helper.initialBlogs.length);
	})

	test('response.body has a property named id', async () =>
	{
		//arrange
		let	response;
		let blogs;
		//act
		response = await api.get(url);
		blogs = response.body[0];
		//assert
		expect(blogs.id).toBeDefined();
	})
})

describe('POST requests testing', () =>
{
	test('POST request creates a new blog', async () =>
	{
		//arrange
		let	response;
		let	blog;
		let	blogsAtEnd;
		//act
		blog = helper.blogObject;
		response = await api.post(url).send(blog);
		blogsAtEnd = await helper.blogsInDb();
		//assert
		expect(response.status).toBe(200);
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
	})

	test('likes default to 0 if likes is missing from the request', async () =>
	{
		//arrange
		let	response;
		let	blog;
		//act
		blog = helper.likesMissing;
		await api.post(url).send(blog);
		response = await helper.blogsInDb();
		//assert
		expect(blog.likes).toBeUndefined();
		expect(response[response.length - 1].likes).toBe(0);
	})
})

