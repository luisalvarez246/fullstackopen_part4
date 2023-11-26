/* eslint-disable no-undef */
const	User = require('../models/User');
const	bcrypt = require('bcrypt');
const	jwt = require('jsonwebtoken');

const passwordCheck = async (user, password) =>
{
	let	passwordCorrect;

	if (user)
	{
		passwordCorrect = await bcrypt.compare(password, user.passwordHash);
	}
	else
	{
		passwordCorrect = false;
	}
	return (passwordCorrect);
}

const userLogin = async (request, response, next) =>
{
	const	{ username, password } = request.body;
	let		user;
	let		passwordCorrect;
	let		userForToken;
	let		token;

	try
	{
		user = await User.findOne({ username });
		passwordCorrect = await passwordCheck(user, password);
	}
	catch(error)
	{
		next(error);
	}
	if (!(user && passwordCorrect))
	{
		return (response.status(401).json({ error: 'invalid username or password' }));
	}
	userForToken = 
	{
		username: user.username, 
		id: user._id
	};
	token = jwt.sign(userForToken, process.env.SECRET);
	response.status(200).send({ token, username: user.username, name: user.name });
};

module.exports = { userLogin };