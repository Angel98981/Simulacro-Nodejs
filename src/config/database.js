const mongoose = require('mongoose')
let Student;

const connectDatabase=async() => {
    try {
        if (!Student) {
            Student=mongoose.model('students', require('../models/studentsModel').schema)
        }
        await mongoose.connect('mongodb+srv://angelriverarf:6tNvR5cNR0vfisnQ@pruebita.xbcxzti.mongodb.net/')
        .then (()=> console.log('Conectado a MongoDb'))
        .catch((error)=> console.log(error));

        await inicializarData();
        
    }catch(error){
        console.log('Falla al conectar',error);
        process.exit(1);
    }
}

const inicializarData= async () =>{
    try {
        await Student.deleteMany();
        
        const studentsData=[
            {
                name:'Angel',
                identification: '1152467107',
                password: '123',
                age: 25
            },
            {
                name:'Vicky',
                identification: '1152467107',
                password: '333',            
                age: 24
            },
            {
                name:'Manuela',
                identification: '108831399',
                password: '111',
                age: 30
            }
        ]
        await Student.insertMany(studentsData);
        console.log('data initialized successfully');
        
    } catch (error) {
        console.error('Falla al inicializar data',error);
        process.exit(1);
    }

}

module.exports = connectDatabase