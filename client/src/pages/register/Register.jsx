import { useState } from "react"
import "./register.css"
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [email,setemail]=useState("");
  const [erreur,setErreur]=useState(false);
   const handelSubmit=async (e)=>{
    e.preventDefault();
    setErreur(false)
    try{
      const res=await axios.post("/auth/register",{
        username,
        password,
        email
       })
      console.log(res.data)
      res.data && window.location.replace('/login')
    }catch(err){
      setErreur(true)
    }
     
   }
  
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handelSubmit}>
        <label>Username :</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={e=>setUsername(e.target.value)}/>
        <label>Email :</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." onChange={e=>setemail(e.target.value)}/>
        <label>Password :</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." onChange={e=>setPassword(e.target.value)}/>
        <button className="registerButton">Register</button>
      </form>
      <Link to="/login">
      <button className="registerLoginButton">Login</button></Link>
        {erreur &&<span style={{color:"red" ,marginTop:"10px"}}>something went wrong !</span>}
    </div>
    )
}
