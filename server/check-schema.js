require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkSchema() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });

        console.log('Checking profile table structure...\n');
        const [columns] = await connection.execute('DESCRIBE profile');
        console.table(columns);

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkSchema();
