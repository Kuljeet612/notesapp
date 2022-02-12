import React, {useContext, useEffect, useRef, useState} from 'react';
import notesContext from '../context/notes/NotesContext';
import NoteItem from './NoteItem';
import { AddNote } from './AddNote';

function Notes(props) {
  const context = useContext(notesContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes()
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  
  const [note, setNote] = useState({id: "", etitle:"", edesc: "", etag: ""});

  const handleClick = (e) => {
    console.log("Updating the note...", note);
    e.preventDefault(); //to avoid page reloading
    editNote(note.id, note.etitle, note.edesc, note.etag);
    refClose.current.click();  //using close btn reference to click it and close the modal when update btn is clicked
    props.showAlert("Updated successfully!!!", "success");
  };
  
  const onChangeHandler = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); //First arg: Keep the existing notes as it is. Second arg: New properties to be added in the array
  };  

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edesc:currentNote.desc, etag:currentNote.tag});  //This will prefill the values in the edit modal when clicked    
  }

  return (
    <>
    <AddNote showAlert={props.showAlert}/>   
    <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form className="container my-3">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          value={note.etitle}
          className="form-control"
          id="etitle"
          name="etitle"
          aria-describedby="etitle"
          onChange={onChangeHandler}
          minLength={5}
          required
        />       
      </div>
      <div className="mb-3">
        <label htmlFor="edesc" className="form-label">
          Description
        </label>
        <input
          type="text"
          value={note.edesc}
          className="form-control"
          id="edesc"
          name="edesc"
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
          value={note.etag}
          className="form-control"
          id="etag"
          name="etag"
          onChange={onChangeHandler}
        />
      </div>        
    </form>
          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length < 5 || note.edesc.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className="container row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
        {notes.length === 0 && "No notes to display"}
        </div>        
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
        })}
    </div>
      </>
  )
}

export default Notes

//We can also use <AddNote/> component in Home component but using it in <Notes/> component makes more sense.