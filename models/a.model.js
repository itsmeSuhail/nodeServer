import mongoose from "mongoose";
const exSchema=mongoose.Schema({
    user:{
        type:String,
        required:true
    }
})
export const exModel= mongoose.model("ex",exSchema);