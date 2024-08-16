import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditNote() {
    const { id } = useParams();
    const [note, setNote] = useState({ author: '', content_title: '', content: '', thumbnail: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            const token = localStorage.getItem('token');
           
                const response = await fetch(`http://localhost:5005/api/notes/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token,
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
        const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5005/api/notes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify(note),
            });
            
            
    }

    return (
        <div>
            <div>
                <div>
                    <h2>Edit Note</h2>

                    <form onSubmit={onSubmit}>
                        <div>
                            <label>Author</label>
                            <input
                                type="text"
                              
                                placeholder="Enter author name"
                                name="author"
                                value={note.author}
                                onChange={onInputChange}
                            />
                        </div>
                        <div >
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
                              
                                placeholder="Enter thumbnail URL"
                                name="thumbnail"
                                value={note.thumbnail}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type="submit">Update Note</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditNote;
