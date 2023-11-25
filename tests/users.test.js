const	supertest = require('supertest');
const	app = require('../app');
const	dbConnect = require('../utils/dbConnect');
const	helper = require('./users_test_helper');

const	api = supertest(app);
const	url = '/api/users';

afterAll(() =>
{
	dbConnect.closeDB();
})

describe('test POST requests for Users', () =>
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
		expect(usersInDb).toHaveLength(0);
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
		expect(usersInDb).toHaveLength(0);
		expect(result.body.error).toBeDefined();
		expect(result.body.error).toMatch(/minimum allowed length/);
	})
})