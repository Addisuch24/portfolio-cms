// Simple database connection test
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
    try {
        console.log('Testing database connection...');
        console.log('DB_HOST:', process.env.DB_HOST);
        console.log('DB_USER:', process.env.DB_USER);
        console.log('DB_NAME:', process.env.DB_NAME);
        console.log('DB_PORT:', process.env.DB_PORT);
        
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });

        console.log('\n✓ Database connection successful!\n');

        // Test profile query
        console.log('Testing profile query...');
        const [profileRows] = await connection.execute('SELECT * FROM profile LIMIT 1');
        console.log('Profile data:', profileRows);

        // Test skills query
        console.log('\nTesting skills query...');
        const [skillRows] = await connection.execute('SELECT * FROM skills');
        console.log('Skills count:', skillRows.length);

        // Test projects query
        console.log('\nTesting projects query...');
        const [projectRows] = await connection.execute('SELECT * FROM projects');
        console.log('Projects count:', projectRows.length);

        // Test experiences query
        console.log('\nTesting experiences query...');
        const [expRows] = await connection.execute('SELECT * FROM experiences');
        console.log('Experiences count:', expRows.length);

        await connection.end();
        console.log('\n✓ All tests passed!\n');
        process.exit(0);
    } catch (error) {
        console.error('\n✗ Database connection failed!');
        console.error('Error:', error.message);
        console.error('Code:', error.code);
        console.error('Full error:', error);
        process.exit(1);
    }
}

testConnection();
