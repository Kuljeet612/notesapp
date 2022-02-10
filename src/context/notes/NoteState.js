import { useState } from "react";
import NotesContext from "./NotesContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "62014dd5a8ac97a7b70e2e490",
            "user": "6200a95bc1727f6348379bf1",
            "title": "My title",
            "desc": "Hello there!",
            "tag": "Personal",
            "date": "2022-02-07T16:50:29.885Z",
            "__v": 0
          },
          {
            "_id": "620158d7750c7113108b90ece",
            "user": "6200a95bc1727f6348379bf1",
            "title": "Note2",
            "desc": "Lofi playlist",
            "tag": "YouTube1",
            "date": "2022-02-07T17:37:27.726Z",
            "__v": 0
          },
          {
            "_id": "62014dd5a8ac977b70e23e490",
            "user": "6200a95bc1727f6348379bf1",
            "title": "My title",
            "desc": "Hello there!",
            "tag": "Personal",
            "date": "2022-02-07T16:50:29.885Z",
            "__v": 0
          },
          {
            "_id": "620158d7750c711308b940ece",
            "user": "6200a95bc1727f6348379bf1",
            "title": "Note2",
            "desc": "Lofi playlist",
            "tag": "YouTube1",
            "date": "2022-02-07T17:37:27.726Z",
            "__v": 0
          },
          {
            "_id": "62014dd5a8ac977b70e52e490",
            "user": "6200a95bc1727f6348379bf1",
            "title": "My title",
            "desc": "Hello there!",
            "tag": "Personal",
            "date": "2022-02-07T16:50:29.885Z",
            "__v": 0
          },
          {
            "_id": "620158d7750c711308b960ece",
            "user": "6200a95bc1727f6348379bf1",
            "title": "Note2",
            "desc": "Lofi playlist",
            "tag": "YouTube1",
            "date": "2022-02-07T17:37:27.726Z",
            "__v": 0
          }
    ]
    const[notes, setNotes] = useState(notesInitial);

   
    //Add a note
    const addNote = (title, desc, tag) => {
        //TODO: API Call
        console.log("Adding a new note");
       const note =  {
            "_id": "620158d7750c711308b960ece",
            "user": "6200a95bc1727f6348379bf1",
            "title": title,
            "desc": desc,
            "tag": tag,
            "date": "2022-02-07T17:37:27.726Z",
            "__v": 0
          };
        setNotes(notes.concat(note));  //using concat because concat returns an array while push updates an array
    }

    //Delete a note
 const deleteNote = (noteId) => {
    const newNotes = notes.filter((note) => {
        return note._id !== noteId;
    })
    setNotes(newNotes);
    console.log("Deleted note with id: "+noteId);
    }

    //Edit a note
    const editNote = (noteId) => {
        
    }

    return (
        <NotesContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState;

/* In Line 20,  As per modern JS syntax, <NotesContext.Provider value={{state, update}}> ===  <NotesContext.Provider value={{state: state, update: update}}>
Hence, no need to pass the whole object syntax */