import { Router, Express } from 'express';

import classroomRouter from './classroom.route';
import courseRouter from './course.route';
import noteRouter from './note.route';
import studentRouter from './student.route';
import teacherRouter from './teacher.route';


export function routerApi(app: Express){
    const router = Router();
    router.use('/classroom', classroomRouter);
    router.use('/course', courseRouter);
    router.use('/note', noteRouter);
    router.use('/student', studentRouter);
    router.use('/teacher', teacherRouter);

    app.use('/api/v1.0', router);
}