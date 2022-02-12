import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", confirmPassword: ""});
    let navigate = useNavigate();
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      //TODO: Move all urls in a config or env var file
      const {name, email, password,confirmPassword} = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {          
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMGE5NWJjMTcyN2Y2MzQ4Mzc5YmYxIn0sImlhdCI6MTY0NDIxMDU1M30.uA5GbJLw1XMo2SCCKtKfEu_IQzV8IRCvteoxjANbvVY",
        },
        body: JSON.stringify({name, email, password})
      });
      const json = await response.json();
      console.log(json);    
      if(json.success) {
        //save the auth-token and redirect
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Account created successfully!!!", "success");
    }
    else {
        props.showAlert("Invalid credentials!!!", "danger")
    }                     
    };

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
  return (
    <div className='contaier'>
      <form onSubmit={handleFormSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" required minLength={5} className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp"/>    
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" required className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" required minLength={5} className="form-control" name="password" value={credentials.password} onChange={onChange} id="password" />
  </div>
  <div className="mb-3">
    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
    <input type="password" required className="form-control" name="confirmPassword" value={credentials.confirmPassword} onChange={onChange} id="confirmPassword" />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default SignUp