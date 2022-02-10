import React, {useContext, useEffect} from 'react';
import notesContext from '../context/notes/NotesContext';
import NoteItem from './NoteItem';
import { AddNote } from './AddNote';

function Notes() {
  const context = useContext(notesContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes()
  }, [])

  return (
    <>
    <AddNote/> 
    <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note}/>
        })}
      </div>
      </>
  )
}

export default Notes

//We can also use <AddNote/> component in Home component but using it in <Notes/> component makes more sense.