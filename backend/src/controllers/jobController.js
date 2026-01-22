import db from '../db/database.js';


const getJobs = (req, res) => {

    const query = `SELECT * FROM jobs ORDER BY score DESC, created_at DESC LIMIT 50`;

    // execute query and return the matching rows as an array

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch jobs' });
        }

        res.json(rows);
    });
};


const searchJobs = (req, res) => {
    const q = req.query.q?.toLowerCase() || "";
    const query = `
    SELECT *
    FROM jobs
    WHERE LOWER(title) LIKE ? OR LOWER(company) LIKE ?
    ORDER BY score DESC, created_at DESC
    LIMIT 50
  `;

    db.all(query, [`%${q}%`, `%${q}%`], (err, rows) => {
        if (err) {
            console.error("❌ DB error:", err.message);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(rows);
    });
};

export { getJobs, searchJobs };
