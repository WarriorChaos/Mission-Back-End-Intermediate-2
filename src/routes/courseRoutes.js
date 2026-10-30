const express = require('express');
const router = express.Router();
const courseService = require('../services/courseService');

// GET: Mengambil semua kursus
router.get('/', async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil data kursus' });
  }
});

// GET: Mengambil kursus berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Kursus tidak ditemukan' });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengambil data kursus' });
  }
});

// POST: Menambahkan kursus
router.post('/', async (req, res) => {
  try {
    const { slug, category_id, tutor_id, title, price_amount, status } = req.body;

    if (
      !slug ||
      !category_id ||
      !tutor_id ||
      !title ||
      price_amount === undefined ||
      !status
    ) {
      return res.status(400).json({
        message: 'Semua field wajib diisi',
      });
    }

    const course = await courseService.createCourse(req.body);
    res.status(201).json({
      message: 'Kursus berhasil ditambahkan',
      data: course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menambahkan kursus' });
  }
});

// PATCH: Mengubah kursus berdasarkan ID
router.patch('/:id', async (req, res) => {
  try {
    const existingCourse = await courseService.getCourseById(req.params.id);

    if (!existingCourse) {
      return res.status(404).json({ message: 'Kursus tidak ditemukan' });
    }

    const course = await courseService.updateCourse(req.params.id, req.body);

    res.status(200).json({
      message: 'Kursus berhasil diperbarui',
      data: course,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal memperbarui kursus' });
  }
});

// DELETE: Menghapus kursus berdasarkan ID
router.delete('/:id', async (req, res) => {
  try {
    const existingCourse = await courseService.getCourseById(req.params.id);

    if (!existingCourse) {
      return res.status(404).json({ message: 'Kursus tidak ditemukan' });
    }

    await courseService.deleteCourse(req.params.id);

    res.status(200).json({ message: 'Kursus berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal menghapus kursus' });
  }
});

module.exports = router;