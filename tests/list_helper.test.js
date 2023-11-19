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