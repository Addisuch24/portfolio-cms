const app = require("./app");
const pool = require("./config/db");
const path = require("path");
const fs = require("fs/promises");
const PORT = process.env.PORT || 5000;

async function ensureContactsTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(150),
      subject VARCHAR(200),
      message TEXT,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await pool.execute(sql);
  console.log("✅ Contacts table exists or was created");
}

async function ensureSkillsSortOrderColumn() {
  const [skillTable] = await pool.execute(
    `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'skills'`,
    [process.env.DB_NAME]
  );

  if (skillTable.length === 0) {
    console.warn("⚠️ Skills table does not exist; skipping sort_order schema fix.");
    return;
  }

  const [columns] = await pool.execute(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'skills' AND COLUMN_NAME = 'sort_order'`,
    [process.env.DB_NAME]
  );

  if (columns.length === 0) {
    console.log("⚙️ Adding missing sort_order column to skills table...");
    await pool.execute(`ALTER TABLE skills ADD COLUMN sort_order INT DEFAULT 0 AFTER level`);
    console.log("✅ Added sort_order column to skills table");
  } else {
    console.log("✅ Skills table sort_order column exists");
  }
}

async function waitForDatabaseConnection() {
  const maxAttempts = 15;
  const delayMs = 2000;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const connection = await pool.getConnection();
      await connection.ping();
      connection.release();

      console.log(`✅ Database connected successfully on attempt ${attempt}`);
      return;
    } catch (error) {
      const message = error?.message || String(error);
      console.error(`❌ Database connection attempt ${attempt}/${maxAttempts} failed: ${message}`);

      if (attempt === maxAttempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}

async function ensureSkillsDescriptionColumn() {
  const [columns] = await pool.execute(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'skills' AND COLUMN_NAME = 'description'`,
    [process.env.DB_NAME]
  );

  if (columns.length === 0) {
    console.log("⚙️ Adding missing description column to skills table...");
    await pool.execute(`ALTER TABLE skills ADD COLUMN description TEXT DEFAULT NULL AFTER category`);
    console.log("✅ Added description column to skills table");
  } else {
    console.log("✅ Skills table description column exists");
  }
}

async function ensureSkillsStatusColumn() {
  const [columns] = await pool.execute(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'skills' AND COLUMN_NAME = 'status'`,
    [process.env.DB_NAME]
  );

  if (columns.length === 0) {
    console.log("⚙️ Adding missing status column to skills table...");
    await pool.execute(`ALTER TABLE skills ADD COLUMN status VARCHAR(20) DEFAULT 'Active' AFTER sort_order`);
    console.log("✅ Added status column to skills table");
  } else {
    console.log("✅ Skills table status column exists");
  }
}

async function startServer() {
  try {
    await waitForDatabaseConnection();
    await ensureContactsTable();
    await ensureSkillsSortOrderColumn();
    await ensureSkillsDescriptionColumn();
    await ensureSkillsStatusColumn();
  } catch (error) {
    console.error("❌ Database connection failed after retries:", error);
    console.warn("⚠️ Starting server without database connection. API routes that require the database will return errors until the database is available.");
  }
}

startServer().finally(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
