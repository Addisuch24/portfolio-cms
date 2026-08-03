const mysql = require('mysql2/promise');
require('dotenv').config();

async function cleanupDuplicates() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });

        console.log('✓ Connected to database\n');

        // Clean up duplicate skills - keep only the first entry of each name
        console.log('Cleaning up duplicate skills...');
        await connection.query(`
            DELETE s1 FROM skills s1
            INNER JOIN skills s2 
            WHERE s1.id > s2.id 
            AND s1.name = s2.name
        `);
        
        const [skills] = await connection.query('SELECT COUNT(*) as count FROM skills');
        console.log(`✓ Skills cleaned up. Remaining: ${skills[0].count} records\n`);

        // Clean up duplicate social_links
        console.log('Cleaning up duplicate social links...');
        await connection.query(`
            DELETE s1 FROM social_links s1
            INNER JOIN social_links s2 
            WHERE s1.id > s2.id 
            AND s1.platform = s2.platform 
            AND s1.url = s2.url
        `);
        
        const [links] = await connection.query('SELECT COUNT(*) as count FROM social_links');
        console.log(`✓ Social links cleaned up. Remaining: ${links[0].count} records\n`);

        // Clean up duplicate projects
        console.log('Cleaning up duplicate projects...');
        await connection.query(`
            DELETE p1 FROM projects p1
            INNER JOIN projects p2 
            WHERE p1.id > p2.id 
            AND p1.title = p2.title
        `);
        
        const [projects] = await connection.query('SELECT COUNT(*) as count FROM projects');
        console.log(`✓ Projects cleaned up. Remaining: ${projects[0].count} records\n`);

        // Update skill levels with proper values
        console.log('Updating skill levels...');
        await connection.query(`
            UPDATE skills 
            SET level = CASE 
                WHEN name = 'JavaScript' THEN 90
                WHEN name = 'React' THEN 85
                WHEN name = 'Node.js' THEN 80
                WHEN name = 'Express' THEN 85
                WHEN name = 'MySQL' THEN 75
                ELSE 70
            END,
            category = CASE 
                WHEN name IN ('JavaScript', 'React', 'HTML', 'CSS') THEN 'Frontend'
                WHEN name IN ('Node.js', 'Express', 'Python') THEN 'Backend'
                WHEN name IN ('MySQL', 'MongoDB', 'PostgreSQL') THEN 'Database'
                ELSE 'Other'
            END
        `);
        console.log('✓ Skill levels and categories updated\n');

        // Show current data
        const [currentSkills] = await connection.query('SELECT * FROM skills ORDER BY display_order');
        console.log('Current skills:');
        console.table(currentSkills);

        const [currentLinks] = await connection.query('SELECT * FROM social_links ORDER BY sort_order');
        console.log('\nCurrent social links:');
        console.table(currentLinks);

        console.log('\n✅ Database cleanup completed successfully!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

cleanupDuplicates();
