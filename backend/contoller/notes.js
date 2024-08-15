import Note from "../models/notes_Schema";
import express from "express"



// get all notes
export async function  findAllNotes(req,res) {
    const notes= await Note.find();
    res.json(notes);
}

// get a note
export async function findNote(req,res) {
    const notes=await Note.findById(req.params.id)
    
    if(!notes) {return res.status(404).json({message:"Invalid"})}
    
    res.status(201).json(notes);
    
    }

    // create a new note

export async function createNewNote(req,res) {
    const {author, content_title, content, thumbnail}=req.body;

    const notes= new Note({
        author,
        content_title,
        content,
        thumbnail
    })
    await notes.save()
    res.json({message:"New notes saved successfully"});
}


//update a note


export async function updateNote(req,res) {
    const {author, content_title, content, thumbnail}=req.body;
    const notes= await Note.findById(req.params.id);

    if (!notes) return res.status(404).json({ message: 'Note not found' });

    if (author) notes.author = author;
    if (content_title) notes.content_title = content_title;
    if (content) notes.content = content;
    if (thumbnail) notes.thumbnail = thumbnail;

    await notes.save();

}

// delete a note

export async function deleteNote(req,res) {
    const notes= await Note.findById(req.params.id);

    if(!notes) return res.status(404).json({ message: 'Note not found' });

    await notes.remove();
    res.json({message:"note deleted"})
}