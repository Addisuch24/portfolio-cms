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

        description,

        icon,

        level,

        sort_order,

        status

        )

        VALUES(?,?,?,?,?,?,?)

        `;

        const name = data.name ?? "";
        const category = data.category ?? "General";
        const description = data.description ?? null;
        const icon = data.icon ?? null;
        const level = (typeof data.level === 'number') ? data.level : (data.level != null ? parseInt(data.level, 10) : 50);
        const sort_order = (typeof data.sort_order === 'number') ? data.sort_order : (data.sort_order != null ? data.sort_order : 0);
        const status = data.status ?? "Active";

        const [result]=await pool.execute(sql,[

            name,

            category,

            description,

            icon,

            level,

            sort_order,

            status

        ]);

        return result.insertId;

    }

    async update(id,data){

        const sql=`

        UPDATE skills

        SET

        name=?,

        category=?,

        description=?,

        icon=?,

        level=?,

        sort_order=?,

        status=?

        WHERE id=?

        `;

        const name = data.name ?? "";
        const category = data.category ?? "General";
        const description = data.description ?? null;
        const icon = data.icon ?? null;
        const level = (typeof data.level === 'number') ? data.level : (data.level != null ? parseInt(data.level, 10) : 50);
        const sort_order = (typeof data.sort_order === 'number') ? data.sort_order : (data.sort_order != null ? data.sort_order : 0);
        const status = data.status ?? "Active";

        await pool.execute(sql,[

            name,

            category,

            description,

            icon,

            level,

            sort_order,

            status,

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