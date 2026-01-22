import "dotenv/config";
import "./scheduler.js";
import express from "express";
import jobRouter from "./routes/jobRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/jobs", jobRouter);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
