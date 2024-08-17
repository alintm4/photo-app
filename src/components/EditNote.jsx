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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5005/api/notes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setNote(data);
      }
    };

    fetchNote();
  }, [id]);

  const onInputChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5005/api/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(note),
    });
  };

  return (
    <div className="font-sans p-6">
      <h2 className="text-center text-3xl font-bold mb-6">Edit Note</h2>
      <div className="flex justify-center">
        <div className="border rounded-lg p-6 shadow-lg max-w-md w-full">
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
                className="w-full border rounded-md p-3 text-lg"
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
                className="w-full border rounded-md p-3 text-lg"
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
                className="w-full border rounded-md p-3 text-lg h-40 resize-none"
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
                className="w-full border rounded-md p-3 text-lg"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-yellow-700 text-white p-3 rounded-lg w-full font-semibold hover:bg-yellow-800 transition"
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
