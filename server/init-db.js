import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initDB() {
    let connection;
    try {
        // Create connection without database first to check/create DB
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        console.log(`Checking if database '${process.env.DB_NAME}' exists...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        console.log(`Database '${process.env.DB_NAME}' ensured.`);

        await connection.end();

        // Import pool after DB is ensured
        const pool = (await import('./config/db.js')).default;

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Split queries by semicolon and filter empty ones
        const queries = schema.split(';').filter(q => q.trim());

        console.log('Running schema migration...');
        for (const query of queries) {
            if (query.trim()) {
                await pool.query(query);
            }
        }

        console.log('Database initialized successfully.');
        process.exit(0);

    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

initDB();
