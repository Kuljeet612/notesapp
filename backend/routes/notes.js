const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Create all the notes using GET "/api/auth/createuser". No login reqd
router.get('/all', fetchuser, async (req, res) => {  
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    }  catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

// ROUTE 2: Create a new not using POST "/api/auth/createuser". Login reqd

router.get('/create', fetchuser, [  
    body('title', "Enter a valid title.").isLength({min : 3}),
    body('desc', "Enter a valid dexription.").isLength({min : 5}),    
], async (req, res) => { 
    try {
      const { title, desc, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        desc,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})
    


module.exports = router