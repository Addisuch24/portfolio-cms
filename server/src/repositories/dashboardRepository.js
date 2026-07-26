const pool = require("../config/db");

class DashboardRepository {

    // Total Projects
    async getTotalProjects() {

        const sql = `
            SELECT COUNT(*) AS total
            FROM projects
        `;

        const [rows] = await pool.execute(sql);

        return rows[0].total;
    }

    // Total Skills
    async getTotalSkills() {

        const sql = `
            SELECT COUNT(*) AS total
            FROM skills
        `;

        const [rows] = await pool.execute(sql);

        return rows[0].total;
    }

    // Total Experiences
    async getTotalExperiences() {

        const sql = `
            SELECT COUNT(*) AS total
            FROM experiences
        `;

        const [rows] = await pool.execute(sql);

        return rows[0].total;
    }

    // Total Messages
    async getTotalMessages() {

        const sql = `
            SELECT COUNT(*) AS total
            FROM contacts
        `;

        const [rows] = await pool.execute(sql);

        return rows[0].total;
    }

    // Unread Messages
    async getUnreadMessages() {

        const sql = `
            SELECT COUNT(*) AS total
            FROM contacts
            WHERE is_read = false
        `;

        const [rows] = await pool.execute(sql);

        return rows[0].total;
    }

    // Latest Projects
    async getLatestProjects() {

        const sql = `
            SELECT
                id,
                title,
                image_url,
                created_at
            FROM projects
            ORDER BY created_at DESC
            LIMIT 5
        `;

        const [rows] = await pool.execute(sql);

        return rows;
    }

    // Latest Contacts
    async getLatestContacts() {

        const sql = `
            SELECT
                id,
                name,
                email,
                subject,
                created_at,
                is_read
            FROM contacts
            ORDER BY created_at DESC
            LIMIT 5
        `;

        const [rows] = await pool.execute(sql);

        return rows;
    }

}

module.exports = new DashboardRepository();