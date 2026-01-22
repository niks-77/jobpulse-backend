import axios from "axios";

const REMOTE_OK_URL = "https://remoteok.com/api"

const fetchJobs = async () => {
    try {
        const response = await axios.get(REMOTE_OK_URL, {
            headers: {
                "User-Agent": "jobPulse bot"
            }
        })
        return response.data.slice(1)
    }
    catch (error) {
        console.error("Error fetching jobs:", error)
        return []
    }
}

export default fetchJobs
