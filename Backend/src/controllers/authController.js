
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const getAdminUser = async (req, res) => {
    try {
        const adminUser = await User.find({isAdmin: true})
        
        if(!adminUser) {
            return res.status(404).json({error: "No admin user found"})
        }
        res.status(200).json(adminUser)
    } catch(error) {
        res.status(500).json({error: "Server error", details:error.message})
    }

}

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
        
        await new Promise(resolve => setTimeout(resolve, 500)); // lägger in en timer så att svarstiden blir lika lång även om användaren finns eller inte


        // Jämför lösenord endast om användaren finns
        const isMatch = user ? await user.comparePassword(password) : false;

        if (!user || !isMatch) {
            return res.status(401).json({ error: 'Felaktiga inloggningsuppgifter' });
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
