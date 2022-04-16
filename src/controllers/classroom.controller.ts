import { pool } from "../db";
import { Handler } from 'express';
import { QueryResult } from 'pg';


export const getClassroooms: Handler = async (req, res) => {

    const query = `
        SELECT
            C.id AS classroomId,
            C.grade,
            C.section
        FROM classroom AS C
        WHERE C.status = true
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "get successfully",
        data: response.rows
    });
}


export const getClassrooom: Handler = async (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT
            C.id AS classroomId,
            C.grade,
            C.section
        FROM classroom AS C
        WHERE C.status = true
            AND C.id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "get successfully",
        classroom: response.rows[0]
    });
}

export const createClassrooom: Handler = async (req, res) => {
    const { grade, section, teacherId } = req.body;

    const query = `
        INSERT INTO classroom(
            grade,
            section)
        VALUES ('${grade}',
                '${section}')
        RETURNING id
    `;
    const response: QueryResult = await pool.query(query);
    const classroomId = response.rows[0].id;
    
    const queryBind = `
        INSERT INTO classroomTeacher(
            classroomId,
            teacherId)
        VALUES (${classroomId},
                ${teacherId})
    `
    const responseBind: QueryResult = await pool.query(queryBind);

    return res.status(200).json({
        message: "added successfully",
        classroom: {
            id: classroomId,
            grade,
            section,
        }
    });
}

export const updateClassrooom: Handler = async (req, res) => {
    const { id } = req.params
    let dataUpdate = req.body;

    const queryOldData = `
        SELECT
            grade,
            section
        FROM classroom
        WHERE id = ${id}
    `
    const responseData = await pool.query(queryOldData);

    let oldDataUpdate = responseData.rows[0];

    dataUpdate = {
        ...oldDataUpdate,
        ...dataUpdate
    }

    const query = `
        UPDATE classroom
        SET grade = '${dataUpdate.grade}',
            section = '${dataUpdate.section}'
        WHERE id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "updated successfully",
        classroom: {
            id,
            ...dataUpdate
        }
    });
}

export const deleteClassrooom: Handler = async (req, res) => {
    const { id } = req.params

    const query = `
        UPDATE classroom 
        SET status = false
        WHERE id = ${id}
    `;

    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "deleted successfully",
    });
}

export const changeTeacher: Handler = async (req, res) => {
    const { id } = req.params;
    const { teacherId } = req.body;

    const query = `
        UPDATE classroomTeacher
        SET teacherId = ${teacherId} 
        WHERE classroomId = ${id}
    `
    const response: QueryResult = await pool.query(query);

    return res.status(200).json({
        message: "changed teacher successfully",
    });

}