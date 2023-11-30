const catchAsync = require('../utils/catchAsync');
const Tweets = require('../model/tweetModel');
const Users = require('../model/userModel');

const signup_page = catchAsync(async (req, res, next) => {
  return res.render('signup');
});

const login_page = catchAsync(async (req, res, next) => {
  const host = req.get('host');
  return res.render('login', { host });
});

// For the logged in User
const user_dashboard = catchAsync(async (req, res, next) => {
  const tweets = await Tweets.find({ createdBy: req.user.id });

  return res.render('dashboard', {
    user: req.user,
    tweets: tweets,
  });
});

// Profile of some other person on the twitter community
const user_profile = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  const tweets = await Tweets.find({ createdBy: req.params.id });

  return res.render('user_profile', {
    user,
    tweets: tweets,
  });
});

const create_tweet = catchAsync(async (req, res, next) => {
  return res.render('create_tweet', { user: req.user });
});

const get_tweet = catchAsync(async (req, res, next) => {
  const tweet = await Tweets.findById(req.params.id);
  return res.render('get_tweet', {
    user: req.user,
    tweet,
  });
});

const edit_tweet = catchAsync(async (req, res, next) => {
  const tweet = await Tweets.findById(req.params.id);
  return res.render('edit_tweet', {
    user: req.user,
    tweet,
  });
});

module.exports = {
  signup_page,
  login_page,
  user_dashboard,
  user_profile,
  create_tweet,
  get_tweet,
  edit_tweet,
};
