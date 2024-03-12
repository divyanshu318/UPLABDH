import mongoose from "mongoose";

const otpVerificationSchema = new mongoose.Schema(
    {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt:{
        type: Date,
    },
    expiresAt:{
        type: Date,
    }
    }
)

export default mongoose.model('otpVerification',otpVerificationSchema);