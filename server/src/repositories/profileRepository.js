const pool = require("../config/db");

class ProfileRepository {

    // Get the profile information
    async getProfile() {

        const sql = `
            SELECT *
            FROM profile
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql);

        return rows[0];
    }

    // Get all social media links
    async getSocialLinks() {

        const sql = `
            SELECT
                platform,
                url,
                icon
            FROM social_links
            ORDER BY id ASC
        `;

        const [rows] = await pool.execute(sql);

        return rows;
    }

    // Update profile information
    async updateProfile(data) {

        const sql = `
            UPDATE profile
            SET
                full_name = ?,
                profession = ?,
                bio = ?
            WHERE id = ?
        `;

        const [result] = await pool.execute(sql, [
            data.full_name,
            data.profession,
            data.bio,
            data.id
        ]);

        return result;
    }

    // Update profile image
    async updateProfileImage(id, imageUrl) {

        const sql = `
            UPDATE profile
            SET
                profile_image = ?
            WHERE id = ?
        `;

        const [result] = await pool.execute(sql, [
            imageUrl,
            id
        ]);

        return result;
    }

}

module.exports = new ProfileRepository();