import { useLoaderData, redirect } from "react-router-dom";
import { useState } from "react";
import FormElement from "../Insert/FormElement";
import axios from "axios";

export default function Edit(){

    const blogToEdit = useLoaderData();
    const [blogData, setBlogData] = useState({
        title: blogToEdit.blog_title,
        content: blogToEdit.blog_content,
        author: blogToEdit.author_name
    });
    return (
        <div id="edit-data">
            <FormElement blogData={blogData} setBlogData={setBlogData} buttonText="Save Post"/>
        </div>
    );

}

export async function editData({ request, params }) {
    
    const formData = await request.formData();
    const actualData = Object.fromEntries(formData);
    try{
        const response = await axios.post('http://localhost:3000/edit-blog', {
            author: actualData["author"],
            title: actualData["title"],
            content: actualData["content"], 
            id: params.id
        });
        return response.status === 200 ? redirect("/") : "Failed to edit blog";
    } catch(error){
        return error;
    }
}