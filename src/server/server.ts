import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const getAll = (req, res) => {
  res.status(200).json(tasks);
};

const create = (req, res) => {
  const id = tasks.length + 1;
  const { msg } = req.body;
  const timestamp = new Date();
  timestamp.toLocaleString();

  const newPost = { msg, id, timestamp };

  tasks = [...tasks, newPost];
  res.status(201).json({ msg: "Post Added" });
};

const update = (req, res) => {
  const { id } = req.params;
  const { msg } = req.body;
  const timestamp = new Date();
  timestamp.toLocaleString();
  tasks = tasks.map((el) =>
    el.id === Number(id) ? { ...el, msg, timestamp } : el
  );
  res.status(200).json({ msg: "Post Updated" });
};
const deletePost = (req, res) => {
  const { id } = req.params;

  tasks = tasks.filter((el) => el.id !== Number(id));
  res.status(200).json({ msg: "Post Deleted" });
};

type Task = {
  msg: string;
  id: number;
  timestamp: any;
};

type Tasks = Tasks[];

let tasks: Tasks = [];

app.get("/api/posts", getAll);
app.post("/api/posts", create);
app.put("/api/posts/:id", update);
app.delete("/api/posts/:id", deletePost);

app.listen(port, () => {
  console.log("App Running");
});
