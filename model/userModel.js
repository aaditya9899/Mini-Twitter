const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please set a username'],
    unique: [true, 'Username already taken'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: Date,
  followers: Array,
  following: Array,
  profileImageUrl: {
    type: String,
    default: '/images/profile-images/download.png',
  },
  coverImageUrl: {
    type: String,
    default: '/images/cover-images/cover-1.jpeg',
  },
});

userSchema.pre(/^find/, function (next) {
  this.sort({ createdAt: -1 });
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedPasswordTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedPasswordTimestamp > JWTTimestamp;
  }

  return false;
};
const User = model('User', userSchema);

module.exports = User;
