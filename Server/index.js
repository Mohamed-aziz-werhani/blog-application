const Express =require("express");
const Mongo=require("mongoose");
const cors=require("cors");
const app=Express();
const dotenv=require("dotenv");
const multer=require("multer");
const User=require("./models/Users");
const path=require("path")


const authrouter=require("./routes/auth");
const usersrouter=require("./routes/users");
const postrouter=require("./routes/post");
const categoryrouter=require("./routes/category");
app.use(Express.json());
app.use(cors());
dotenv.config();
app.use("/images/",Express.static(path.join(__dirname,"/images/")))

Mongo.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
})
.then(console.log("object"))
.catch((err)=>console.log("il y a un errur de type"+err));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const uplode=multer({storage});
app.post("/routes/uplode",uplode.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded in images")
})

app.use("/routes/auth",authrouter)
app.use("/routes/users",usersrouter)
app.use("/routes/post",postrouter)
app.use("/routes/category",categoryrouter)






app.listen("8080",()=>{
    console.log("backend is runnig");
})
