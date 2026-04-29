import express from "express";
import getOpenMeteoForecast from "../services/openmeteo.js";
import getMetOfficeForecast from "../services/metoffice.js";
import buildCheatSheet from "../utils/cheatsheet.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "lat and lon are required" });
    }

    const [openMeteo, metOffice] = await Promise.all([
      getOpenMeteoForecast(lat, lon),
      getMetOfficeForecast(lat, lon)
    ]);

    const cheatSheet = buildCheatSheet(openMeteo);

    res.json({
      openMeteo,
      metOffice,
      cheatSheet
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Forecast error" });
  }
});

export default router;
