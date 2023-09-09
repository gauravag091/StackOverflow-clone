import mongoose from "mongoose";
import user from '../models/auth.js'
export const getAllUsers = async (req, res) => {
try {
    const allUsers = await user.find()
    const allUserDetails = []
    allUsers.forEach(users => {
        allUserDetails.push({_id: users._id, name:users.name, about:users.about, tags:users.tags, joinedOn: users.joinedOn, points: users.points, badge: users.badge})
    });
    res.status(200).json(allUserDetails)
} catch (error) {
    res.status(404).json({message:error.message})
}
}
export const updateProfile = async(req,res) => {
    const {id: _id} = req.params;
    const {name, about, tags} = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Question unavailable...");
    }

    try {
        const updatedProfile = await user.findByIdAndUpdate(_id,{$set:{'name':name, 'about':about, 'tags':tags}},{new: true});
       return res.status(200).json(updatedProfile)
    } catch (error) {
        res.status(405).json({message:error.message})
    }
}
export const subscribe = async(req,res) => {
    const {id: _id,plan} = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question unavailable...");
      }
    try {
        const updatedProfile = await user.findByIdAndUpdate(_id,{$set:{subscription_type:plan,subscribed_on:Date.now()}},{new:true})
        res.status(200).json({result:updatedProfile});
    }catch(error) {
       return res.status(405).json({message:error.message});
    }
}