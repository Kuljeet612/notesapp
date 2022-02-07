//NodeJs Middleware is a function which is called whenever there is request on the "Login" required routes
const jwt = require('jsonwebtoken');
const JWT_SECRET = "someSecretCode"  //todo : move this to anv local

const fetchuser = (req, res, next) => {
    //Get the user from the token and add id to req object
    const token = req.header('auth-token'); //naming the header name which will be passed in the req
    if(!token) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        //this will correspond to the third argument passed which is an async function in the route request that tells what to do after fetching the user
        next(); 
    }catch(error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    
}

module.exports = fetchuser; 

// [
//     body("email", "Enter a valid email").isEmail(),
//     body("password", "Password cannot be blank").exists(),
//   ]