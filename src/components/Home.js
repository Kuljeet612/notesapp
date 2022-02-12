import React, { useContext } from "react";
import notesContext from "../context/notes/NotesContext";
import { AddNote } from "./AddNote";
import Notes from "./Notes";

function Home(props) {
  const {showAlert} = props;
  return (
    <div>    
      <Notes showAlert={showAlert}/>
    </div>
  );
}

export default Home;
