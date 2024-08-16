import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddNote() {
  const [note, setNote] = useState({
    author: "",
    content_title: "",
    content: "",
    thumbnail: "",
  });

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch("http://localhost:5005/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(note),
    });

    const data = await response.json();
console.log(data)
    if (response.ok) {
      navigate("/");
    } else {
      console.log("haha");
    }
  };
  return (
    <div>
      <div>
        <h2>Create Note</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={note.author}
              onChange={onInputChange}
            />
          </div>

          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter note title"
              name="content_title"
              value={note.content_title}
              onChange={onInputChange}
            />
          </div>

          <div>
            <label>Content</label>
            <textarea
              placeholder="Enter note content"
              name="content"
              value={note.content}
              onChange={onInputChange}
            ></textarea>
          </div>

          <div>
            <label>Thumbnail URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter thumbnail URL"
              name="thumbnail"
              value={note.thumbnail}
              onChange={onInputChange}
            />
          </div>
          <div>
            <button type="submit">Add Notes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNote
