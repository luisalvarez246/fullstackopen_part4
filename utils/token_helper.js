const	getToken = (request) =>
{
	let		token;
	const	authorization = request.get('authorization');

	console.log(`auth is ${authorization}`);
	if (authorization && authorization.startsWith('bearer '))
	{
		token = authorization.replace('bearer ', '');
		return (token);
	}
	else
	{
		return (null);
	}
}

module.exports = { getToken }