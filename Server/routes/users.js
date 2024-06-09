const Express= require("express");
const router=Express();
const Bcrypte=require("bcrypt");
const User=require("../models/Users");
 const Post =require("../models/Post")

 //Update
router.put("/:id", async(req,res)=>{
if(req.body.userId===req.params.id){
if(req.body.password){
    const salt =await Bcrypte.genSalt(10);
    req.body.password=await Bcrypte.hash(req.body.password,salt);
     try{
        const updateUser= await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new :true})
        res.status(200).json(updateUser);
      
     }catch(err){
        res.status(500).json(err)
     }
}
}else{
res.status(401).json({message:"vous pouvez faire un mise jour de donnes juste pour votre compte"})
}
})

//Delete
router.delete("/:id", async(req,res)=>{
   if(req.body.userId===req.params.id){
 try{
   const user=await User.findById(req.params.id);
   try{
      await Post.deleteMany({username:user.username})
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("l'utilisateur est effacé");
    
   }catch(err){
      res.status(500).json(err)
   }
    }catch(err){
      res.status(404).json({message:"il n y'a pas un utilisateur avec cet id"});
  
}   
   }else{
      res.status(401).json({message:"vous pouvez juste effecer juste leur compte"});
   }
  
   })

//Get 
router.get("/:id",async (req,res)=>{
  try{
   const user=await User.findById(req.params.id);
  const {password,...autre}=user._doc;
  res.status(200).json(autre)
  }catch(err){
   res.status(500).json(err)
  }

 })








module.exports=router;