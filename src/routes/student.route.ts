import { Router } from 'express';
import { getStudents, getStudent, createStudent, updateStudent, deleteStudent, changeClassroom } from '../controllers/student.controller';

const router = Router();

router.get('/', getStudents);
router.get('/:id', getStudent);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);
router.put('/:id/change-classroom', changeClassroom);

export default router;