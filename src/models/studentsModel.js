const mongoose=require('mongoose');

const studentsSchema= new mongoose.Schema({
    name: String,
    identification: String,
    password: String,
    age: Number
});

const Student=mongoose.model('students', studentsSchema);
module.exports = Student;