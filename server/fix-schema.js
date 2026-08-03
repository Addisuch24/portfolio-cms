require('dotenv').config();
const mysql = require('mysql2/promise');

async function fixSchema() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });

        console.log('Adding missing columns to profile table...\n');
        
        // Add profile_image_public_id column
        await connection.execute(`
            ALTER TABLE profile 
            ADD COLUMN IF NOT EXISTS profile_image_public_id VARCHAR(255) AFTER profile_image
        `);
        console.log('✓ Added profile_image_public_id column');
        
        // Add resume_public_id column
        await connection.execute(`
            ALTER TABLE profile 
            ADD COLUMN IF NOT EXISTS resume_public_id VARCHAR(255) AFTER resume_url
        `);
        console.log('✓ Added resume_public_id column');

        // Check projects table for image_public_id
        console.log('\nChecking projects table...');
        const [projectCols] = await connection.execute('DESCRIBE projects');
        const hasImagePublicId = projectCols.some(col => col.Field === 'image_public_id');
        
        if (!hasImagePublicId) {
            await connection.execute(`
                ALTER TABLE projects 
                ADD COLUMN image_public_id VARCHAR(255) AFTER image_url
            `);
            console.log('✓ Added image_public_id column to projects table');
        } else {
            console.log('✓ projects table already has image_public_id column');
        }

        console.log('\n✓ Schema fixed successfully!\n');

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

fixSchema();
