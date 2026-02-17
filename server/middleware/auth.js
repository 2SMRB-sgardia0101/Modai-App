const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'modai-dev-secret-change-me';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Authentication required' });
  }

  const token = authHeader.slice(7).trim();

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.auth = {
      userId: payload.userId
    };
    return next();
  } catch {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = {
  authMiddleware,
  JWT_SECRET
};
