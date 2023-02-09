const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

const contactUs = asyncHandler(async (req, res) => {
    const { subject, message } = req.body;
    const user = await User.findById(req.user._id); //as we are searchig by id we can use findById otherwise we can use findOne

    if (!user) {
        res.status(400);
        throw new Error("User not found, please signup");
    }

    //   Validation
    if (!subject || !message) {
        res.status(400);
        throw new Error("Please add subject and message");
    }

    // nodemailer data to send email
    const send_to = process.env.EMAIL_USER; //chaudhuree@gmail.com 
    //this is the email id of the person who will receive the email(website owner)
    //this email id well be changed accordingly
    const sent_from = process.env.EMAIL_USER; //nodemailer email id this will not be changed
    const reply_to = user.email; //user email id, who has logged in.
    try {
        await sendEmail(subject, message, send_to, sent_from, reply_to);
        res.status(200).json({ success: true, message: "Email Sent" });
    } catch (error) {
        res.status(500);
        throw new Error("Email not sent, please try again");
    }
});

module.exports = {
    contactUs
};