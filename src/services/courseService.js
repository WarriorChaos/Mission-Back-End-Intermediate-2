const db = require('../config/database');

const getAllCourses = async () => {
  const [rows] = await db.query(`
    SELECT
      courses.*,
      course_categories.name AS category_name,
      tutors.name AS tutor_name
    FROM courses
    LEFT JOIN course_categories
      ON courses.category_id = course_categories.id
    LEFT JOIN tutors
      ON courses.tutor_id = tutors.id
    ORDER BY courses.id DESC
  `);

  return rows;
};

const getCourseById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM courses WHERE id = ?',
    [id]
  );

  return rows[0];
};

const createCourse = async (data) => {
  const { slug, category_id, tutor_id, title, price_amount, status } = data;

  const [result] = await db.query(
    `INSERT INTO courses
      (slug, category_id, tutor_id, title, price_amount, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [slug, category_id, tutor_id, title, price_amount, status]
  );

  return getCourseById(result.insertId);
};

const updateCourse = async (id, data) => {
  const allowedFields = [
    'slug',
    'category_id',
    'tutor_id',
    'title',
    'price_amount',
    'status',
  ];

  const fields = Object.keys(data).filter((key) =>
    allowedFields.includes(key)
  );

  if (fields.length === 0) {
    return getCourseById(id);
  }

  const values = fields.map((field) => data[field]);
  const setClause = fields.map((field) => `\`${field}\` = ?`).join(', ');

  const [result] = await db.query(
    `UPDATE courses SET ${setClause} WHERE id = ?`,
    [...values, id]
  );

  if (result.affectedRows === 0) {
    return getCourseById(id);
  }

  return getCourseById(id);
};

const deleteCourse = async (id) => {
  const [result] = await db.query(
    'DELETE FROM courses WHERE id = ?',
    [id]
  );

  return result.affectedRows > 0;
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};