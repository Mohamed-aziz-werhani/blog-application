const Mongo=require("mongoose");

const UserSchema=new Mongo.Schema(
    {
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:"",
    },
},{timestamps:true}
);
module.exports=Mongo.model("User",UserSchema);