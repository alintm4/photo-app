import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useOutletContext();
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("https://simple-notes-app-np2c.onrender.com/api/notes", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data); 
      } else {
        console.log("Failed to fetch notes");
      }
    };
    fetchNotes();
  }, []);

  const handleDelete = async (note_id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://simple-notes-app-np2c.onrender.com/api/notes/${note_id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
    });
    if (response.ok) {
      setNotes(notes.filter((note) => note._id !== note_id));
    } else {
      console.log("Error is occuring");
      const data = await response.json();
    }
  };

  return (
    <div className="p-4">
    <h2 className="text-center text-2xl font-semibold mb-4">Posts Available:</h2>
    {notes.length === 0 ? (
      <p className="text-center">No notes available.</p>
    ) : (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes.map((note) => (
          <div key={note._id} className="border rounded p-4 shadow bg-white">
            <h5 className="text-lg font-semibold">{note.content_title}</h5>
            {note.thumbnail && (
              <div className="mt-2">
                <img
                  src={note.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-[300px] rounded"
                />
              </div>
            )}
            <p className="mt-2">{note.content}</p>
            <small className="mt-2 text-gray-600">
              By {note.author} on {new Date(note.date_created).toLocaleDateString()}
            </small>
            
            {isAuthenticated && (
              <div className="mt-4 flex space-x-4">
                <Link to={`/edit/${note._id}`} className="text-blue-500 hover:underline">
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
}

export default Notes;
