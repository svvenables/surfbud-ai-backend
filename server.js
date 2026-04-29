import express from "express";
import cors from "cors";
import forecastRouter from "./routes/forecast.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SurfBud AI backend is running");
});

app.use("/forecast", forecastRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`SurfBud AI backend running on port ${port}`);
});
