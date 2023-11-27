const	express = require('express');
const	app = express();
const	cors = require('cors');
const	blogsRouter = require('./controllers/BlogsController');
const	usersRouter = require('./controllers/UsersController');
const	loginRouter = require('./controllers/loginController');
const	middleware = require('./utils/middleware');
const	db = require('./utils/dbConnect');

db.connectDB();
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app ;