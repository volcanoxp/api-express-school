import { Router } from 'express';
import { getCourses, getCourse, newCourse, updateCourse, deleteCourse } from '../controllers/course.controller';

const router = Router();

router.get('/', getCourses );
router.get('/:id', getCourse );
router.post('/', newCourse );
router.put('/:id', updateCourse );
router.delete('/:id', deleteCourse );

export default router;