const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const student = require('./model/Student');
const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/studentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const students = await student.find();
        res.render('index', { students });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/save', async (req, res) => {
    try {
        const { rollno, name, degree, city } = req.body;
        const newStudent = new student({ rollno, name, degree, city });
        await newStudent.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/update/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const { rollno, name, degree, city } = req.body;
        await student.findByIdAndUpdate(studentId, { rollno, name, degree, city });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/delete/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        await student.findByIdAndDelete(studentId);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server runs on port no: ${PORT}`);
});
