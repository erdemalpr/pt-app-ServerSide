// middlewares/verify-token.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token bulunamadı veya format hatalı' });
  }

  const token = authHeader.split(' ')[1];
  if (!JWT_SECRET) {
    console.error('⚠️ JWT_SECRET tanımsız!');
    return res.status(500).json({ message: 'Sunucu yapılandırma hatası' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;    // payload içinden örn. sub/id, role vs. al
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token' });
  }
}

module.exports = authMiddleware;

