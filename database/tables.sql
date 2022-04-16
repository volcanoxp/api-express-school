CREATE TABLE course(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    status BOOLEAN DEFAULT true
);

CREATE TABLE teacher(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(255),
    status BOOLEAN DEFAULT true
);

CREATE TABLE classroom(
    id SERIAL PRIMARY KEY,
    grade VARCHAR(255) NOT NULL,
    section VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT true
);

CREATE TABLE student(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(255),
    status BOOLEAN DEFAULT true    
);

CREATE TABLE classroomStudent(
    classroomId INTEGER NOT NULL,
    studentId INTEGER NOT NULL,

    CONSTRAINT fk_classroomId FOREIGN KEY (classroomId) REFERENCES classroom(id),    
    CONSTRAINT fk_studentId FOREIGN KEY (studentId) REFERENCES student(id)     
);

CREATE TABLE classroomTeacher(
    teacherId INTEGER NOT NULL,
    classroomId INTEGER NOT NULL,

    CONSTRAINT fk_classroomId FOREIGN KEY (classroomId) REFERENCES classroom(id),
    CONSTRAINT fk_teacherId FOREIGN KEY (teacherId) REFERENCES teacher(id)    
);

CREATE TABLE note(
    studentId INTEGER NOT NULL,
    courseId INTEGER NOT NULL,
    created_at timestamp without time zone  NOT NULL DEFAULT NOW(),
    updated_at timestamp without time zone,

    note1 INTEGER,
    note2 INTEGER,
    note3 INTEGER,
    note4 INTEGER,

    CONSTRAINT fk_studentId FOREIGN KEY (studentId) REFERENCES student(id),
    CONSTRAINT fk_courseId FOREIGN KEY (courseId) REFERENCES course(id)
);


INSERT INTO course(name)
VALUES
('Personal Social'),
('Educación Física'),
('Arte y Cultura'),
('Comunicación'),
('Inglés'),
('Matemática'),
('Ciencia y Tecnología'),
('Educación Religiosa');


CREATE OR REPLACE FUNCTION add_name_course()
   RETURNS TRIGGER 
AS $$
DECLARE
    f record;
BEGIN
    FOR f in SELECT id FROM course
        WHERE status = true
    LOOP
        INSERT INTO note(studentId, courseId)
        VALUES (NEW.id,f.id);
    END LOOP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE TRIGGER t_add_name_course
AFTER INSERT
ON student
FOR EACH ROW
EXECUTE PROCEDURE add_name_course();