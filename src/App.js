import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import About from './components/About';
import NoteState from './context/notes/NoteState';
import { Alert } from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';

//making all the state variables of NoteState available in all the components at line 13
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert msg="This is me"/>
          <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
