const pool = require("../config/db");


class PublicRepository {


    async getProfile(){

        const sql = `
            SELECT
                full_name,
                profession,
                bio,
                profile_image,
                resume_url
            FROM profile
            LIMIT 1
        `;


        const [rows] = await pool.execute(sql);

        return rows[0];

    }



  async getProjects() {

    const sql = `
        SELECT
            id,
            title,
            description,
            technologies,
            image_url,
            github_url,
            live_demo_url,
            status,
            display_order
        FROM projects
        ORDER BY created_at DESC
    `;

    const [rows] = await pool.execute(sql);

    return rows;
}



    async getSkills(){

        const sql = `
            SELECT
                id,
                name,
                category,
                icon
            FROM skills
            ORDER BY sort_order ASC
        `;


        const [rows] = await pool.execute(sql);

        return rows;

    }




    async getExperiences(){

        const sql = `
            SELECT *
            FROM experiences
            ORDER BY start_date DESC
        `;


        const [rows] = await pool.execute(sql);

        return rows;

    }




    async getSocialLinks(){

        const sql = `
            SELECT
                platform,
                url,
                icon
            FROM social_links
            ORDER BY sort_order ASC
        `;


        const [rows] = await pool.execute(sql);

        return rows;

    }


}


module.exports = new PublicRepository();