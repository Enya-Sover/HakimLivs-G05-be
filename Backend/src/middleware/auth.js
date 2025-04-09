import jwt from 'jsonwebtoken';


export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    // implementera lite "misstagslogik"
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({ message: 'No token available' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unapproved token' });
  }

   next();
};

export const adminAuth = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Åtkomst nekad: Admins only' });
  }
};

