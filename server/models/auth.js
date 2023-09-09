import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    points:{type:Number,default:0},
    badge:{type:[String],enum:['Silver','Gold','Cool','Honor','Bronze']},
    about:{type:String},
    tags:{type:[String]},
    answered:{type:Number,default:0},
    joinedOn:{type:Date,default:Date.now},
    subscription_type:{type:String,enum:['free','silver','gold'],default:'free',reuired:true},
    subscribed_on:{type:Date,default:Date.now},
    questions_asked:{type:Number,default:0},
    last_asked_on:{type:Date}
})

export default mongoose.model("User",userSchema)