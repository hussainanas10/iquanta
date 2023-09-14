import jwt from 'jsonwebtoken'


export default function isAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  if (!token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const tokenWithoutBearer = token.slice(7);

  try {
    const decodedToken = jwt.verify(tokenWithoutBearer, 'my_app_key');
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Token is invalid' });
  }
}

