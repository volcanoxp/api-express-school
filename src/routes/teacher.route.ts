import { Router } from 'express';
import { getTeachers, getTeacher, updateTeachers, deleteTeachers, createTeacher } from '../controllers/teacher.controller';

const router = Router();

router.get('/', getTeachers);
router.get('/:id', getTeacher);
router.post('/', createTeacher);
router.put('/:id', updateTeachers);
router.delete('/:id', deleteTeachers);


export default router;