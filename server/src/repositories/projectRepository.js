const pool = require("../config/db");

class ProjectRepository {

    // Create a new project
    async create(project) {

        const sql = `
            INSERT INTO projects (
                title,
                description,
                image_url,
                image_public_id,
                technologies,
                github_url,
                live_demo_url,
                status,
                display_order
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(sql, [
            project.title,
            project.description,
            project.image_url || null,
            project.image_public_id || null,
            project.technologies || null,
            project.github_url || null,
            project.live_demo_url || null,
            project.status || 'Draft',
            project.display_order != null ? project.display_order : 1
        ]);

        return result.insertId;
    }

    // Get all projects
    async findAll() {

        const sql = `
            SELECT *
            FROM projects
            ORDER BY display_order ASC, created_at DESC
        `;

        const [rows] = await pool.execute(sql);

        return rows;
    }

    // Get project by id
    async findById(id) {

        const sql = `
            SELECT *
            FROM projects
            WHERE id = ?
        `;

        const [rows] = await pool.execute(sql, [id]);

        return rows[0];
    }

    // Update project
    async update(id, project) {

        const sql = `
            UPDATE projects
            SET
                title = ?,
                description = ?,
                image_url = ?,
                image_public_id = ?,
                github_url = ?,
                live_demo_url = ?,
                technologies = ?,
                status = ?,
                display_order = ?
            WHERE id = ?
        `;

        await pool.execute(sql, [
            project.title,
            project.description,
            project.image_url || null,
            project.image_public_id || null,
            project.github_url || null,
            project.live_demo_url || null,
            project.technologies || null,
            project.status || 'Draft',
             project.display_order != null ? project.display_order : 1,
            id
        ]);
    }

    // Delete project
    async delete(id) {

        const sql = `
            DELETE FROM projects
            WHERE id = ?
        `;

        await pool.execute(sql, [id]);
    }
    // Get projects with filters
    async findWithFilters(filters) {

        let sql = `
            SELECT *
            FROM projects
            WHERE 1 = 1
        `;

        const values = [];
 

        sql += ` ORDER BY display_order ASC, created_at DESC`;

        const [rows] = await pool.execute(sql, values);

        return rows;
    }
    // Get projects with search keyword
    async findWithSearch(filters) {

        let sql = `
            SELECT *
            FROM projects
            WHERE 1 = 1
        `;

        const values = [];

        if (filters.search) {
            sql += `
                AND (
                    title LIKE ?
                    OR description LIKE ?
                    OR technologies LIKE ?
                )
            `;

            const keyword = `%${filters.search}%`;
            values.push(keyword, keyword, keyword);
        }

        sql += ` ORDER BY display_order ASC, created_at DESC`;

        const [rows] = await pool.execute(sql, values);

        return rows;
    }
    // Get projects with featured filter
    async findWithFeatured(filters) {
        let sql = `
            SELECT *
            FROM projects
            WHERE 1 = 1
        `;

        const values = [];
        sql += ` ORDER BY display_order ASC, created_at DESC`;

        const [rows] = await pool.execute(sql, values);

        return rows;
    }

    // Get projects with sorting
    async findWithSorting(filters) {
        let sql = `
            SELECT *
            FROM projects
            WHERE 1 = 1
        `;

        const values = [];

        const allowedSortFields = [
            "created_at",
            "title",
            "display_order"
        ];

        const sortField = allowedSortFields.includes(filters.sort)
            ? filters.sort
            : "display_order";

        const sortOrder =
            filters.order === "desc"
                ? "DESC"
                : "ASC";

        sql += `
            ORDER BY ${sortField} ${sortOrder}
        `;

        const [rows] = await pool.execute(sql, values);

        return rows;
    }
    // Get projects with pagination
    async findWithPagination(filters) {
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 10;
        const offset = (page - 1) * limit;

        let sql = `
            SELECT *
            FROM projects
            WHERE 1 = 1
        `;

        const values = [];

        sql += ` LIMIT ? OFFSET ?`;
        values.push(limit, offset);

        const [rows] = await pool.execute(sql, values);

        return rows;
    }
    // Count projects (with optional filters)
    async count(filters = {}) {
        let sql = `
            SELECT COUNT(*) AS total
            FROM projects
            WHERE 1 = 1
        `;

        const values = [];
 

        if (filters.search) {
            sql += ` AND (title LIKE ? OR description LIKE ? OR technologies LIKE ?)`;
            const keyword = `%${filters.search}%`;
            values.push(keyword, keyword, keyword);
        }

        const [rows] = await pool.execute(sql, values);

        return rows[0].total;
    }
    async updateProjectImage(id, imageUrl, publicId) {

    const sql = `
        UPDATE projects
        SET image_url = ?, image_public_id = ?
        WHERE id = ?
    `;

    const [result] = await pool.execute(sql, [
        imageUrl,
        publicId,
        id
    ]);

    return result;

}
}
module.exports = new ProjectRepository();