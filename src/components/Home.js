import React, { useContext } from "react";
import notesContext from "../context/notes/NotesContext";
import { AddNote } from "./AddNote";
import Notes from "./Notes";

function Home() {
  
  return (
    <div>    
      <Notes/>
    </div>
  );
}

export default Home;
