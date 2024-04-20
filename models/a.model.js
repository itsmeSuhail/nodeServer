import mongoose from "mongoose";
import {decrypt, encrypt} from "../utils/passwordManager/index.js"
import {CreatToken} from "../utils/TokenManager/index.js"
const exSchema=new mongoose.Schema({
    

},{timestamp:true})
exSchema.pre("save",async function (next){
    if(this.isModified("password")){
        return next();
    }
    const encr=await encrypt(this.password);
    console.log(encr,"_-------------")
   this.password=encr 
});
exSchema.methods.isValidPaassword=async function(userPassword){
    return await decrypt(userPassword,this.password);
};
exSchema.methods.generateToken=function(){
    const obj={
        id:this._id,
        username:this.name
    };
    return CreatToken(obj);
};

export const userModel= mongoose.model("ex",exSchema);