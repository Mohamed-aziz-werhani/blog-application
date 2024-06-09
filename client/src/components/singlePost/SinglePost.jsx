import { Link } from "react-router-dom";
import "./singlePost.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context1 } from "../../context/Context";

export default function SinglePost() {
  const PF="http://localhost:8080/images/";
  const loction =useLocation();
  const schema=loction.pathname.split("/")[2];
  console.log(schema);
  const [data1,setdata1]=useState([]);
  const [UpdateMode,setUpadateMode]=useState(false);
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  useEffect(()=>{
    const getPost=  async ()=>{
    const res=await axios.get("/post/"+schema);
    setdata1(res.data);
    setDesc(res.data.desc)
    setTitle(res.data.title)
    }
    getPost();
    console.log(data1)
  },[schema])
  const {user}=useContext(Context1);
  const handleDelete=async ()=>{
    try{await axios.delete("/post/"+data1._id,{data:{
      username:user.username
    }})
    window.location.replace("/");}catch(err){}
  }

  const handleUpdate=async ()=>{
    try{ await axios.put("/post/"+data1._id,{
      username:user.username,
      title,
      desc
    })
    window.location.reload();}catch(err){}
   
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {/*
      
         <img
          className="singlePostImg"
          src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        )
        */}
       {  data1.photo && 
          <img
          className="singlePostImg"
          src={PF+data1.photo}
          alt=""
        />}{
          UpdateMode ? <input type="text" value={title} className="singlePostTitleinput" onChange={(e)=>{setTitle(e.target.value)}} autoFocus/>:(
            <h1 className="singlePostTitle">
            {data1.title}
            {user.username===data1.username&&(
            <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={()=>{setUpadateMode(true)}}></i>
             <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
            </div>)}
            
          </h1>
          )
        }
       
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
             
              <Link className="link" to={`/?username=${data1.username}`}>
             {data1.username}
              </Link>
               
              
            </b>
          </span>
          <span>{new Date(data1.createdAt).toDateString()}</span>
        </div>
        {UpdateMode ? <textarea className="singlePostDescinput" onChange={(e)=>{setDesc(e.target.value)}}/> : <p className="singlePostDesc">
          {data1.desc}
        </p>}
        {UpdateMode&&<button className="singlepostbutton" onClick={handleUpdate}>Update</button>}
       
      </div>
    </div>
  );
}
