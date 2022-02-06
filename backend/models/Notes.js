const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,        
    },
    tag: {
        type: String,
        default: "General"      
    },
    date: {
        type: Date,
        default: Date.now  //do not call the fn here. just name it
    },
    });

    module.exports = model('notes', NotesSchema);