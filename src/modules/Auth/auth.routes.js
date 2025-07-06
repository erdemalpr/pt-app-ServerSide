const express        = require('express');
const router         = express.Router();
const authController = require('./auth.controller');
const { registerRules, loginRules, validate } = require('./auth.validator');

// /api/auth/register
router.post(
  '/register',
  registerRules,
  validate,
  authController.register
);

// /api/auth/login
router.post(
  '/login',
  loginRules,
  validate,
  authController.login
);

module.exports = router;
