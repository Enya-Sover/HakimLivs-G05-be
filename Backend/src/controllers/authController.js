
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        // Avkommenteras när FE är klara
        // const token = jwt.sign(
        //     { id: user._id, isAdmin: user.isAdmin },
        //     process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        // );

        res.status(201).json({ user }); // <----- token när FE är klara
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const login = async (req, res) => {

    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({ error: 'Fel användarnamn eller lösenord' })
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ error: 'Fel användarnamn eller lösenord' })
        }
        // avkommenteras när FE är klara
        // const accessToken = jwt.sign(
        //     { id: user._id, isAdmin: user.isAdmin },
        //     process.env.ACCESS_TOKEN_SECRET,
        //     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        // );
        // const refreshToken = jwt.sign(
        //     { id: user._id, isAdmin: user.isAdmin },
        //     process.env.REFRESH_TOKEN_SECRET,
        //     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        // );
        res.status(200).json({ message: 'Inloggningen lyckades',}) // <------ accessToken, refreshToken läggs till när FE är klara
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}