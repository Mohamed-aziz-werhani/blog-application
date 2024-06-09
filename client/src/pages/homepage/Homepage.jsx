import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


export default function Homepage() {
  const {search} = useLocation();
  console.log(search); 
  const [posts,setPosts]=useState([]); 
 
 
  useEffect(()=>{
    const fetchApi=async ()=>{
      const res=await axios.get("/post"+search);
      setPosts(res.data)
   
    }
   fetchApi()
  },[])
  return (
    <>
      <Header />
      <div className="home">
        <Posts Data={posts}/>
        <Sidebar />
      </div>
    </>
  );
}
