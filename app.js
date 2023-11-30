require('dotenv').config({ path: `./config.env` });
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { globalErrorHandler } = require('./controller/errorController');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const tweetRouter = require('./routes/tweetRoutes');
const catchAsync = require('./utils/catchAsync');
const Users = require('./model/userModel');
const Tweets = require('./model/tweetModel');
const { protect } = require('./controller/authController');
// const mongoSanitize = require('express-mongo-sanitize');

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./Frontend/views'));

app.use(express.static(path.resolve('./Frontend')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(mongoSanitize());
// app.use(xss());

app.use(morgan('dev'));
const DB_PASSWORD = process.env.DB_PASSWORD;


const DB_URL = `mongodb+srv://aaditya9899:${DB_PASSWORD}@cluster0.9jiuaot.mongodb.net/`;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('DATABASE CONNECTED');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/v1/user', userRouter);
app.use('/api/v1/tweet', tweetRouter);

app.get(
  '/api/v1/home',
  protect,
  catchAsync(async (req, res, next) => {
    const users = await Users.find({});
    // console.log(req.user.following);
    const tweets = await Tweets.find({
      $or: [
        { createdBy: { $in: req.user.following } },
        { createdBy: req.user.id },
      ],
    });
    return res.render('home', {
      users,
      tweets,
      currentUser: req.user,
    });
  })
);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log('App running on port:', PORT);
});
