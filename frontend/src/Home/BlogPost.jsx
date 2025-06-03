import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function BlogPost(props) {
    
    async function handleClick(){
        const navigate = useNavigate();
        try{
            const response = await axios.get(`http://localhost:3000/delete-blog/${props.id}`);
            return response.status === 200 ? navigate("/") : "Failed to delete blog";
        }catch(error){
            return error;
        }
        
    }

    return (
        <div id="blog-post">
            <h1>Title: {props.title}</h1>
            <h2>Author: {props.author}</h2>
            <br />
            <Link to={`/show/${props.id}`}>Show</Link>
            <Link to={`/edit/${props.id}`}>Edit</Link>
            <Link onClick={handleClick}>Delete</Link>
        </div>
    )
    
}