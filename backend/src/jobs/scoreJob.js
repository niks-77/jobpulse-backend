import dotenv from "dotenv"
dotenv.config()

const keywords = process.env.KEYWORDS ? process.env.KEYWORDS.split(",") : [];

/**
 * Assign a score to job based on how many keywords match
 * @param {Object} job - normalized job object
 * @returns {number} score
 */

const scoreJob = (job) => {
    let score = 0

    const text = (job.title + "" + job.description).toLowerCase()

    keywords.forEach(keyword => {
        if (text.includes(keyword.toLowerCase())) {
            score += 1
        }
    })

    return score
}

export default scoreJob
