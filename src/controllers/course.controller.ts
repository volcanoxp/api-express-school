import { pool } from "../db";
import { Handler } from 'express';
import { QueryResult } from 'pg';

export const getCourses: Handler = async (req, res) => {

    const query = `
        SELECT
            C.id AS courseId,
            name 
        FROM course AS C
        WHERE C.status = true
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "get successfully",
        data: response.rows
    });
}

export const getCourse: Handler = async (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT
            C.id AS courseId,
            name
        FROM course AS C
        WHERE C.status = true
            AND C.id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "get successfully",
        data: response.rows[0]
    });
}

export const newCourse: Handler = async (req, res) => {
    const { name } = req.body

    const query = `
        INSERT INTO course(name)
        VALUES ('${name}')
        RETURNING id
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(201).json({
        message: "created successfully",
        course: {
            id: response.rows[0].id,
            name,
        }
    });
}


export const updateCourse: Handler = async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const query = `
        UPDATE course
        SET name = '${name}'
        WHERE id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(201).json({
        message: "update successfully",
        course: {
            id, 
            name,
        }
    });
}


export const deleteCourse: Handler = async (req, res) => {
    const { id } = req.params

    const query = `
        UPDATE course
        SET status = false
        WHERE id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(201).json({
        message: "delete successfully",
    });
}

