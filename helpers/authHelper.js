import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';
import otpVerificationModel from "../models/otpVerificationModel.js";
import dotenv from 'dotenv'

dotenv.config();

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

let transporter = await nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525, 
  secure: false, 
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.AUTH_PASS,
  },
});



export const sendOtpVerificationMail = async ({ email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const hashedOtp = await hashPassword(otp); 

    const mailOptions = {
      from: process.env.AUTH_MAIL,
      to: email,
      subject: "Verify your Email",
      html: `<p>Your One Time Password to login on UPLABDH is <b>${otp}<b></p><p>This Code expires in 1 hour</p>`,
    };

    const newOtpVerification = new otpVerificationModel({
      email: email,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    await newOtpVerification.save();
    await transporter.sendMail(mailOptions);
    
    res.json({
      success:true,
      status: "PENDING",
      message: "otp is sent",
      data: {
        email,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};
