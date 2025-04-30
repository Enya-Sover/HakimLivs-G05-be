import jwt from 'jsonwebtoken';


export const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    // implementera lite "misstagslogik"
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(404).json({ message: 'Sidan hittades inte lol' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unapproved token' });
  }

};

export const adminAuth = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(404).json({ error: 'Sidan hittades inte lel' });
  }
};

