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
      console.log("Error is occurring");
      const data = await response.json();
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-center text-3xl font-semibold mb-6">Posts Available:</h2>
        {notes.length === 0 ? (
          <p className="text-center text-gray-400">No notes available.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {notes.map((note) => (
              <div
                key={note._id}
                className="border border-gray-700 rounded-lg p-4 shadow-lg bg-white text-black"
              >
                <h5 className="text-xl font-semibold">{note.content_title}</h5>
                {note.thumbnail && (
                  <div className="mt-2">
                    <img
                      src={note.thumbnail}
                      alt="Thumbnail"
                      className="w-full h-[300px] rounded-md object-cover"
                    />
                  </div>
                )}
                <p className="mt-2 text-sm text-gray-800">{note.content}</p>
                <small className="mt-2 text-gray-600">
                  By {note.author} on {new Date(note.date_created).toLocaleDateString()}
                </small>
                
                {isAuthenticated && (
                  <div className="mt-4 flex space-x-4">
                    <Link to={`/edit/${note._id}`} className="text-blue-500 hover:underline">
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
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
    </div>
  );
}

export default Notes;
