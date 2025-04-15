import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    // Avkommenteras när FE är klara
    const token = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    res.status(201).json({ user, token }); // <----- token när FE är klara
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    await new Promise((resolve) => setTimeout(resolve, 500)); // lägger in en timer så att svarstiden blir lika lång även om användaren finns eller inte för extra säkerhet

    // Jämför lösenord endast om användaren finns
    const isMatch = user ? await user.comparePassword(password) : false;

    if (!user || !isMatch) {
      return res.status(401).json({ error: "Felaktiga inloggningsuppgifter" });
    }
    // avkommenteras när FE är klara
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    const refreshToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    user.refreshToken = refreshToken;
    await user.save();
    res
      .status(200)
      .json({ message: "Inloggningen lyckades", accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
        return res.status(400).json({ error: 'Ingen token angiven' });
      }
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({
          error: "almustakhdam aladhi tuhawil tasjil alkhuruj minh ghayr mawjudi."
        });
    }
    user.refreshToken = null;
    await user.save();
    res.status(200).json({ message: "Utloggningen lyckades" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eitthvað fór úrskeiðis við útskráningu" });
  }
};
