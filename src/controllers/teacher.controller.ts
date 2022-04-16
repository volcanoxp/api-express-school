import { pool } from "../db";
import { Handler } from 'express';
import { QueryResult } from 'pg';

export const getTeachers: Handler = async (req, res) => {

    const query = `
        SELECT
            T.id AS teacherId,
            firstname,
            lastname,
            email,
            phone
        FROM teacher AS T
        WHERE T.status = true
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "get successfully",
        data: response.rows
    });
}

export const getTeacher: Handler = async (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT
            T.id AS teacherId,
            firstname,
            lastname,
            email,
            phone
        FROM teacher AS T
        WHERE T.status = true
            AND T.id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "get successfully",
        teacher: response.rows[0]
    });
}

export const createTeacher: Handler = async (req, res) => {
    const { firstname, lastname, email, phone } = req.body;

    const query = `
        INSERT INTO teacher(
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

    return res.status(200).json({
        message: "added successfully",
        teacher: {
            id: response.rows[0].id,
            firstname,
            lastname,
            email,
            phone
        }
    });
}

export const updateTeachers: Handler = async (req, res) => {
    const { id } = req.params
    let dataUpdate = req.body;

    const queryOldData = `
        SELECT
        firstname,
        lastname,
        email,
        phone
        FROM teacher
        WHERE id = ${id}
    `
    const responseData = await pool.query(queryOldData);

    let oldDataUpdate = responseData.rows[0];

    dataUpdate = {
        ...oldDataUpdate,
        ...dataUpdate
    }

    const query = `
        UPDATE teacher
        SET firstname = '${dataUpdate.firstname}',
            lastname = '${dataUpdate.lastname}',
            email = '${dataUpdate.email}',
            phone = '${dataUpdate.phone}'
        WHERE id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "updated successfully",
        teacher: {
            id,
            ...dataUpdate
        }
    });
}


export const deleteTeachers: Handler = async (req, res) => {
    const { id } = req.params

    const query = `
        UPDATE teacher 
        SET status = false
        WHERE id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "deleted successfully",
    });
}

