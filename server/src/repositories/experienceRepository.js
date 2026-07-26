const pool = require("../config/db");

class ExperienceRepository {

    async getAll() {

        const sql = `
            SELECT *
            FROM experiences
            ORDER BY start_date DESC
        `;

        const [rows] = await pool.execute(sql);

        return rows;
    }

    async getById(id) {

        const sql = `
            SELECT *
            FROM experiences
            WHERE id=?
        `;

        const [rows] = await pool.execute(sql,[id]);

        return rows[0];
    }

    async create(data){

        const sql=`

        INSERT INTO experiences(

        company,

        position,

        location,

        employment_type,

        start_date,

        end_date,

        is_current,

        description,

        technologies

        )

        VALUES(?,?,?,?,?,?,?,?,?)

        `;

        const [result]=await pool.execute(sql,[

            data.company,

            data.position,

            data.location,

            data.employment_type,

            data.start_date,

            data.end_date,

            data.is_current,

            data.description,

            data.technologies

        ]);

        return result.insertId;

    }

    async update(id,data){

        const sql=`

        UPDATE experiences

        SET

        company=?,

        position=?,

        location=?,

        employment_type=?,

        start_date=?,

        end_date=?,

        is_current=?,

        description=?,

        technologies=?

        WHERE id=?

        `;

        await pool.execute(sql,[

            data.company,

            data.position,

            data.location,

            data.employment_type,

            data.start_date,

            data.end_date,

            data.is_current,

            data.description,

            data.technologies,

            id

        ]);

    }

    async delete(id){

        await pool.execute(

            "DELETE FROM experiences WHERE id=?",

            [id]

        );

    }

}

module.exports=new ExperienceRepository();