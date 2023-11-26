const	parseRequest = (password) =>
{
	let	error;

	if (!password)
	{
		error = 'Error: password must be given';
	}
	else if (password.length < 3)
	{
		error = 'Error: password must be at least 3 characters long';
	}
	else
	{
		error = null;
	}
	return (error);
}

module.exports = { parseRequest };