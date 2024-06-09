import {Route,BrowserRouter as Router,Switch} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Header from "./components/header/Header";
import Topbar from "./components/topbar/Topbar";
import Write from "./pages/write/Write";
import Posts from "./components/posts/Posts";
import Sidebar from "./components/sidebar/Sidebar";
import Single from "./pages/single/Single";
import Post from "./components/post/Post";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
function App1(){
    return(<>
   <Router>
   <Topbar></Topbar>
   <div>
    <Switch>
        <Route path="/login" ><Login/></Route>   
        <Route path="/register" ><Register></Register></Route> 
        <Route path="/settings" ><Settings/></Route>  
        <Route path="/write"><Write></Write></Route>
    <Route path="/posts/:id"><Single></Single></Route>
        <Route path="/Homepage"><Homepage></Homepage></Route>
      
        </Switch>
        </div>
    </Router>  
    </>);
}
export default App1;