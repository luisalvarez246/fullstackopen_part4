const	User = require('../models/User');

const	initialUsers = 
[
	{
		_id: '5a422a851b54a676234d17f7',
		username: 'Finn',
		password: 'jake',
		name: 'Finn The Human',
		__v: 0
	},
	{
		_id: '5a422a851b54a676234d17f8',
		username: 'Jake',
		password: 'finn',
		name: 'Jake The Dog',
		__v: 0
	}
]

const	invalidUsername =
{
	_id: '5a422a851b54a676234d17z7',
	username: 'Fn',
	password: 'jake',
	name: 'Finn',
	__v: 0
}

const	missingUsername =
{
	_id: '5a422a851b54a676234d17z7',
	password: 'jake',
	name: 'Finn',
	__v: 0
}

const	repeatedUsername =
{
	_id: '5a422a851b54a676234d17z8',
	username: 'Jake',
	password: 'finn',
	name: 'Jake The Dog',
	__v: 0
}

const	usersInDb = async () =>
{
	const	usersDb = await User.find({});

	return (usersDb.map(user => user.toJSON()));
}


module.exports = { initialUsers, invalidUsername, missingUsername, repeatedUsername, usersInDb };