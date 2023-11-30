const	Blog = require('../models/Blog');

const initialBlogs = 
[
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		user: '5a422a851b54a676234d17f7',
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		user: '5a422a851b54a676234d17f7',
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		user: '5a422a851b54a676234d17f7',
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		user: '5a422a851b54a676234d17f7',
		__v: 0
	}  
]

const	blogObject = 
{
	_id: '5a422bc61b54a676234d17fz',
	title: 'Ahsoka',
	author: 'Dave Filoni',
	url: 'ahsoka.com',
	likes: 58,
	__v: 0
}

const	titleMissing = 
{
	_id: '5a422bc61b54a676234d17fz',
	author: 'Dave Filoni',
	url: 'ahsoka.com',
	likes: 58,
	__v: 0
}

const	urlMissing = 
{
	_id: '5a422bc61b54a676234d17fz',
	title: 'Ahsoka',
	author: 'Dave Filoni',
	likes: 58,
	__v: 0
}

const	likesMissing = 
{
	_id: '5a422bc61b54a676234d17fz',
	title: 'Ahsoka',
	author: 'Dave Filoni',
	url: 'ahsoka.com',
	__v: 0
}

const	blogsInDb = async () =>
{
	const	blogsDb = await Blog.find({});

	return (blogsDb.map(blog => blog.toJSON()));
}

module.exports = { initialBlogs, blogsInDb, blogObject, likesMissing, titleMissing, urlMissing };