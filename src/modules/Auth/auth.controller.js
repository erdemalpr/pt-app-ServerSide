const authService = require('./auth.service');

exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json({ message: 'Registered', user: result });
  } catch (err) {
    console.error(err);
    return res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    return res.json({ success: 'true', ...result });
  } catch (err) {
    console.error(err);
    return res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal Server Error' });
  }
};
