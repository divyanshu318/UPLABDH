import roomModel from "../models/roomModel.js";

export const getRoomController = async(req,res)=>{
    const rooms = await roomModel.find({});
    return res.status(200).send({
        success:true,
        message:"rooms details fetched",
        rooms
    })
}