import express from "express";
import { getAISurfReport } from "../services/ai.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const report = await getAISurfReport();
    res.json(report);
  } catch (err) {
    console.error("Forecast error:", err);
    res.status(500).json({ error: "AI forecast error" });
  }
});

export default router;
