const { Router } = require('express');
const {
  getAllUsers,
  getUser,
  follow,
  unfollow,
} = require('../controller/userController');
const {
  signup,
  login,
  logout,
  protect,
  updateUserPassword,
} = require('../controller/authController');
const {
  signup_page,
  login_page,
  user_dashboard,
  user_profile,
} = require('../controller/renderPage');

const router = Router();

router.route('/signup').get(signup_page).post(signup);
router.route('/').get(login_page).post(login);
router.get('/logout', protect, logout);

router.get('/dashboard', protect, user_dashboard);
router.route('/:id').get(protect, getUser);
router.route('/profile/:id').get(protect, user_profile);

router.patch('/follow/:id', protect, follow);
router.patch('/unfollow/:id', protect, unfollow);

router.get('/', protect, getAllUsers);
router.patch('/update-user', protect, updateUserPassword);

module.exports = router;
