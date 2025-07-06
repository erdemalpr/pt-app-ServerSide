const Auth = require('./auth.model');
const jwt  = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

exports.register = async ({ name, surname, email, password }) => {
  // 1) Aynı email var mı?
  const exists = await Auth.findOne({ email });
  if (exists) throw { status: 409, message: 'User already exists' };

  // 2) Şifreyi hash’le
  const hashed = await Auth.hashPassword(password);

  // 3) Kaydet ve minimal kullanıcı objesi döndür
  const user = await Auth.create({ name, surname, email, password: hashed });
  return { id: user._id, name: user.name, surname: user.surname, email: user.email };
};

exports.login = async ({ email, password }) => {
  // 1) Kullanıcı var mı?
  const user = await Auth.findOne({ email });
  if (!user) throw { status: 401, success:'false', message: 'Kullanıcı Bulunamadı' };

  // 2) Şifre kontrol
  if (!await Auth.comparePassword(password, user.password))
    throw { status: 401, success:'false', message: 'Pasaport hatalı' };

  // 3) Eğer DB’de token yoksa üret ve kaydet
  if (!user.token) {
    const payload = { sub: user._id, email: user.email };
    user.token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    await user.save();
  }

  // 4) Dön
  return {
    token: user.token,
  };
};

