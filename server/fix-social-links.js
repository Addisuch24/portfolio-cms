const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixSocialLinksTable() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });

        console.log('✓ Connected to database');

        // Check if sort_order column exists in social_links
        const [columns] = await connection.query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = '${process.env.DB_NAME}' 
            AND TABLE_NAME = 'social_links' 
            AND COLUMN_NAME = 'sort_order'
        `);

        if (columns.length === 0) {
            console.log('Adding sort_order column to social_links table...');
            await connection.query(`
                ALTER TABLE social_links 
                ADD COLUMN sort_order INT DEFAULT 0 AFTER icon
            `);
            console.log('✓ sort_order column added successfully');
        } else {
            console.log('✓ sort_order column already exists');
        }

        // Show table structure
        const [tableInfo] = await connection.query('DESCRIBE social_links');
        console.log('\nCurrent social_links table structure:');
        console.table(tableInfo);

        // Show current data
        const [links] = await connection.query('SELECT * FROM social_links');
        console.log('\nCurrent social_links data:');
        console.table(links);

        console.log('\n✅ Social links table fixed successfully!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

fixSocialLinksTable();
