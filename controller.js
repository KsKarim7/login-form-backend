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

export const userLogin = async (req, res) => {
    try {
        const userName = req.body.userName;
        const password = req.body.password;

        let user = await User.findOne({ userName: userName, password: password });
        if (user) {
            return res.status(200).json({ data: user })
        }
        else {
            return res.status(401).json('Invalid Login')
        }
    }
    catch (error) {
        res.status(500).json('Error', error.message)
    }
}