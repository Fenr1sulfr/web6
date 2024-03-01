const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const cookie = require('cookie');

// Функция для получения значения cookie по имени



// Теперь у вас есть токен, который вы можете использовать при необходимости

module.exports = function (req, res, next) {
  
// Получаем токен из cookie

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
      const token = cookies.jwt_token;
    if (!token) {
      return res.redirect('/auth'); // Redirect to /auth if token is not present;
    }
    
    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (err) {
    console.log(err);
    return res.redirect('/auth');;
  }
};
