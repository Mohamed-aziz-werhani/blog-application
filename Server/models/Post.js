const Mongo=require("mongoose");

const PostSchema=new Mongo.Schema(
    {  
   title:{
    type:String,
    required:true,
    unique:true
   },
   desc:{
    type:String,
    required:true,
   },
   photo:{
    type:String,
    required:true,
   },
   username:{
    type:String,
    required:true,
   },
   categories:{
    type:Array,
    
    required:false,
   },
},
{timestamps:true}
);
module.exports=Mongo.model("Post",PostSchema);