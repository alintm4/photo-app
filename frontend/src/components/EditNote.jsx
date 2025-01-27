import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditNote() {
  const { id } = useParams();
  const [note, setNote] = useState({
    author: "",
    content_title: "",
    content: "",
    thumbnail: "",
  });

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      const url = "https://simple-notes-app-np2c.onrender.com/api/notes/" + id;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setNote(data);
      } else {
        console.log("Error occurred");
      }
    };
    fetchNote();
  }, [id]);

  const onInputChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!note.author || !note.content_title || !note.content || !note.thumbnail) {
      console.error("Error: All fields are required.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }
    const url = "https://simple-notes-app-np2c.onrender.com/api/notes/" + id;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        author: note.author,
        content_title: note.content_title,
        content: note.content,
        thumbnail: note.thumbnail,
      }),
    });

    if (response.ok) {
      navigate(`/note/${id}`);
    } else {
      console.error("Error updating note");
    }
  };

  return (
    <div className="font-sans p-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 min-h-screen">
      <h2 className="text-center text-3xl font-bold mb-6 text-white">Edit Note</h2>
      <div className="flex justify-center">
        <div className="border rounded-lg p-6 shadow-lg max-w-md w-full bg-gray-800 text-white">
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-xl md:text-2xl mb-2 font-semibold">
                Author:
              </label>
              <input
                type="text"
                name="author"
                placeholder="Enter author name"
                value={note.author}
                onChange={onInputChange}
                className="w-full border rounded-md p-3 text-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl md:text-2xl mb-2 font-semibold">
                Title:
              </label>
              <input
                type="text"
                placeholder="Enter note title"
                name="content_title"
                value={note.content_title}
                onChange={onInputChange}
                className="w-full border rounded-md p-3 text-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xl md:text-2xl mb-2 font-semibold">
                Content:
              </label>
              <textarea
                placeholder="Enter note content"
                name="content"
                value={note.content}
                onChange={onInputChange}
                className="w-full border rounded-md p-3 text-lg h-40 resize-none bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-xl md:text-2xl mb-2 font-semibold">
                Thumbnail URL:
              </label>
              <input
                type="text"
                placeholder="Enter thumbnail URL"
                name="thumbnail"
                value={note.thumbnail}
                onChange={onInputChange}
                className="w-full border rounded-md p-3 text-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-purple-700 text-white p-3 rounded-lg w-full font-semibold hover:bg-purple-800 transition-all duration-300 ease-in-out"
              >
                Update Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
