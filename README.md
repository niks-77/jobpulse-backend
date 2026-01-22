# JobPulse Backend

JobPulse is a backend service that collects remote job postings, normalizes and scores them, stores them in a SQLite database, and exposes them via a REST API.

The goal of this project is to demonstrate backend fundamentals such as API design, database interaction, background jobs, and clean project structure.

---

## Features

- Fetches remote job postings from RemoteOK
- Normalizes external API data into a consistent schema
- Scores jobs based on keyword relevance
- Stores jobs in a SQLite database
- Prevents duplicate job entries
- Exposes REST API endpoints for retrieving and searching jobs

---

## Tech Stack

- **Node.js**
- **Express**
- **SQLite**
- **node-cron** (scheduler)
