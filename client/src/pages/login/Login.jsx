import { useContext,useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context1 } from "../../context/Context";
import axios from "axios";
export default function Login() {
  const {dispatch,isfetching}=useContext(Context1)
  const userRef=useRef();
  const passwordRef=useRef();
  const handelSubmit=async (e)=>{
 e.preventDefault()
 dispatch({type:"LOGIN_START"});
 
 try{
const res= await axios.post("/auth/login",{
    username:userRef.current.value,
    password:passwordRef.current.value
 })
 dispatch({type:"LOGIN_SUCCESS",payload:res.data})
 }catch(err){
  dispatch({type:"LOGIN_FAILUER"})
 }
 
  }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handelSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your username..." ref={userRef}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." ref={passwordRef}/>
        <button className="loginButton" type="submit" disabled={isfetching}>Login</button>
      </form>
      <Link to="/register"><button className="loginRegisterButton" type="submit">Register</button></Link>
        
    </div>
  );
}
