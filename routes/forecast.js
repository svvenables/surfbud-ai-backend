import express from "express";
import { getAISurfReport } from "../services/openai.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { spot, day, time } = req.body;

    const report = await getAISurfReport(spot, day, time);
    res.json(report);

  } catch (err) {
    console.error("Forecast error:", err);
    res.status(500).json({ error: "AI forecast error" });
  }
});

export default router;
