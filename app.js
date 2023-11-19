const	express = require('express');
const	app = express();
const	cors = require('cors');
const	blogsRouter = require('./controllers/BlogsController');
const	middleware = require('./utils/middleware');
const	db = require('./utils/dbConnect');

db.connectDB();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app ;