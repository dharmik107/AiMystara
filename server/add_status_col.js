import pool from './config/db.js';

async function migrate() {
    try {
        console.log('Adding status column to applications table...');
        await pool.query("ALTER TABLE applications ADD COLUMN status ENUM('New', 'Reviewed', 'Shortlisted', 'Rejected') DEFAULT 'New'");
        console.log('Migration successful');
        process.exit(0);
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('Column already exists');
        } else {
            console.error('Migration failed:', err);
        }
        process.exit(1);
    }
}

migrate();
