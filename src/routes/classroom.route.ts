import { Router, Request, Response } from 'express';
import { getClassroooms, getClassrooom, createClassrooom, updateClassrooom, deleteClassrooom, changeTeacher } from '../controllers/classroom.controller';

const router = Router();

router.get('/', getClassroooms);
router.get('/:id', getClassrooom);
router.post('/', createClassrooom);
router.put('/:id', updateClassrooom);
router.delete('/:id', deleteClassrooom);
router.put('/:id/change-teacher', changeTeacher);

export default router;