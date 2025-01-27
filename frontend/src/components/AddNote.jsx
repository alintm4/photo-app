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
    const token = localStorage.getItem("token");

    const response = await fetch("https://simple-notes-app-np2c.onrender.com/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(note),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      navigate("/");
    } else {
      console.log("Error occurred while creating note");
    }
  };

  return (
    <div className="font-sans p-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 min-h-screen">
      <h2 className="text-center text-3xl font-bold mb-6 text-white">Create a New Note</h2>
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
                placeholder="Enter Author"
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
                Add Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
