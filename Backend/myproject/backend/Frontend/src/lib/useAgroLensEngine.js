import { useEffect, useState } from "react";
import { getWeather } from "./weatherService";
import { calculatePestRisk } from "./riskCalculator";

function getSeason() {
  const month = new Date().getMonth() + 1;

  if (month >= 4 && month <= 10) return "rainy";
  if (month >= 11 || month <= 2) return "dry";
  return "harmattan";
}

export function useAgroLensEngine(region, crop = "tomato") {
  const [weather, setWeather] = useState(null);
  const [pestRisks, setPestRisks] = useState(null);

  useEffect(() => {
    async function run() {
      if (!region?.coords) return;

      const w = await getWeather(
        region.coords.lat,
        region.coords.lon
      );

      setWeather(w);

      const risks = calculatePestRisk({
        weather: w,
        crop,
        season: getSeason(),
      });

      setPestRisks(risks);
    }

    run();
  }, [region, "mixed"]);

  return {
    weather,
    pestRisks,
    season: getSeason(),
    loading: !pestRisks,
  };
}