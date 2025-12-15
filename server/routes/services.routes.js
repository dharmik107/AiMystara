import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Get all public services
router.get('/public', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM services WHERE status = "active"');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all services (Admin)
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM services');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a service
router.post('/', async (req, res) => {
    try {
        const { title, short_desc, full_desc, icon, status } = req.body;
        const [result] = await pool.query(
            'INSERT INTO services (title, short_desc, full_desc, icon, status) VALUES (?, ?, ?, ?, ?)',
            [title, short_desc, full_desc, icon, status || 'active']
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a service
router.put('/:id', async (req, res) => {
    try {
        const { title, short_desc, full_desc, icon, status } = req.body;
        await pool.query(
            'UPDATE services SET title = ?, short_desc = ?, full_desc = ?, icon = ?, status = ? WHERE id = ?',
            [title, short_desc, full_desc, icon, status, req.params.id]
        );
        res.json({ message: 'Service updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a service
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM services WHERE id = ?', [req.params.id]);
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
