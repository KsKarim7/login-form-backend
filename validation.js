import { mongoose } from "mongoose";
import bcrypt from 'bcryptjs'
import UserOTPVerification from "./userOTPVerification.js";


// let transporter = nodemailer.createTransport({
//     host: "kskarim57@gmail.com",
//     auth: {
//         user: process.env.,
//         pass: process.env.
//     }
// })

const userValidation = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    verified: Boolean
});


userValidation.pre('save', function (next) {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})
const User = mongoose.model('user', userValidation)

const sendOTPVerificationEmail = async ({ _id, email }, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        // const mailFunction ={
        //     from:process.env.
        //     to:email
        // subject:"verify your email"
        // html: `<p>Enter ${otp} in the site  to verify your email address and complete the verification</p>
        // <p>This code expires in one hour</p>`
        // }

        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOTPVerification = await new UserOTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        })

        // saving otp
        await newOTPVerification.save();
        await transporter.sendMail();
        res.json({
            status: "PENDING",
            message: "Verification OTP email sent",
            data: {
                userId: _id,
                email
            }
        });
    }
    catch (error) {
        res.json({
            status: "FAILED",
            message: error.message
        })
    }
}

export default User;