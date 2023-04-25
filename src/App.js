import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    const response = await fetch("http://localhost:3001/api/posts", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setPosts([...data]);
    console.log(response);
  }

  async function addPost() {
    const response = await fetch("http://localhost:3001/api/posts", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg: input }),
    });

    response.json();
    setInput("");
    getPosts();
  }

  async function deletePost(id) {
    const response = await fetch("http://localhost:3001/api/posts", {
      method: "DELETE",
      mode: "cors",
    });

    const data = await response.json();
    setPosts([data]);
    getPosts();
  }

  async function updatePost(id) {
    const response = await fetch("http://localhost:3001/api/posts", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ msg: input }),
    });
    const data = await response.json();
    setPosts([data]);
    getPosts();
  }

  return (
    <div className="main-content">
      <h2>Add New Post</h2>
      <input onChange={(e) => setInput(e.target.value)} value={input}></input>
      <button onClick={addPost}>Save</button>
      <div>
        <h2>All Posts</h2>
        <ul>
          {posts.map((el, i) => {
            return (
              <li key={i}>
                {el.msg}
                <button onClick={() => updatePost(el.id)}>Update</button>
                <button onClick={() => deletePost(el.id)}>Delete</button>
                {el.timestamp}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
