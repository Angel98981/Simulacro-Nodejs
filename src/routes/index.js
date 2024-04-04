const express=require('express');
const router=express.Router();
const studenController =require('../controller/studentsController');
/* Ruta protegida */
const auth=require('../middleware/auth');
router.get('/api/v1/students',auth.authenticate(), studenController.getAllStudents);


router.get('/api/v1/students',studenController.getAllStudents);
router.get('/api/v1/students/:id',studenController.getStudent);
router.post('/api/v1/students',studenController.createStudent);
router.put('/api/v1/students/:id',studenController.updateStudent);
router.delete('/api/v1/students/:id',studenController.deleteStudent);


/* para registro y login */
router.post('/api/v1/login',studenController.login);
router.post('/api/v1/register',studenController.register);

module.exports=router;