import fetch from "node-fetch";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function getAISurfReport(
  spot = "Porthmeor",
  day = "today",
  time = "morning"
) {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const url = "https://api.openai.com/v1/chat/completions";

  const prompt = `
You are SurfBud AI, a surf forecaster for ${spot}, Cornwall.

Forecast for ${day}, ${time} session.

IMPORTANT RULES:
- When extracting swell height and period from Surfline, ALWAYS round DOWN to whole numbers.
- Never exaggerate conditions.
- Always follow Steve’s cheat‑sheet bands.

1. Go to Surfline and check the forecast for ${spot} for ${day} ${time}.
   Extract:
   - primary swell height (ft or m)
   - primary swell period (seconds)
   Then ROUND BOTH DOWN to whole numbers.

2. Go to BBC Weather and check ${spot} or nearest town.
   Extract:
   - wind speed
   - wind direction

3. Classify wave size:
   - <1ft = Flat
   - 1–2ft = Knee high
   - 2–3ft = Waist high
   - 3–4ft = Chest high
   - 4–6ft = Head high
   - >6ft = Overhead

4. Classify wind cleanliness:
   - Offshore = Clean
   - Light cross‑shore = Fair
   - Onshore = Messy
   - Strong onshore = Blown out

Return ONLY valid JSON:

{
  "spot": "${spot}",
  "day": "${day}",
  "time": "${time}",
  "swell": { "height": number, "period": number },
  "wind": { "speed": number, "direction": "string" },
  "waveSizeLabel": "string",
  "windCleanliness": "string",
  "summary": "string"
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
  } catch (err) {
    console.error("AI JSON error:", content);
    throw new Error("AI returned invalid JSON");
  }
}
