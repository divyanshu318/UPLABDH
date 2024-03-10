import mongoose from "mongoose";

const proffSchema = new mongoose.Schema(
    {
    name: {
      type: String,
      required: true,
      trim: true,
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
      default: 1,
    },
  },
  { timestamps: true }
)

export default mongoose.model('proff',proffSchema);