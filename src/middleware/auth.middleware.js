const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token missing or malformed' });
    }

    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Session expired. Please login again.' });
  }
};

module.exports = { verifyToken };