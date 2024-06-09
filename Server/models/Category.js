const Mongo=require("mongoose");

const CategroySchema=new Mongo.Schema(
    {  
   name:{
    type:String,
    required:true,
   },
},
{timestamps:true}
);
module.exports=Mongo.model("Categroy",CategroySchema);