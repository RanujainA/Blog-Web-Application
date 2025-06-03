import { Form } from "react-router-dom";

export default function FormElement(props){

    function handleChange(event){

        const { name, value } = event.target;
        console.log(name);
        props.setBlogData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });

    }

    return (
        <Form method="post">
            <input type="text" id="author" name="author" placeholder="Enter Author Name" onChange={handleChange} value={props.blogData.author} required />
            <input type="text" id="title" name="title" placeholder="Enter Blog Title" onChange={handleChange} value={props.blogData.title} required />
            <textarea rows="20" placeholder="Enter Blog Content" name="content" onChange={handleChange}>{props.blogData.content}</textarea>
            <button type="submit">{props.buttonText}</button>
        </Form>
    );
    
}