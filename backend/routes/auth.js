const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "someSecretCode";  //todo : move this to anv local
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Create a user using POST "/api/auth/createuser". No login reqd
router.post('/createuser', [
    body('name').isLength({min : 3}),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must have at least 5 characters.").isLength({min : 5}),
  ], async(req, res) => {  
    let success = false;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
    //Check if email already exists
    let user = await User.findOne({email: req.body.email});  //this will return a user having the email id passed

    if(user) {
        return res.status(400).json({success, error: "Sorry, a user with this email already exists"})
    }   
    const salt = await bcrypt.genSalt(10);
    const secPwd = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPwd
      })   
      const data = {
          user: {
              id: user.id
          }
      }
      //Sign and send the auth token
      const authToken = jwt.sign(data, JWT_SECRET); //sync method only  
      success = true;    
      res.json({success, authToken});        
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 2: Authenticate a user using POST "/api/auth/login". No login reqd
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors on the client itself without reaching out to the server
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; //Destructuring to get email and pwd in req.body
    try {
      let user =await User.findOne({ email });
      if (!user) {        
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials." });
      }
      const pwdComapre = await bcrypt.compare(password, user.password); //internally takes hashes and compares. Returns a boolean value. Async in nature
      if (!pwdComapre) {        
        return res.status(400).json({success, error: "Please try to login with correct credentials." });
      }

      //Sending user id as data which means it will be a part of the JWT
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET); //sync method only
      success= true;
      res.json({success, authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
  });

//ROUTE 3: Get logged in user details using POST "api/auth/getuser". Login reqd. Hence, token needs to be passed.
router.get(
  "/getuser", fetchuser, async (req, res) => {  //Using fetchUser middleware after which the async fn is called
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password"); //allowing to select all the fields wxcept the pwd
      res.send(user);       
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router

/* We move the logic to fetch user ina middleware so that we can use it anytime we need to create a new endpoint that requires user id */