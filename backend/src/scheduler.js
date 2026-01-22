// src/scheduler.js
import cron from "node-cron";
import fetchJobs from "./jobs/fetchJobs.js";
import normalizeJob from "./jobs/normalizeJob.js";
import scoreJob from "./jobs/scoreJob.js";
import db from "./db/database.js";

// Function to insert a normalized job into SQLite
const insertJob = (job) => {
    const { title, company, location, url, source, posted_at, hash, score } = job;

    const stmt = `
    INSERT OR IGNORE INTO jobs
    (title, company, location, url, source, posted_at, hash, score)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.run(stmt, [title, company, location, url, source, posted_at, hash, score], function (err) {
        if (err) {
            console.error("❌ Error inserting job:", err.message);
        } else if (this.changes > 0) {
            console.log(`✨ New Job added: ${title} at ${company}`);
        }
    });
};

// Scheduler task — runs every 5 minutes
cron.schedule("*/5 * * * *", async () => {
    console.log("Fetching jobs from RemoteOK...");

    try {
        const rawJobs = await fetchJobs();

        rawJobs.forEach((rawJob) => {
            const job = normalizeJob(rawJob);
            job.score = scoreJob(job);
            insertJob(job);
        });

        console.log(`✅ Completed fetch: ${rawJobs.length} jobs processed.`);
    } catch (err) {
        console.error("❌ Failed to fetch jobs:", err.message);
    }
});

console.log("Scheduler started, fetching jobs every 5 minutes.");
