const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { response } = require('express');

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
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
    //   .then(user => res.json(user))  //commenting as now we are using async await
    //   .catch(err => {console.log(err)
    //   res.json({error : "Please enter a unique value for email.", message: err.message})}) //to print on client
        res.json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})


module.exports = router