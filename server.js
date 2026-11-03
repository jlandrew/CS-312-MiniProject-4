import express from "express";
import cors from "cors";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "BlogDB",
  password: "postgresPassword",
  port: 5432,
});
db.connect();

let blogs = [];

// retrieve blogs
app.get("/blogs", async (req, res) => {
    const result = await db.query("SELECT * FROM blogs ORDER BY blog_id DESC;");
    // posts = result.rows;
    blogs = result.rows;
    // convert time
    for (let i = 0; i < blogs.length; ++i) {
      const date = new Date(blogs[i].date_created);

      // Format as MM/DD/YYYY H:MM (no seconds, 12-hour clock)
      let formatted = new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
      blogs[i].date_created = formatted; 
    }
    res.json(blogs);
});


// post blog
app.post("/blogs", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  const newBlog = {
    id: Date.now(),
    title,
    content,
  };

  blogs.push(newBlog);

  res.status(201).json(newBlog);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
