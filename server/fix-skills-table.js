const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixSkillsTable() {
    let connection;
    try {
        // Create connection
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });

        console.log('✓ Connected to database');

        // Check if category column exists
        const [columns] = await connection.query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = '${process.env.DB_NAME}' 
            AND TABLE_NAME = 'skills' 
            AND COLUMN_NAME = 'category'
        `);

        if (columns.length === 0) {
            console.log('Adding category column to skills table...');
            await connection.query(`
                ALTER TABLE skills 
                ADD COLUMN category VARCHAR(100) NOT NULL AFTER name
            `);
            console.log('✓ Category column added successfully');

            // Update existing records with a default category
            await connection.query(`
                UPDATE skills 
                SET category = 'General' 
                WHERE category IS NULL OR category = ''
            `);
            console.log('✓ Updated existing records with default category');
        } else {
            console.log('✓ Category column already exists');
        }

        // Check if level column exists
        const [levelColumns] = await connection.query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = '${process.env.DB_NAME}' 
            AND TABLE_NAME = 'skills' 
            AND COLUMN_NAME = 'level'
        `);

        if (levelColumns.length === 0) {
            console.log('Adding level column to skills table...');
            await connection.query(`
                ALTER TABLE skills 
                ADD COLUMN level INT NOT NULL DEFAULT 50 AFTER icon
            `);
            console.log('✓ Level column added successfully');
        } else {
            console.log('✓ Level column already exists');
        }

        // Show current table structure
        const [tableInfo] = await connection.query('DESCRIBE skills');
        console.log('\nCurrent skills table structure:');
        console.table(tableInfo);

        // Show current data
        const [skills] = await connection.query('SELECT * FROM skills LIMIT 5');
        console.log('\nCurrent skills data (first 5 rows):');
        console.table(skills);

        console.log('\n✅ Skills table fixed successfully!');

    } catch (error) {
        console.error('❌ Error fixing skills table:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

fixSkillsTable();
