const pool = require("../config/db");

class ContactRepository {

    async create(data) {

        const sql = `
            INSERT INTO contacts
            (
                name,
                email,
                subject,
                message
            )
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await pool.execute(sql, [
            data.name,
            data.email,
            data.subject,
            data.message
        ]);

        return result.insertId;
    }

    async getAll() {

        const sql = `
            SELECT *
            FROM contacts
            ORDER BY created_at DESC
        `;

        const [rows] = await pool.execute(sql);

        return rows;
    }

    async getById(id) {

        const sql = `
            SELECT *
            FROM contacts
            WHERE id = ?
        `;

        const [rows] = await pool.execute(sql, [id]);

        return rows[0];
    }

    async markAsRead(id) {

        const sql = `
            UPDATE contacts
            SET is_read = TRUE
            WHERE id = ?
        `;

        await pool.execute(sql, [id]);
    }

    async delete(id) {

        const sql = `
            DELETE FROM contacts
            WHERE id = ?
        `;

        await pool.execute(sql, [id]);
    }

}

module.exports = new ContactRepository();