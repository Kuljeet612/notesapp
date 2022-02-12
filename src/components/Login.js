import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    //seeting inital values for the sattes available in Login component
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      //TODO: Move all urls in a config or env var file
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMGE5NWJjMTcyN2Y2MzQ4Mzc5YmYxIn0sImlhdCI6MTY0NDIxMDU1M30.uA5GbJLw1XMo2SCCKtKfEu_IQzV8IRCvteoxjANbvVY",
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      console.log(json);
      if(json.success) {
          //save the auth-token and redirect
          localStorage.setItem("token", json.authtoken);
          navigate("/");
      }
      else {
          alert("Invalid credentials");
      }
    };

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

  return (
    <div>
        <form onSubmit={handleFormSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange}aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password } id="password" onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
//onClick requires a click listener and handler. onSubmit does not require that.
export default Login