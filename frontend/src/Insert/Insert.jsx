import { redirect } from "react-router-dom";
import axios from "axios";
import FormElement from "./FormElement";
import { useState } from "react";

export default function Insert(){

    const [blogData, setBlogData] = useState({
        title: "",
        content: "",
        author: ""
    });

    return (
        <div id="insert-data">
            <FormElement blogData={blogData} setBlogData={setBlogData} buttonText="Add Post"/>
        </div>
    );

}

export async function sendData({ request }) {
    const formData = await request.formData();
    const actualData = Object.fromEntries(formData);

    try{
        const response = await axios.post('http://localhost:3000/insert-blog', {
            author: actualData["author"],
            title: actualData["title"],
            content: actualData["content"]
        });
        return response.status === 200 ? redirect("/") : "Failed to insert blog";
    } catch (error) {
        return error;
    }

    
}