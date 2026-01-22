import crypto from "crypto"

/** 
 * Normalize job info  from the api for the database
 * @param {Object} job - The job object to normalize
 * @returns {Object} The normalized job object
*/

const normalizeJob = (job) => {

    const id = job.id || null
    const title = job.title || job.position || "Uknown"
    const company = job.company || "Uknown"
    const location = job.location || "Uknown"
    const description = job.description || "Uknown"
    const url = job.url || "Uknown"
    const salary = job.salary || "Uknown"
    const posted_at = job.date || "Uknown"

    const hash = crypto.
        createHash("sha256")
        .update(title + company + location)
        .digest("hex")

    return {
        id,
        title,
        company,
        location,
        description,
        url,
        salary,
        posted_at,
        hash
    }
}

export default normalizeJob