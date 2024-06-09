const Express= require("express");
const router1=Express();
const Bcrypte=require("bcrypt");
const User=require("../models/Users");

//register
router1.post("/register",async (req,res)=>{
 try{
    const salt=await Bcrypte.genSalt(10);
    const hashPasswoard=await Bcrypte.hash(req.body.password,salt);
const newUser=new User(
    {username:req.body.username,
    password:hashPasswoard,
    email:req.body.email,
    }
);
 const user=await newUser.save(); 
console.log("le user est enregistre:",user);
res.json(user);

 }catch(err){
return res.status(500).json(err);
}

})


//login
router1.post("/login",async (req,res)=>{
    try{
        const userFeild=await User.findOne({username:req.body.username});
        !userFeild && res.status(400).json({message:"il n y'a pas un utilisateur avec ce nom"});
        
        const verif_Password=await Bcrypte.compare(req.body.password,userFeild.password);

        !verif_Password && res.status(400).json({message:"password or username incorrect"});
        
        const {password,...autre}=userFeild._doc;/**/
        res.status(200).json(autre);

    }catch(err){
        res.status(500).json(err)
    }



})
module.exports=router1;