const Express=require("express");
const router2=Express();
const Category=require("../models/Category");

router2.post("/",async (req,res)=>{
     const newCategory=new Category(req.body);
   
     try{
        const savedCategory=await newCategory.save();
   res.status(200).json(savedCategory)
   
     }catch(err){
    res.status(500).json(err)
     }
})
//get
 router2.get("/",async (req,res)=>{
    const cats=await Category.find();
    const tab=[]
    try{
        cats.map((ligne)=>{
            const {name,...autre}=ligne._doc
            tab.push(name)
        })
        res.status(200).json(tab)
       
    }catch(err){
        res.status(500).json(err)
    }
 })

module.exports=router2;