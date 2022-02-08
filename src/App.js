//import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import About from './components/About';

function App() {
  return (
    <>
    <Router>
        <Navbar/>         
       <Routes>
          <Route exact path="/" element={<Home />}/>                  
          <Route exact path="/about" element={<About />}/>          
        </Routes>
        </Router>
        </>
  );
}

export default App;
