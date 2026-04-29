import fetch from "node-fetch";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn("WARNING: OPENAI_API_KEY is not set");
}

export async function getAISurfReport() {
  const url = "https://api.openai.com/v1/chat/completions";

  const prompt = `
You are SurfBud AI, a surf forecaster for Porthmeor Beach, St Ives, Cornwall.

1. Go to Surfline and find the forecast for Porthmeor.
   - Extract: primary swell height (in ft or m) and primary swell period (in seconds).

2. Go to BBC Weather and find the forecast for St Ives (closest to Porthmeor).
   - Extract: wind speed and wind direction for the main surfable part of the day (e.g. morning).

3. Using those values, decide:
   - Wave size label: one of ["Flat", "Knee high", "Waist high", "Chest high", "Head high", "Overhead"].
   - Wind cleanliness label: one of ["Clean", "Fair", "Messy", "Blown out"].
   - Short human summary (1–2 sentences) describing how it will feel to surf a mid-length.

4. Consider:
   - Longer period + moderate height = more powerful, punchier waves.
   - Short period + small height = weak, gutless waves.
   - Offshore wind = clean; light cross-shore = okay; strong onshore = messy/blown out.

Return ONLY valid JSON in this exact shape:

{
  "spot": "Porthmeor",
  "swell": {
    "height": number,        // in feet if Surfline uses ft, or metres if m
    "period": number         // in seconds
  },
  "wind": {
    "speed": number,         // in mph or kph, whichever BBC shows
    "direction": "string"    // e.g. "SW", "N", "ESE"
  },
  "waveSizeLabel": "string",       // e.g. "Waist high"
  "windCleanliness": "string",     // e.g. "Clean"
  "summary": "string"              // short human description
}
  `;

  const body = {
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: "You are a precise surf forecasting assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.4
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();

  const content = data.choices?.[0]?.message?.content || "{}";

  try {
    return JSON.parse(content);
  } catch (e) {
    console.error("Failed to parse AI JSON:", content);
    throw new Error("AI returned invalid JSON");
  }
}
