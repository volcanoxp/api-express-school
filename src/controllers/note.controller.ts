import { pool } from "../db";
import { Handler } from 'express';
import { QueryResult } from 'pg';


export const registerNote: Handler = async (req, res) => {

    const { studentId, courseId, note1, note2, note3, note4 } = req.body;

    const queryInfo = `
        SELECT
            *
        FROM note
        WHERE studentId = ${studentId}
            AND courseId = ${courseId}
    `
    const responseInfo: QueryResult = await pool.query(queryInfo);

    let data = responseInfo.rows[0];
    data.note1 = note1 ? note1 : data.note1 ? data.note1 : 'NULL';
    data.note2 = note2 ? note2 : data.note2 ? data.note2 : 'NULL';
    data.note3 = note3 ? note3 : data.note3 ? data.note3 : 'NULL';
    data.note4 = note4 ? note4 : data.note4 ? data.note4 : 'NULL';

    const query = `
        UPDATE note
        SET note1 = ${data.note1},
            note2 = ${data.note2},
            note3 = ${data.note3},
            note4 = ${data.note4},
            updated_at = NOW()
        WHERE studentId = ${studentId}
            AND courseId = ${courseId}
    `
    const response: QueryResult = await pool.query(query);

    return res.status(201).json({
        message: "update successfully",
        note: data
    });
}


export const getNotesCourse: Handler = async (req, res) => {

    const { courseId } = req.params;

    const query = `
        SELECT
            N.studentId,
            S.firstname,
            S.lastname,
            N.note1,
            N.note2,
            N.note3,
            N.note4
        FROM note AS N
        LEFT JOIN student AS S ON S.id = N.studentId
        WHERE N.courseId = ${courseId}
            AND S.status = true
    
    `;
    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "get successfully",
        data: response.rows
    });
}

export const getNotesStudent: Handler = async (req, res) => {

    const { studentId } = req.params;

    const query = `
        SELECT
            N.courseId,
            C.name AS nameCourse,
            N.note1,
            N.note2,
            N.note3,
            N.note4
        FROM note AS N
        LEFT JOIN course AS C ON C.id = N.courseId
        WHERE N.studentId = ${studentId}
    `;
    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "get successfully",
        data: response.rows
    });
}


