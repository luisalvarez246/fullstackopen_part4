/* eslint-disable no-undef */
const	config = require('./config');
const	logger = require('./logger');
const	mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const	connectDB = async () =>
{
	try 
	{
		await mongoose.connect(config.MONGODB_URI);
		logger.info('connected to MongoDB');
	} 
	catch (error) 
	{
		logger.error(`Error connecting to MongoDB: ${error}`);
		process.exit(1);
	}
}

const	closeDB = () =>
{
	mongoose.connection.close();
}

module.exports = { connectDB, closeDB };