import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomid: {
        type: String,
        required: true,
    },
    floor: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    },
    booked: {
        type: Boolean,
        required: true,
    },
});

export default mongoose.model('rooms', roomSchema);
