const Express= require("express");
const router=Express();
const User=require("../models/Users");
const Post =require("../models/Post");

//CREATE POST
router.post("/",async (req,res)=>{
    try{
       const newPost= new Post(req.body);
       const savedPost=await newPost.save();
       res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE POST
router.put("/:id",async (req,res)=>{
    try{
        const post1= await Post.findById(req.params.id)

        if(req.body.username===post1.username){
         try{
        const UpdatePost=await Post.findByIdAndUpdate(req.params.id,
            {$set:req.body},
            {new:true})
        res.status(200).json(UpdatePost)
         }catch(err){
         res.status(401).json(err)
         }
        }else{
            res.status(401).json({message:"vous pouvez modifier  juste l'information de votre compte "})
        } 
    }catch(err){
        res.status(500).json(err)
    }

})
//Delete Post
router.delete("/:id",async (req,res)=>{
    try{
        const post12=await Post.findById(req.params.id);
        if(post12.username===req.body.username){
            try{
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json("l'utilisateur avec cet id est supprimé");

            }catch(err){
                res.status(500).json(err)
            }
     }else{
         res.status(401).json("vous pouvez supprimer juste votre post");
     }
    }catch(err){
        res.status(500).json(err)
    }

})
//Get POST
router.get("/:id",async (req,res)=>{
    try{
     const post1=await Post.findById(req.params.id);
    res.status(200).json(post1)
    }catch(err){
     res.status(500).json(err)
    }
  
   })

   //GetAll Posts
   router.get("/",async (req,res)=>{
       const username=req.query.username
       const catName=req.query.categories
       try{
        let posts;
        if(username){
      posts=await Post.find({username});
        }else if(catName){
         posts=await Post.find({
             categories:{
                 $in:[catName],
             },
         })
        }else{
     posts=await Post.find();
        }
        res.status(200).json(posts);
       }catch(err){
        res.status(500).json(err);
       }
       
   })





 module.exports=router;
