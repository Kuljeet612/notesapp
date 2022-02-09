import { useState } from "react";
import NotesContext from "./NotesContext";

const NoteState = (props) => {
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
        <NotesContext.Provider value={{state, update}}>
            {props.children}
        </NotesContext.Provider>
    )
}

export default NoteState;

/* In Line 20,  As per modern JS syntax, <NotesContext.Provider value={{state, update}}> ===  <NotesContext.Provider value={{state: state, update: update}}>
Hence, no need to pass the whole object syntax */