import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get all applications (Admin)
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT a.*, j.title as job_title 
      FROM applications a 
      LEFT JOIN jobs j ON a.job_id = j.id 
      ORDER BY a.applied_at DESC
    `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit an application
router.post('/', async (req, res) => {
    try {
        const { job_id, name, email, phone, resume_path, message } = req.body;
        const [result] = await pool.query(
            'INSERT INTO applications (job_id, name, email, phone, resume_path, message) VALUES (?, ?, ?, ?, ?, ?)',
            [job_id, name, email, phone, resume_path, message]
        );
        res.status(201).json({ id: result.insertId, message: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update application status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await pool.query('UPDATE applications SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
