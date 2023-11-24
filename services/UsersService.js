/* eslint-disable indent */
const	User = require('../models/User');
const	bcrypt = require('bcrypt');

const	getAllUsers = async (request, response, next) =>
{
	try
	{
		const	result = await User.find({});

		response.json(result);
	}
	catch(error)
	{
		next(error);
	}
}

const	saveUser = async (request, response, next) =>
{
	const	{ username, password, name } = request.body;
	const	saltRounds = 10;

	const	passwordHash = await bcrypt.hash(password, saltRounds);
	const	user = new User(
	{
		username,
		passwordHash,
		name
	})

	try
	{
		const	savedUser = await user.save();
		response.json(savedUser);
	}
	catch(error)
	{
		next(error);
	}
}

module.exports = { getAllUsers, saveUser };