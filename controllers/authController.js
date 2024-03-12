import { comparePassword, hashPassword, sendOtpVerificationMail } from '../helpers/authHelper.js';
import otpVerificationModel from '../models/otpVerificationModel.js';
import profModel from '../models/profModel.js';
import studentModel from '../models/studentModel.js';
import JWT from 'jsonwebtoken';

export const StudentSignupController = async (req, res) => {
  try {
    const { name, registration_number, email, password, phone, branch } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Name is Required" });
    }
    if (!registration_number) {
      return res.status(400).send({ message: "Registration Number is Required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is Required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone number is Required" });
    }
    if (!branch) {
      return res.status(400).send({ message: "Branch is Required" });
    }

    const existingUser = await studentModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already registered. Please login.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new studentModel({
      name,
      registration_number,
      email,
      password: hashedPassword,
      phone,
      branch,
    })
    await user.save();
    await sendOtpVerificationMail(user, res);

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

export const OtpVerificationController = async (req, res) => {
  try {
    const { email, newotp } = req.body;

    if (!email || !newotp) {
      return res.status(400).send({
        success: false,
        message: "Email and OTP are required for verification",
      });
    }

    const record = await otpVerificationModel.findOne({ email });

    if (!record) {
      return res.status(404).send({
        success: false,
        message: "Token not found",
      });
    }
    const hashedOtp = await hashPassword(newotp);
    const { expiresAt, otp } = record;

    console.log(hashedOtp);
    console.log(otp);

    if (expiresAt < Date.now()) {
      await otpVerificationModel.deleteOne({ email });
      await studentModel.deleteOne({ email });
      await profModel.deleteOne({ email });

      return res.status(400).send({
        success: false,
        message: "Token has expired. Please register again.",
      });
    }

    const validOtp = await comparePassword(newotp, otp);
    console.log(validOtp);
    if (!validOtp) {
      await otpVerificationModel.deleteOne({ email });
      await studentModel.deleteOne({ email });
      await profModel.deleteOne({ email });
        return res.status(400).send({
            success: false,
            message: "OTP does not match",
        });
    }

    return res.status(200).send({
      success: true,
      message: "Verification successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error occurred in OTP verification controller",
    });
  }
};

export const ProfSignupController = async (req, res) => {
  try {
    const { name, email, password, phone, branch } = req.body;

    if (!name) {
      return res.status(400).send({ message: "Name is Required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is Required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone number is Required" });
    }
    if (!branch) {
      return res.status(400).send({ message: "Branch is Required" });
    }

    const existingUser = await profModel.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Professor already registered. Please login.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new profModel({
      name,
      email,
      password: hashedPassword,
      phone,
      branch,
    }).save().then((result) => {
      sendOtpVerificationMail(result, res);
    }).catch((err) => {
      console.log(err);
      res.json({
        status: "FAILED",
        message: "An error occurred while saving professor account!",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Professor Registration",
      error,
    });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    let user = await studentModel.findOne({ email });
    if(!user){
      user = await profModel.findOne({email});
    }

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        branch: user.branch,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
