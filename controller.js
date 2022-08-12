import User from "./validation.js";

export const userSignup = async (req, res) => {
    try {

        const exists = await User.findOne({ userName: req.body.userName })
        if (exists) {
            return res.status(401).json({ message: 'This Username already exists, try a different one' })
        }


        const user = req.body;
        const newUser = new User(user);
        await newUser.save();

        res.status(200).json({ message: user })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}