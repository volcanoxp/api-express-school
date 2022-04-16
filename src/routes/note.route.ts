import { Router } from 'express';

import { registerNote, getNotesCourse, getNotesStudent } from '../controllers/note.controller';

const router = Router();

router.post('/register', registerNote);
router.get('/course/:courseId', getNotesCourse);
router.get('/student/:studentId', getNotesStudent);

export default router;