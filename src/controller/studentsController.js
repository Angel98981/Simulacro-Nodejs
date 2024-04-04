const Student = require('../models/studentsModel');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const jwt_secret= 'password'; // contraseña que quiero usar, puede ser lo que sea

const studentController={
    /* GET all students */
    getAllStudents: async (req, res) => {
        try {
            const students = await Student.find();
            res.status(200).json(students);
        } catch (error) {
            console.error('error al obtener student',error);
            res.status(500).json(error);
        }
    },
    /* GET single student */
    getStudent: async (req, res) => {
        try {
            const id = req.params.id;
            const student = await Student.findById(id);
            res.status(200).json(student);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    /* POST new student */
    createStudent: async (req, res) => {
        const studentData = req.body
        try {
            const newStudent = new Student(studentData);
            const savedStudent = await newStudent.save();
            res.status(201).json(savedStudent);
        } catch (error) {
            console.error('error al crear student',error);
            res.status(500).json(error);
        }
    },
    /* PUT update student */
    updateStudent: async (req, res) => {
        try {
            const id = req.params.id;
            const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(student);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    /* DELETE delete student */
    deleteStudent: async (req, res) => {
        try {
            const id = req.params.id;
            const student = await Student.findByIdAndDelete(id);
            res.status(200).json(student);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    /* POST login */
    login: async (req, res) => {
        const studentData = req.body
        try {
            const student = await Student.findOne({identification: studentData.identification});
            if(student){
                const isMatch = await bcrypt.compare(studentData.password, student.password);
                if(isMatch){
                    const token = jwt.sign({id: student._id}, jwt_secret);
                    console.log('inicio correcto');
                    res.status(200).json({token});
                }else{
                    res.status(401).json({message: 'Credenciales incorrectas'});
                }
            }else{
                res.status(401).json({message: 'Credenciales incorrectas'});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    /* REGISTER */
    register: async (req, res) => {
        const studentData = req.body;
        try {            
            const hashedPassword = await bcrypt.hash(studentData.password, 10);               
            const newStudent = new Student({
                name: studentData.name,
                identification: studentData.identification,
                password: hashedPassword 
            });          
            const savedStudent = await newStudent.save();           
            res.status(201).json(savedStudent);
        } catch (error) {            
            res.status(500).json(error);
        }
    },    

}

module.exports = studentController;