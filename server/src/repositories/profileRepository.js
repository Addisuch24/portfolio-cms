const pool = require("../config/db");

class ProfileRepository {

    // Get the profile information
    async getProfile() {

        const sql = `
            SELECT
                full_name,
                profession AS title,
                bio AS about,
                profile_image,
                profile_image_public_id,
                resume_url,
                resume_public_id
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

        const profile = await this.getProfile();
        if (!profile) {
            return null;
        }

        const sql = `
            UPDATE profile
            SET
                full_name = ?,
                profession = ?,
                bio = ?
            WHERE id = ?
        `;

        const id = data.id ?? profile.id ?? 1;
        const full_name = data.full_name ?? profile.full_name ?? null;
        const profession =
            data.profession ??
            data.title ??
            profile.profession ??
            profile.title ??
            null;
        const bio =
            data.bio ??
            data.about ??
            profile.bio ??
            profile.about ??
            null;

        const [result] = await pool.execute(sql, [
            full_name,
            profession,
            bio,
            id
        ]);

        return result;
    }

    // Update profile image
    async updateProfileImage(id, imageUrl, publicId) {

        const sql = `
            UPDATE profile
            SET
                profile_image = ?,
                profile_image_public_id = ?
            WHERE id = ?
        `;

        const [result] = await pool.execute(sql, [
            imageUrl,
            publicId,
            id
        ]);

        return result;
    }

    // Update resume
    async updateResume(id, resumeUrl, publicId) {

        const sql = `
            UPDATE profile
            SET
                resume_url = ?,
                resume_public_id = ?
            WHERE id = ?
        `;

        const [result] = await pool.execute(sql, [
            resumeUrl,
            publicId,
            id
        ]);

        return result;
    }

}

module.exports = new ProfileRepository();