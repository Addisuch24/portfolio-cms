const pool = require("../config/db");

class SocialRepository {
  async getAll() {
    const [rows] = await pool.execute(
      `SELECT id, platform, url, icon, sort_order, created_at FROM social_links ORDER BY sort_order ASC`
    );
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.execute(
      `SELECT id, platform, url, icon, sort_order, created_at FROM social_links WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO social_links (platform, url, icon, sort_order) VALUES (?, ?, ?, ?)`,
      [data.platform, data.url, data.icon, data.sort_order || 0]
    );
    return result.insertId;
  }

  async update(id, data) {
    await pool.execute(
      `UPDATE social_links SET platform = ?, url = ?, icon = ?, sort_order = ? WHERE id = ?`,
      [data.platform, data.url, data.icon, data.sort_order || 0, id]
    );
  }

  async delete(id) {
    await pool.execute(`DELETE FROM social_links WHERE id = ?`, [id]);
  }
}

module.exports = new SocialRepository();
