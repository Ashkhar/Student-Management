const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    rollno: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
