const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true    
},
password: {
    type: String,
    required: true
},
date: {
    type: Date,
    default: Date.now  //do not call the fn here. just name it
},
});

module.exports = mongoose.model('user', UserSchema); //accepts name of model and schema