import React, { useState, useContext } from 'react'
import notesContext from "../context/notes/NotesContext";

export const AddNote = () => {
    const context = useContext(notesContext);
    const { addNote } = context;
    const [note, setNote] = useState({title:"", description: "", tag: "defualt"});
    const addNoteHandler = (e) => {
        e.preventDefault(); //to avoid page reloading
        addNote(note.title, note.description, note.tag);
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
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          onChange={onChangeHandler}
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" className="btn btn-primary" onClick={addNoteHandler}>
        Add Note
      </button>
    </form>
  </div>  
  )
}
