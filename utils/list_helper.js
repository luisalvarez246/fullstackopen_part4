const	dummy = (blogs) =>
{
	return (1);
}

const	totalLikes = (blogs) =>
{
	let	likes;
	
	likes = blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0);
	return (likes);
}

module.exports = { dummy, totalLikes };