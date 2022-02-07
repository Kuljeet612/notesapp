const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,  //like a foreign key
        ref: 'user'  //the model to be referred to
    },
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

    module.exports = mongoose.model('notes', NotesSchema);  //this will create a "notes" collection in the db