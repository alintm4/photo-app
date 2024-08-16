import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useOutletContext();
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5005/api/notes", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "x-auth-token": token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data); // Update state with fetched data
      } else {
        console.log("Failed to fetch notes");
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5005/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
    });
    if (response.ok) {
      setNotes(notes.filter((note) => note._id !== id));
    } else {
      const data = await response.json();
    }
  };

  return (
    <div>
      <div className="">
        <div className="">
          <h2 className="">All Notes</h2>
          {notes.length === 0 ? (
            <p>No notes available.</p>
          ) : (
            <ul className="">
              {notes.map((note) => (
                <li key={note._id} className="">
                  <h5>{note.content_title}</h5>
                  <p>{note.content}</p>
                  <small>
                    By {note.author} on{" "}
                    {new Date(note.date_created).toLocaleDateString()}
                  </small>
                  {isAuthenticated && (
                    <div className="mt-2">
                      <Link to={`/edit/${note._id}`} className="">
                        Edit
                      </Link>
                      <button
                        className=""
                        onClick={() => handleDelete(note._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notes;
