import express from "express";
import { getJobs, searchJobs } from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs);

router.get("/search", searchJobs);

export default router;
