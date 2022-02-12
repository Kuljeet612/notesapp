import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';
import {useState} from 'react';

//making all the state variables of NoteState available in all the components at line 13
function App() {
  const[alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>          
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
