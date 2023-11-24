/* eslint-disable indent */
const	User = require('../models/User');
const	bcrypt = require('bcrypt');
const	parseRequest = require('../utils/userParser').parseRequest;

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
	const	error = parseRequest(password);
	let		saltRounds;
	let		passwordHash;
	let		user;

	if (error)
	{
		return (response.status(400).json({error: error}));
	}
	saltRounds = 10;
	passwordHash = await bcrypt.hash(password, saltRounds);
	user = new User(
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