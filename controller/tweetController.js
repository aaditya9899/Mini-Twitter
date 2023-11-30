const path = require('path');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Tweets = require('../model/tweetModel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./Frontend/images/tweet-images'));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

const getAllTweets = catchAsync(async (req, res, next) => {
  const allTweets = await Tweets.find().sort({ createdAt: -1 });
  return res.status(200).json({
    status: 'Success',
    tweets: { allTweets },
  });
});

const getMyTweets = catchAsync(async (req, res, next) => {
  const myTweets = await Tweets.find({ createdBy: req.user.id });
  return res.status(200).json({
    status: 'Success',
    myTweets,
  });
});

const createTweet = catchAsync(async (req, res, next) => {
  upload.single('media')(req, res, async function (err) {
    if (err) {
      console.log(err);
      return res.redirect('/api/v1/tweet/create');
    }

    // Uploading of image completed successfully
    const newTweet = await Tweets.create({
      content: req.body.content,
      media: req.file ? req.file.filename : null,
      createdBy: req.user.id,
    });

    // Redirect only after the tweet is created
    return res.redirect(`/api/v1/tweet/${newTweet._id}`);
  });
});

const getTweet = catchAsync(async (req, res, next) => {
  const tweet = await Tweets.findById(req.params.id);
  return res.status(200).json({
    status: 'Success',
    tweet,
  });
});

const editTweet = catchAsync(async (req, res, next) => {
  const tweet = await Tweets.findById(req.params.id);
  const updatedTweetContent = req.body.content;
  tweet.content = updatedTweetContent;
  await tweet.save();
  return res.status(200).json({ status: 'Success', tweet });
});

const deleteTweet = catchAsync(async (req, res, next) => {
  const tweet = await Tweets.findById(req.params.id);
  if (!tweet) {
    return next(new AppError('No tweet found with this id', 404));
  }

  if (tweet.createdBy.username !== req.user.username) {
    return next(
      new AppError('You do not have permission to delete this tweet', 401)
    );
  }
  await tweet.deleteOne();
  return res.status(200).json({ status: 'Success' });
});

module.exports = {
  getAllTweets,
  createTweet,
  getTweet,
  getMyTweets,
  editTweet,
  deleteTweet,
};
