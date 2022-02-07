const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "someSecretCode"

//Create a user using POST "/api/auth/createuser". No login reqd
router.post('/createuser', [
    body('name').isLength({min : 3}),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must have at least 5 characters.").isLength({min : 5}),
], async(req, res) => {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
    //Check if email already exists
    let user = await User.findOne({email: req.body.email});  //this will return a user having the email id passed

    if(user) {
        return res.status(400).json({error: "Sorry, a user with this email already exists"})
    }   
    const salt = await bcrypt.genSalt(10);
    const secPwd = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPwd
      })   
      const date = {
          user: {
              id: user.id
          }
      }
      const authToken = jwt.sign(date, JWT_SECRET); //sync method only
      console.log(authToken);
      res.json({authToken});        
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})


module.exports = router