export default function buildCheatSheet(openMeteo) {
  const height = average(openMeteo.waveHeight);
  const wind = average(openMeteo.windSpeed);

  let sizeLabel = "";
  if (height < 0.5) sizeLabel = "Knee high";
  else if (height < 1.0) sizeLabel = "Waist high";
  else if (height < 1.5) sizeLabel = "Chest high";
  else sizeLabel = "Overhead";

  let windLabel = "";
  if (wind < 5) windLabel = "Light winds";
  else if (wind < 12) windLabel = "Manageable winds";
  else windLabel = "Windy";

  return {
    summary: `${sizeLabel}, ${windLabel}`,
    height,
    wind
  };
}

function average(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
