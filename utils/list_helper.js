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

const	favoriteBlog = (blogs) =>
{
	let	maxLikes;
	let	favorite;

	maxLikes = Math.max(...blogs.map(x => x.likes));
	favorite = blogs.filter(x => x.likes === maxLikes);
	return (favorite);
}

const	mostBlogs = (blogs) =>
{
	const	dictionary = {};
	let		authors;
	let		maxBlogs;
	let		topAuthors;

	for (let blog of blogs)
	{
		if (dictionary[blog.author])
		{
			dictionary[blog.author]++;
		}
		else
		{
			dictionary[blog.author] = 1;
		}
	}
	authors = Object.entries(dictionary).map(([author, blogs]) => ({author, blogs}));
	maxBlogs = Math.max(...authors.map(x => x.blogs));
	topAuthors = authors.filter(x => x.blogs === maxBlogs);
	return (topAuthors);
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };