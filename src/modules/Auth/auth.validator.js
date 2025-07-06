const { body, validationResult } = require('express-validator');

exports.registerRules = [
  body('name')
    .notEmpty().withMessage('Name is required'),
  body('surname')
    .notEmpty().withMessage('Surname is required'),
  body('email')
    .isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

exports.loginRules = [
  body('email')
    .isEmail().withMessage('Valid email is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Validation sonuçlarını kontrol eder
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
