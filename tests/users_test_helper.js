const	User = require('../models/User');

const	invalidUsername =
{
	_id: '5a422a851b54a676234d17f7',
	username: 'Fn',
	password: 'jake',
	name: 'Finn',
	__v: 0
}

const	missingUsername =
{
	_id: '5a422a851b54a676234d17f7',
	password: 'jake',
	name: 'Finn',
	__v: 0
}

const	usersInDb = async () =>
{
	const	usersDb = await User.find({});

	return (usersDb.map(user => user.toJSON()));
}


module.exports = { invalidUsername, missingUsername, usersInDb };