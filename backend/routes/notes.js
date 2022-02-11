const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Fetch all the notes using GET "/api/notes/all". Login reqd
router.get('/all', fetchuser, async (req, res) => {  
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    }  catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

// ROUTE 2: Create a new not using POST "/api/notes/create". Login reqd

router.post('/create', fetchuser, [  
    body('title', "Enter a valid title.").isLength({min : 3}),
    body('desc', "Enter a valid desription.").isLength({min : 5}),    
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
    
// ROUTE 3: Update an existing note using PUT "/api/notes/update/{noteId}". Login reqd
router.put('/update/:id', fetchuser, async (req, res) => {
    const {title, desc, tag} = req.body;
    try {
        //Create a new note object
        const newNote = {};
        title ? newNote.title = title : "";
        desc ? newNote.desc = desc : "";
        tag ? newNote.tag = tag : "";
    
        //Find the note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Not found");
        }    
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})   //id passed in the url
        res.json({note});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }   
})

// ROUTE 4: Delete a note using DELETE "/api/notes/delete". Login reqd
router.delete('/delete/:id', fetchuser, async (req, res) => {
    const {title, desc, tag} = req.body;
    try {
    //Find the note to be deleted and delete it 
    let note = await Note.findById(req.params.id);
    if(!note) {
        return res.status(404).send("Not found");
    }    
    //Allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id)   //id passed in the url
    res.json({"Success": "Note with id: "+ req.params.id+" has been deleted.", note: note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
      }  

})

// ROUTE 5: Fetch a particular note using GET "/api/notes/note/:id". Login reqd
// router.get('/note/:id', fetchuser, async (req, res) => { 
//     try {
//     //Find the note to be deleted and delete it 
//     let note = await Note.findById(req.params.id);
//     if(!note) {
//         return res.status(404).send("Not found");
//     }    
//     //Allow deletion only if user owns this note
//     if(note.user.toString() !== req.user.id) {
//         return res.status(401).send("Not Allowed");
//     }
//     const notes = await Note.find({user: req.user.id});
//     res.json(notes);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send("Internal Server Error");
//       }  

// })

module.exports = router