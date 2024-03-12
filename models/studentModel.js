import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    registration_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.model('student',studentSchema);