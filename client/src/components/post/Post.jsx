import { Link } from "react-router-dom";
import "./post.css";

export default function Post(props) {
  const PF="http://localhost:8080/images/";

  return (
    <div className="post">
      { props.Post.photo && (
      <img
        className="postImg"
        src={PF + props.Post.photo}
        alt=""
      />)
      }
     
        
      
      
      <div className="postInfo">
        <div className="postCats">
          
            {/*<Link className="link" to="/posts?cat=Music">
            </Link> */}
              {props.Post.categories.map((c)=>(
                <span className="postCat">{c}</span>
              ))}
               
            {/*<Link className="link" to="/posts?cat=Music">
            </Link>
            <span className="postCat">
                         Life
            
          </span>
 */} 
        </div>
        <span className="postTitle">
          {/* */}
          <Link to={`/post/${props.Post._id}`} className="link">
          {props.Post.title
          }
          </Link>
          
          
        </span>
        <hr />
        <span className="postDate">{new Date(props.Post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {props.Post.desc}
      </p>
    </div>
  );
}
