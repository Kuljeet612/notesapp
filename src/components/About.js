import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/NotesContext";

function About() {
  const a = useContext(noteContext);
  
  useEffect(() => {
    a.update()
    // eslint-disable-next-line
  }, [])

  return <div>This is about {a.state.name}</div>;
}

export default About;
