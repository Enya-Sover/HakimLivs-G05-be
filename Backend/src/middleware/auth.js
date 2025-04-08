import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  // implementera lite "misstagslogik"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Ingen token tillhandahållen' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unapproved token' });
  }

   next(); // Kika på varför det är return
};

export const adminAuth = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Åtkomst nekad. Endast admins tillåtna.' });
  }
   next();
};
