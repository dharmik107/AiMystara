import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get all contact submissions (Admin)
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contacts ORDER BY submitted_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const [result] = await pool.query(
            'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name, email, subject, message]
        );
        res.status(201).json({ id: result.insertId, message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
