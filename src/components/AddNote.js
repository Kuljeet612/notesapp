import React, { useState, useContext } from 'react'
import notesContext from "../context/notes/NotesContext";

export const AddNote = (props) => {
    const context = useContext(notesContext);
    const { addNote } = context;
    const [note, setNote] = useState({title:"", desc: "", tag: ""});

    const addNoteHandler = (e) => {
        e.preventDefault(); //to avoid page reloading
        addNote(note.title, note.desc, note.tag);
        setNote({title:"", desc: "", tag: ""});
        props.showAlert("Added successfully!!!", "success");
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
          value={note.title}
          aria-describedby="title"
          onChange={onChangeHandler}
          minLength={5}
          required
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
          value={note.desc}
          onChange={onChangeHandler}
          minLength={5}
          required
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
          value={note.tag}
          onChange={onChangeHandler}
        />
      </div>
      <button disabled={note.title.length < 5 || note.desc.length < 5} type="submit" className="btn btn-primary" onClick={addNoteHandler}>
        Add Note
      </button>
    </form>
  </div>  
  )
}
