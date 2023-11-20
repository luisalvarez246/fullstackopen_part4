const	listHelper = require('../utils/list_helper');

test('dummy returns one', () => 
{
	//arrange
	const	blogs = [];
	let		result;
	//act
	result = listHelper.dummy(blogs);
	//assert
	expect(result).toBe(1);
})

const blogs = 
[
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}  
]

describe('test totalLikes function', () =>
{
	test('when list has only one blog, equals the likes of that', () =>
	{
		//arrange
		const	blog = blogs.slice(0, 1);
		let		result;
		//act
		result = listHelper.totalLikes(blog);
		//assert
		expect(result).toBe(7);
	})

	test('total likes in blog', () =>
	{
		//arrange
		let		result;
		//act
		result = listHelper.totalLikes(blogs);
		//assert
		expect(result).toBe(36);
	})
})

describe('tests for favoriteBlog function', () =>
{
	test('returns empty array when called with empty array', () =>
	{
		//arrange
		const	blog = [];
		let		result;
		//act
		result = listHelper.favoriteBlog(blog);
		//assert
		expect(result).toEqual([]);
	})

	test('returns array with 1 object when there is a favorite', () =>
	{
		//arrange
		let		result;
		//act
		result = listHelper.favoriteBlog(blogs);
		//assert
		expect(result.length).toBe(1);
		expect(result[0].likes).toBe(12);
	})

	test('returns array with 2 or more objects when there is a tie', () =>
	{
		//arrange
		const	blog =
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		};
		let		result;
		let		newBlogsArray;
		//act
		newBlogsArray = blogs.concat(blog);
		result = listHelper.favoriteBlog(newBlogsArray);
		//assert
		expect(result.length).toBe(2);
		expect(result[0].likes).toBe(12);
		expect(result[1].likes).toBe(12);
	})
})

describe('tests for mostBlogs function', () =>
{
	test('returns empty author array when called with empty array', () =>
	{
		//arrange
		const	blog = [];
		let		result;
		//act
		result = listHelper.mostBlogs(blog);
		//assert
		expect(result).toEqual([]);
	})
	
	test('returns authors array with 1 object when there is a top blogger', () =>
	{
		//arrange
		let		result;
		//act
		result = listHelper.mostBlogs(blogs);
		//assert
		expect(result.length).toBe(1);
		expect(result[0]).toHaveProperty('author');
		expect(result[0]).toHaveProperty('blogs');
	})
	
	test('returns authors array with 2 object when there is a tie', () =>
	{
		//arrange
		const	blog =
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12,
			__v: 0
		};
		let		result;
		let		newBlogsArray;
		//act
		newBlogsArray = blogs.concat(blog);
		result = listHelper.mostBlogs(newBlogsArray);
		//assert
		expect(result.length).toBe(2);
	})
})

describe('tests for mostLikes function', () =>
{
	test('returns empty likes array when called with empty array', () =>
	{
		//arrange
		const	blog = [];
		let		result;
		//act
		result = listHelper.mostLikes(blog);
		//assert
		expect(result).toEqual([]);
	})
	
	test('returns likes array with 1 object when there is a top liked', () =>
	{
		//arrange
		let		result;
		//act
		result = listHelper.mostLikes(blogs);
		//assert
		expect(result.length).toBe(1);
		expect(result[0]).toHaveProperty('author');
		expect(result[0]).toHaveProperty('likes');
	})
	
	test('returns likes array with 2 object when there is a tie', () =>
	{
		//arrange
		const	blog =
		{
			_id: '5a422b3a1b54a676234d17f9',
			title: 'Canonical string reduction',
			author: 'Robert C. Martin',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 5,
			__v: 0
		};
		let		result;
		let		newBlogsArray;
		//act
		newBlogsArray = blogs.concat(blog);
		result = listHelper.mostLikes(newBlogsArray);
		//assert
		console.log(result);
		expect(result.length).toBe(2);
	})
})