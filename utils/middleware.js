/* eslint-disable no-undef */
const	logger = require('./logger');
const	User = require('../models/User');
const	jwt = require('jsonwebtoken');

const	requestLogger = (request, response, next) =>
{
	logger.info('Method: ', request.method);
	logger.info('Path: ', request.path);
	logger.info('Body: ', request.body);
	logger.info('---');
	next();
}

const	unknownEndPoint = (request, response) =>
{
	response.status(404).send({error: 'unknown endpoint'});
}

const	errorHandler = (error, request, response, next) =>
{
	if (error.name === 'CastError')
	{
		response.status(400).send({ error: 'malformatted id' });
	}
	else if (error.name === 'ValidationError')
	{
		response.status(400).json({ error: error.message });
	}
	else if (error.name === 'JsonWebTokenError')
	{
		response.status(401).json({ error: error.message });
	}
	next(error);
}

const tokenExtractor = (request, response, next) =>
{
	const	authorization = request.get('authorization');

	if (authorization && authorization.startsWith('bearer '))
	{
		request.token = authorization.replace('bearer ', '');
	}
	else
	{
		request.token = null;
	}
	next();
}

const	userExtractor = async (request, response, next) =>
{
	if (!request.token)
	{
		return (next());
	}
	try
	{
		const	decodedToken = jwt.verify(request.token, process.env.SECRET);

		if (!decodedToken.id)
		{
			return (response.status(401).json({ error: 'invalid token' }));
		}
		request.user = await User.findById(decodedToken.id);
	}
	catch(error)
	{
		next(error);
	}
	next();
}

module.exports = { unknownEndPoint, errorHandler, requestLogger, tokenExtractor, userExtractor };