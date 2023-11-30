const	supertest = require('supertest');
const	app = require('../app');
const	dbConnect = require('../utils/dbConnect');
const	Blog = require('../models/Blog');
const	User = require('../models/User');
const	helper = require('./test_helper');
const	userHelper = require('./users_test_helper');

const	api = supertest(app);
const	url = '/api/blogs';
const	userUrl = '/api/users';
const	loginUrl = '/api/login';
let		token;

beforeEach(async() =>
{
	let	users;
	await Blog.deleteMany({});
	await User.deleteMany({});

	const	blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
	let		promiseArray = blogObjects.map(blog => blog.save());
	promiseArray = promiseArray.concat(userHelper.initialUsers.map(user => api.post(userUrl).send(user)));

	await Promise.all(promiseArray);
	users = await api.get(userUrl);
	users.body[0].password = 'jake';
	console.log(users.body[0], userHelper.initialUsers[0]);
	let	login = await api.post(loginUrl).send(users.body[0]);
	token = login.body.token;
}, 100000)

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
	test('if no authorization token is provided an error is thrown', async () =>
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
		expect(response.status).toBe(401);
		expect(response.unauthorized).toBe(true);
		expect(response.body.error).toBeDefined();
		expect(response.body.error).toBe('invalid token');
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	}, 100000)

	test('POST request creates a new blog', async () =>
	{
		//arrange
		let	response;
		let	blog;
		let	blogsAtEnd;
		//act
		blog = helper.blogObject;
		response = await api.post(url).set('Authorization', `bearer ${token}`).send(blog);
		blogsAtEnd = await helper.blogsInDb();
		//assert
		expect(response.status).toBe(201);
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
	})

	test('likes default to 0 if likes is missing from the request', async () =>
	{
		//arrange
		let	response;
		let	blog;
		//act
		blog = helper.likesMissing;
		await api.post(url).set('Authorization', `bearer ${token}`).send(blog);
		response = await helper.blogsInDb();
		//assert
		expect(blog.likes).toBeUndefined();
		expect(response[response.length - 1].likes).toBe(0);
	}, 100000)

	test('if title or url are missing, the backend throws an error', async () =>
	{
		//arrange
		let	response;
		let	blog;
		//act
		blog = helper.titleMissing;
		response = await api.post(url).set('Authorization', `bearer ${token}`).send(blog);
		//assert
		expect(response.status).toBe(400);
		//act2
		blog = helper.urlMissing;
		response = await api.post(url).set('Authorization', `bearer ${token}`).send(blog);
		//assert2
		expect(response.status).toBe(400);
	}, 100000)
})

describe('DELETE requests testing', () =>
{
	test('DELETE w/o token throws error', async () =>
	{
		//arrange
		let	blogs;
		let	toDelete;
		let	response;
		let	blogsAtEnd;
		//act
		blogs = await helper.blogsInDb();
		toDelete = blogs[0];
		response = await api.delete(`${url}/${toDelete.id}`);
		blogsAtEnd = await helper.blogsInDb();
		//assert
		expect(response.status).toBe(401);
		expect(response.body.error).toBe('invalid token');
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
	})

	test('DELETE request eliminates a blog entry', async () =>
	{
		//arrange
		let	blogs;
		let	toDelete;
		let	response;
		let	blogsAtEnd;
		let	users;
		//act
		blogs = await api.get(url);
		users = await api.get(userUrl);
		blogs.body[0].user = users.body[0].id;
		const updatedBlog = await api.put(`${url}/${blogs.body[0].id}`).send(blogs.body[0]);
		toDelete = updatedBlog.body;
		response = await api.delete(`${url}/${toDelete.id}`).set('Authorization', `bearer ${token}`);
		blogsAtEnd = await helper.blogsInDb();
		//assert
		expect(response.status).toBe(204);
		expect(blogsAtEnd).not.toContainEqual(toDelete);
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
	}, 100000)
})

describe('PUT requests testing', () =>
{
	test('PUT request updates likes from specified blog', async () =>
	{
		//arrange
		let	blogs;
		let	toUpdate;
		let	blogsAtEnd;
		//act
		blogs = await helper.blogsInDb();
		toUpdate = blogs[0];
		await api.put(`${url}/${toUpdate.id}`).send({likes: 300});
		blogsAtEnd = await helper.blogsInDb();
		//assert
		expect(blogsAtEnd[0].likes).toBe(300);
		console.log(blogsAtEnd);
	})
})
