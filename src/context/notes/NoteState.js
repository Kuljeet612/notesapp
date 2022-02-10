import { useState } from "react";
import NotesContext from "./NotesContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "62014dd5a8ac977b70e2e490",
            "user": "6200a95bc1727f6348379bf1",
            "title": "My title",
            "desc": "Hello there!",
            "tag": "Personal",
            "date": "2022-02-07T16:50:29.885Z",
            "__v": 0
          },
          {
            "_id": "620158d7750c711308b90ece",
            "user": "6200a95bc1727f6348379bf1",
            "title": "Note2",
            "desc": "Lofi playlist",
            "tag": "YouTube1",
            "date": "2022-02-07T17:37:27.726Z",
            "__v": 0
          },
          {
            "_id": "62014dd5a8ac977b70e2e490",
            "user": "6200a95bc1727f6348379bf1",
            "title": "My title",
            "desc": "Hello there!",
            "tag": "Personal",
            "date": "2022-02-07T16:50:29.885Z",
            "__v": 0
          },
          {
            "_id": "620158d7750c711308b90ece",
            "user": "6200a95bc1727f6348379bf1",
            "title": "Note2",
            "desc": "Lofi playlist",
            "tag": "YouTube1",
            "date": "2022-02-07T17:37:27.726Z",
            "__v": 0
          },
          {
            "_id": "62014dd5a8ac977b70e2e490",
            "user": "6200a95bc1727f6348379bf1",
            "title": "My title",
            "desc": "Hello there!",
            "tag": "Personal",
            "date": "2022-02-07T16:50:29.885Z",
            "__v": 0
          },
          {
            "_id": "620158d7750c711308b90ece",
            "user": "6200a95bc1727f6348379bf1",
            "title": "Note2",
            "desc": "Lofi playlist",
            "tag": "YouTube1",
            "date": "2022-02-07T17:37:27.726Z",
            "__v": 0
          }
    ]
    const[notes, setNotes] = useState(notesInitial);

    const s1 = {
        "name": "Kuljeet",
        "class": "5b" 
    }
    const [state, setState] = useState(s1);  //setting inital state

    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Rachel",
                "class": "10b"  
            })
        }, 1000)
    }
    return (
        <NotesContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState;

/* In Line 20,  As per modern JS syntax, <NotesContext.Provider value={{state, update}}> ===  <NotesContext.Provider value={{state: state, update: update}}>
Hence, no need to pass the whole object syntax */