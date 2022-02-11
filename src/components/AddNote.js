import React, { useState, useContext } from 'react'
import notesContext from "../context/notes/NotesContext";

export const AddNote = () => {
    const context = useContext(notesContext);
    const { addNote } = context;
    const [note, setNote] = useState({title:"", desc: "", tag: "default"});
    const addNoteHandler = (e) => {
        e.preventDefault(); //to avoid page reloading
        addNote(note.title, note.desc, note.tag);
    }

    const onChangeHandler = (e) => {
        setNote({...note, [e.target.name]: e.target.value}); //First arg: Keep the existing notes as it is. Second arg: New properties to be added in the array
    }  
    return (
    <div className="container my-3">
    <h2>Add note</h2>
    <form className="container my-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          aria-describedby="title"
          onChange={onChangeHandler}
        />       
      </div>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="desc"
          name="desc"
          onChange={onChangeHandler}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          onChange={onChangeHandler}
        />
      </div>
   
      <button type="submit" className="btn btn-primary" onClick={addNoteHandler}>
        Add Note
      </button>
    </form>
  </div>  
  )
}
