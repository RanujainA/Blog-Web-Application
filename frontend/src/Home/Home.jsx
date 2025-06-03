import { useLoaderData } from "react-router-dom";
import axios from "axios";
import BlogPost from "./BlogPost";


export default function Home(){
    const blogs = useLoaderData();
    return (
        <div id="show-data">
            {blogs.length > 0 ? blogs.map(blog => {
                return (
                    <BlogPost key={blog.id} id={blog.id} title={blog.blog_title} content={blog.blog_content} author={blog.author_name} />
                );
            }) : <h1 id="no-blogs">No Blog Posts Yet.</h1>}
        </div>
    );

}

export async function getAllBlogs(){
    try{
        const response = await axios.get('http://localhost:3000/get-all-blogs');
        return response.status === 200 ? response.data : "Failed to fetch blogs";
    } catch(error){
        return error;
    }
    
}