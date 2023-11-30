const catchAsync = require('../utils/catchAsync');
const Users = require('../model/userModel');
const AppError = require('../utils/AppError');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await Users.find();

  return res.status(200).json({
    status: 'Success',
    results: users.length,
    data: {
      users,
    },
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.params.id);
  console.log(user);
  return res.redirect(`/api/v1/user/profile/${user.id}`);
});

const follow = catchAsync(async (req, res, next) => {
  const userToBeFollowed = await Users.findById(req.params.id);

  const currentUser = await Users.findById(req.user.id);

  if (!userToBeFollowed)
    return next(new AppError('No user with this id found', 404));

  if (req.params.id === req.user.id) {
    return next(new AppError('You cannot follow yourself', 400));
  }

  if (!currentUser.following.includes(userToBeFollowed.id)) {
    await currentUser.updateOne({
      $push: { following: req.params.id },
    });

    await userToBeFollowed.updateOne({
      $push: {
        followers: req.user.id,
      },
    });
  } else {
    return res.status(403).json({ msg: 'You already follow this user' });
  }
  return res.status(200).json({
    status: 'Success',
    msg: 'Following user',
  });
});

const unfollow = catchAsync(async (req, res, next) => {
  const userToBeUnfollowed = await Users.findById(req.params.id);

  const currentUser = await Users.findById(req.user.id);

  if (!userToBeUnfollowed) {
    return next(new AppError('No user with this ID found', 404));
  }

  if (req.params.id === req.user.id) {
    return next(new AppError('You cannot unfollow yourself', 400));
  }

  if (currentUser.followers.includes(req.params.id)) {
    return res.status(400).json({
      msg: 'You do not follow this user',
    });
  }

  await currentUser.updateOne({
    $pull: {
      following: req.params.id,
    },
  });

  await userToBeUnfollowed.updateOne({
    $pull: {
      followers: req.user.id,
    },
  });
  return res.status(200).json({
    msg: 'User unfollowed',
  });
});

module.exports = { getAllUsers, getUser, follow, unfollow };
