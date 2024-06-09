import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import {Context1} from "../../context/Context"
import axios from "axios";
export default function Settings() {

const {user}=useContext(Context1);
const [file,setFile]=useState(null);
const [username,setusername]=useState("");
const [password,setpassword]=useState("");
const [email,setemail]=useState("");

const PF="http://localhost:8080/images/";
const handleSubmit=async (e)=>{
  e.preventDefault();
  const Upadatepost={
    userId:user._id,
   username,
    password,
    email,
    
  };
  if(file){
    const data=new FormData();
   const filename=Date.now()+file.name;
   data.append("name",filename)
   data.append("file",file)
   Upadatepost.profilePic=filename
   try{
    await axios.post("/uplode",data)
   }catch(err){}
  }
  try{
  await axios.put("/users/"+user._id,Upadatepost);
  }
  catch(err){}
  }
  
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file? URL.createObjectURL(file) :PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={e=>setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} name="name"  onChange={e=>setusername(e.target.value)}/>
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" onChange={e=>setemail(e.target.value)}/>
          <label>Password</label>
          <input type="password"  name="password" onChange={e=>setpassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
