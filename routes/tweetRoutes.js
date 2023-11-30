const { Router } = require('express');
const { protect } = require('../controller/authController');
const {
  getAllTweets,
  createTweet,
  getTweet,
  getMyTweets,
  editTweet,
  deleteTweet,
} = require('../controller/tweetController');
const {
  create_tweet,
  get_tweet,
  edit_tweet,
} = require('../controller/renderPage');

const router = Router();

router.get('/my-tweets', protect, getMyTweets);

router.get('/', getAllTweets);

router.route('/create').get(protect, create_tweet).post(protect, createTweet);

router.route('/:id/edit').get(protect, edit_tweet);

router
  .route('/:id')
  .get(protect, get_tweet)
  .patch(protect, editTweet)
  .delete(protect, deleteTweet);

module.exports = router;
