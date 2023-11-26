const	supertest = require('supertest');
const	app = require('../app');
const	dbConnect = require('../utils/dbConnect');
const	helper = require('./users_test_helper');
const	User = require('../models/User');

const	api = supertest(app);
const	url = '/api/users';

beforeEach(async () =>
{
	await User.deleteMany({});
	const	usersObject = helper.initialUsers.map(user => new User(user));
	const	promiseArray = usersObject.map(user => user.save());

	await Promise.all(promiseArray);
}, 10000)

afterAll(() =>
{
	dbConnect.closeDB();
})

describe('test fields validation, POST requests for Users', () =>
{
	test('missing username does not save user and returns error msg', async () =>
	{
		//arrange
		let	result;
		let	user = helper.missingUsername;
		let	usersInDb;
		//act
		result = await api.post(url).send(user);
		usersInDb = await helper.usersInDb();
		//assert
		expect(usersInDb).toHaveLength(helper.initialUsers.length);
		expect(result.body.error).toBeDefined();
		expect(result.body.error).toMatch(/`username` is required/);
	})

	test('username less than 3 characters long does not save user and returns error msg', async () =>
	{
		//arrange
		let	result;
		let	user = helper.invalidUsername;
		let	usersInDb;
		//act
		result = await api.post(url).send(user);
		usersInDb = await helper.usersInDb();
		//assert
		expect(usersInDb).toHaveLength(helper.initialUsers.length);
		expect(result.body.error).toBeDefined();
		expect(result.body.error).toMatch(/minimum allowed length/);
	})

	test('repeated username does not save user and returns error msg', async () =>
	{
		//arrange
		let	result;
		let	user = helper.repeatedUsername;
		let	usersInDb;
		//act
		result = await api.post(url).send(user);
		usersInDb = await helper.usersInDb();
		//assert
		expect(usersInDb).toHaveLength(helper.initialUsers.length);
		expect(result.body.error).toBeDefined();
		expect(result.body.error).toMatch(/expected `username` to be unique/);
	})

	test('missing password does not save user and returns error msg', async () =>
	{
		//arrange
		let	result;
		let	user = helper.missingPassword;
		let	usersInDb;
		//act
		result = await api.post(url).send(user);
		usersInDb = await helper.usersInDb();
		//assert
		expect(usersInDb).toHaveLength(helper.initialUsers.length);
		expect(result.body.error).toBeDefined();
		expect(result.body.error).toBe('Error: password must be given');
	})

	test('password less than 3 characters long does not save user and returns error msg', async () =>
	{
		//arrange
		let	result;
		let	user = helper.invalidPassword;
		let	usersInDb;
		//act
		result = await api.post(url).send(user);
		usersInDb = await helper.usersInDb();
		//assert
		expect(usersInDb).toHaveLength(helper.initialUsers.length);
		expect(result.body.error).toBeDefined();
		expect(result.body.error).toBe('Error: password must be at least 3 characters long');
	})
})