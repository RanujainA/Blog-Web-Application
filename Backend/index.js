import express from "express";
import pg from "pg";
import cors from "cors";
import env from "dotenv";

env.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const db = new pg.Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DATABASE_PORT
});

db.connect();

app.get('/get-all-blogs', async (req, res) =>{
    try{
        const response = await db.query("SELECT * FROM blogs");
        res.status(200).json(response.rows);
    } catch(error) {
        res.status(500).json(error);
    }
});

app.get('/get-single-blog/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const response = await db.query(`SELECT * FROM blogs WHERE id=${id}`);
        res.status(200).json(response.rows);
    } catch(error) {
        res.status(500).json(error);
    }
});

app.post('/insert-blog', async (req, res) => {
    const author_name = req.body["author"];
    const blog_title = req.body["title"];
    const blog_content = req.body["content"];
    try{
        await db.query("INSERT INTO blogs ( blog_title, blog_content, author_name) VALUES ($1, $2, $3)", [blog_title, blog_content, author_name]);
        res.status(200).json({ message: "Blog Inserted successfully" });
    } catch(error) {
        res.status(500).json({ error: "Insertion failed", details: error });
    }
});

app.post('/edit-blog', async (req, res) => {
    const author_name = req.body["author"];
    const blog_title = req.body["title"];
    const blog_content = req.body["content"];
    const blog_pk = req.body["id"];
    try{
        await db.query("UPDATE blogs SET blog_title=$1, blog_content=$2, author_name=$3 WHERE id=$4", [blog_title, blog_content, author_name, blog_pk]);
        res.status(200).json({ message: "Blog Edited successfully" });
    } catch(error){
        res.status(500).json({ error: "Edition failed", details: error });
    }
});

app.get("/delete-blog/:id", async (req, res) => {
    const blog_pk = parseInt(req.params.id);
    try {
        await db.query("DELETE FROM blogs WHERE id=$1", [blog_pk]);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Deletion failed", details: error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}.`);
});