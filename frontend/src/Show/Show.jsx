import axios from "axios";
import { useLoaderData } from "react-router-dom";

export default function Show(){

    const blogToShow = useLoaderData();
    console.log(blogToShow);
    return (
        <div id="show-blogcontent">
            <h1>Title: {blogToShow.blog_title}</h1>
            <h2>Author: {blogToShow.author_name}</h2>
            <p>{blogToShow.blog_content}</p>
        </div>
    );

}

export async function getBlog({ params }){
    try{
        const response = await axios.get(`http://localhost:3000/get-single-blog/${params.id}`);
        return response.status === 200 ? response.data[0] : "Failed to fetch blog";
    } catch(error){
        return error;
    }
    
}