import { pool } from "../db";
import { Handler } from 'express';
import { QueryResult } from 'pg';


export const getStudents: Handler = async (req, res) => {

    const query = `
        SELECT
            S.id AS studentId,
            firstname,
            lastname,
            email,
            phone
        FROM student AS S
        WHERE S.status = true
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "get successfully",
        data: response.rows
    });
}

export const getStudent: Handler = async (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT
            S.id AS studentId,
            firstname,
            lastname,
            email,
            phone
        FROM student AS S
        WHERE S.status = true
        AND S.id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "get successfully",
        student: response.rows[0]
    });
}

export const createStudent: Handler = async (req, res) => {
    const { firstname, lastname, email, phone , classroomId} = req.body;

    const query = `
        INSERT INTO student(
            firstname,
            lastname,
            email,
            phone)
        VALUES ('${firstname}',
                '${lastname}',
                '${email}',
                '${phone}')
        RETURNING id
    `;

    const response: QueryResult = await pool.query(query);
    const studentId = response.rows[0].id;

    const queryBind = `
        INSERT INTO classroomStudent(
            classroomId,
            studentId)
        VALUES (${classroomId},
                ${studentId})
    `
    const responseBind: QueryResult = await pool.query(queryBind);

    return res.status(200).json({
        message: "added successfully",
        student: {
            id: studentId,
            firstname,
            lastname,
            email,
            phone
        }
    });
}

export const updateStudent: Handler = async (req, res) => {
    const { id } = req.params
    let dataUpdate = req.body;

    const queryOldData = `
        SELECT
            firstname,
            lastname,
            email,
            phone
        FROM student
        WHERE id = ${id}
    `
    const responseData = await pool.query(queryOldData);

    let oldDataUpdate = responseData.rows[0];

    dataUpdate = {
        ...oldDataUpdate,
        ...dataUpdate
    }

    const query = `
        UPDATE student
        SET firstname = '${dataUpdate.firstname}',
            lastname = '${dataUpdate.lastname}',
            email = '${dataUpdate.email}',
            phone = '${dataUpdate.phone}'
        WHERE id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "updated successfully",
        student: {
            id,
            ...dataUpdate
        }
    });
}

export const deleteStudent: Handler = async (req, res) => {
    const { id } = req.params

    const query = `
        UPDATE student 
        SET status = false
        WHERE id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "deleted successfully",
    });
}

export const changeClassroom: Handler = async (req, res) => {
    const { id } = req.params;
    const { classroomId } = req.body;

    const query = `
        UPDATE classroomStudent
        SET classroomId = ${classroomId}
        WHERE studentId = ${id}
    `
    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "changed classroom successfully",
    });

}

