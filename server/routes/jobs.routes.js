import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get all open jobs (Public)
router.get('/public', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM jobs WHERE status = "Open"');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all jobs (Admin)
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM jobs');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a job
router.post('/', async (req, res) => {
    try {
        const { title, department, location, type, description, requirements, status } = req.body;
        const [result] = await pool.query(
            'INSERT INTO jobs (title, department, location, type, description, requirements, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, department, location, type, description, requirements, status || 'Open']
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a job
router.put('/:id', async (req, res) => {
    try {
        const { title, department, location, type, description, requirements, status } = req.body;
        await pool.query(
            'UPDATE jobs SET title = ?, department = ?, location = ?, type = ?, description = ?, requirements = ?, status = ? WHERE id = ?',
            [title, department, location, type, description, requirements, status, req.params.id]
        );
        res.json({ message: 'Job updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a job
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM jobs WHERE id = ?', [req.params.id]);
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
