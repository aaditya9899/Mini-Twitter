const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Cannot make an empty tweet'],
      // maxLength: [280, "Can't use more than 280 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    media: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [String],
    Retweets: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

tweetSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'createdBy',
    select: 'username profileImageUrl _id',
  });
  this.select('-__v');
  this.sort({ createdAt: -1 });
  next();
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
