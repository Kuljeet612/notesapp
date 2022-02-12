import { useState } from "react";
import NotesContext from "./NotesContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [
    {
      _id: "62014dd5a8ac97a7b70e2e490",
      user: "6200a95bc1727f6348379bf1",
      title: "My title",
      desc: "Hello there!",
      tag: "Personal",
      date: "2022-02-07T16:50:29.885Z",
      __v: 0,
    },
    {
      _id: "620158d7750c7113108b90ece",
      user: "6200a95bc1727f6348379bf1",
      title: "Note2",
      desc: "Lofi playlist",
      tag: "YouTube1",
      date: "2022-02-07T17:37:27.726Z",
      __v: 0,
    },
    {
      _id: "62014dd5a8ac977b70e23e490",
      user: "6200a95bc1727f6348379bf1",
      title: "My title",
      desc: "Hello there!",
      tag: "Personal",
      date: "2022-02-07T16:50:29.885Z",
      __v: 0,
    },
    {
      _id: "620158d7750c711308b940ece",
      user: "6200a95bc1727f6348379bf1",
      title: "Note2",
      desc: "Lofi playlist",
      tag: "YouTube1",
      date: "2022-02-07T17:37:27.726Z",
      __v: 0,
    },
    {
      _id: "62014dd5a8ac977b70e52e490",
      user: "6200a95bc1727f6348379bf1",
      title: "My title",
      desc: "Hello there!",
      tag: "Personal",
      date: "2022-02-07T16:50:29.885Z",
      __v: 0,
    },
    {
      _id: "620158d7750c711308b960ece",
      user: "6200a95bc1727f6348379bf1",
      title: "Note2",
      desc: "Lofi playlist",
      tag: "YouTube1",
      date: "2022-02-07T17:37:27.726Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const json = await response.json(); //this is an async fn
    //console.log(json);
    setNotes(json);
  };

  //Add a note
  const addNote = async (title, desc, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, desc, tag }),
    });   
    const note = await response.json();
    setNotes(notes.concat(note)); //using concat because concat returns an array while push updates an array        
  };

  //Delete a note
  const deleteNote = async (noteId) => {
    //API Call
    const response = await fetch(`${host}/api/notes/delete/${noteId}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const json =await response.json();
    console.log(json);

    //Client Side Logic
    const newNotes = notes.filter((note) => {
      return note._id !== noteId;
    });
    setNotes(newNotes);
    console.log("Deleted note with id: " + noteId);
  };

  //Edit a note
  const editNote = async (noteId, title, desc, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/update/${noteId}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, desc, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    let newNotesObj = JSON.parse((JSON.stringify(notes)));  //Keeping a deep copy of original object so that we can update the same
    //Logic to edit in client
    for (let i = 0; i < notes.length; i++) {
      const element = newNotesObj[i];
      if (element._id === noteId) {
        newNotesObj[i].title = title;
        newNotesObj[i].desc = desc;
        newNotesObj[i].tag = tag;
        break;
      }      
    }
    setNotes(newNotesObj);
  };

  return (
    <NotesContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NotesContext.Provider>
  );
}

export default NoteState;

/* In Line 20,  As per modern JS syntax, <NotesContext.Provider value={{state, update}}> ===  <NotesContext.Provider value={{state: state, update: update}}>
Hence, no need to pass the whole object syntax */