const pool = require("../config/db");

class SkillRepository{

    async getAll(){

        const sql=`
        SELECT *
        FROM skills
        ORDER BY sort_order ASC
        `;

        const [rows]=await pool.execute(sql);

        return rows;

    }

    async getById(id){

        const sql=`
        SELECT *
        FROM skills
        WHERE id=?
        `;

        const [rows]=await pool.execute(sql,[id]);

        return rows[0];

    }

    async create(data){

        const sql=`

        INSERT INTO skills(

        name,

        category,

        icon,

        level,

        sort_order

        )

        VALUES(?,?,?,?,?)

        `;

        const [result]=await pool.execute(sql,[

            data.name,

            data.category,

            data.icon,

            data.level,

            data.sort_order

        ]);

        return result.insertId;

    }

    async update(id,data){

        const sql=`

        UPDATE skills

        SET

        name=?,

        category=?,

        icon=?,

        level=?,

        sort_order=?

        WHERE id=?

        `;

        await pool.execute(sql,[

            data.name,

            data.category,

            data.icon,

            data.level,

            data.sort_order,

            id

        ]);

    }

    async delete(id){

        const sql=`

        DELETE FROM skills

        WHERE id=?

        `;

        await pool.execute(sql,[id]);

    }

}

module.exports=new SkillRepository();