const	supertest = require('supertest');
const	app = require('../app');
const	dbConnect = require('../utils/dbConnect');
const	Blog = require('../models/Blog');
const	helper = require('./test_helper');

const	api = supertest(app);

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
		response = await api.get('/api/blogs');
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
		response = await api.get('/api/blogs');
		blogs = response.body;
		//assert
		expect(blogs).toHaveLength(helper.initialBlogs.length);
	})
})

