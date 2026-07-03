import { CROP_PEST_RULES } from "./pestKnowledgeBase";

function clamp(value, min = 0, max = 10) {
  return Math.max(min, Math.min(max, value));
}

export function calculatePestRisk({ weather, crop = "mixed", season }) {
  const rules = CROP_PEST_RULES[crop] || {};

  let fungal = 0;
  let insect = 0;
  let viral = 0;

  // 🌧 fungal logic (crop-aware if available)
  if (rules.fungal) {
    const humidityThreshold = rules.fungal.humidity ?? 75;

    if (weather.humidity >= humidityThreshold) {
      fungal += 4;
    }

    const [minT, maxT] = rules.fungal.tempRange ?? [18, 30];

    if (weather.temp >= minT && weather.temp <= maxT) {
      fungal += 3;
    }

    if (rules.fungal.seasonBoost?.includes(season)) {
      fungal += 2;
    }
  }

  // 🐛 insect logic (weather-driven, slightly crop-modifiable later)
  if (weather.temp > 27) insect += 3;
  if (weather.humidity < 60) insect += 2;

  // 🌧 seasonal insect boost (important missing piece)
  if (season === "dry") insect += 1;

  // 🦠 viral logic (environment-driven)
  if (season === "rainy" && weather.humidity > 80) {
    viral += 3;
  }

  // 🌍 general environmental pressure boost
  if (weather.wind > 5) insect += 1;

  return {
    fungal: clamp(fungal),
    insect: clamp(insect),
    viral: clamp(viral),
  };
}