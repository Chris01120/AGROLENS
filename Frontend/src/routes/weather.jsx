import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/agrolens/AppShell";

import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { useAgroLensEngine } from "@/lib/useAgroLensEngine";
import { useWeather } from "@/lib/useWeather";
import { getCurrentUser } from "@/lib/auth";

import {
  CloudRain,
  Droplets,
  Sun,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/weather")({
  component: WeatherPage,
});

function WeatherPage() {
  // ✅ correct auth (SSR safe)
  const user = getCurrentUser();

  // ✅ correct store usage
  const { region } = useDerivedAgroLens();

  const { pestRisks, season } = useAgroLensEngine(region, "mixed");

  const weather = useWeather(region);

  const HOURS = Array.from({ length: 12 }, (_, i) => i + 6);

  const TEMP = weather.temp || [];
  const HUM = weather.humidity || [];
  const RAIN = weather.rain || [];

  const isRainy =
    season === "Rainy" || season === "Early Rains";

  const W = 800;
  const H = 200;

  const padX = 30;
  const padY = 20;

  const innerW = W - padX * 2;
  const innerH = H - padY * 2;

  const stepX = innerW / Math.max(TEMP.length - 1, 1);

  const tMin = Math.min(...TEMP, 20) - 2;
  const tMax = Math.max(...TEMP, 30) + 2;

  const tempPath = TEMP.map((t, i) => {
    const x = padX + i * stepX;
    const y =
      padY +
      innerH -
      ((t - tMin) / (tMax - tMin)) * innerH;

    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");

  const dominantRisk = pestRisks
    ? Object.entries(pestRisks).sort((a, b) => b[1] - a[1])[0]?.[0]
    : null;

  return (
    <AppShell>
      <div className="space-y-6 px-4 py-6 md:px-8">

        {/* HEADER */}
        <section className="surface-elevated p-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ag-cyan">
            {region?.name || "Unknown"} · {season}
          </p>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-mono text-7xl font-bold">
              {weather.loading ? "--" : weather.currentTemp}
            </span>
            <span>°C</span>
          </div>

          <p className="mt-2">
            {isRainy ? "Rain Expected" : "Warm Conditions"}
          </p>

          <div className="grid grid-cols-3 gap-3 mt-5">
            <div className="glass p-3 text-center">
              <Droplets className="mx-auto h-4" />
              {weather.currentHumidity}%
            </div>

            <div className="glass p-3 text-center">
              <CloudRain className="mx-auto h-4" />
              {Math.round(RAIN.reduce((a, b) => a + b, 0) * 10)}%
            </div>

            <div className="glass p-3 text-center">
              <Sun className="mx-auto h-4" />
              {isRainy ? 5 : 8}
            </div>
          </div>
        </section>

        {/* HOURLY */}
        <section className="surface-card p-6">

          <h2 className="font-display text-lg font-semibold">
            Hourly Forecast
          </h2>

          <svg viewBox={`0 0 ${W} ${H + 50}`} className="mt-5 w-full">

            {RAIN.map((r, i) => {
              const x = padX + i * stepX;
              const h = r * innerH;

              return (
                <rect
                  key={i}
                  x={x - 10}
                  y={padY + innerH - h}
                  width="20"
                  height={h}
                  rx="4"
                  fill="var(--ag-cyan)"
                  opacity=".35"
                />
              );
            })}

            <path
              d={tempPath}
              fill="none"
              stroke="var(--ag-amber)"
              strokeWidth="3"
            />
          </svg>
        </section>

        {/* IMPACT */}
        <section className="surface-card p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-ag-red" />
            <h3>Crop Impact</h3>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {dominantRisk === "fungal"
              ? "Humidity may increase fungal pressure."
              : dominantRisk === "insect"
              ? "Conditions support higher insect activity."
              : "Conditions relatively stable."}
          </p>
        </section>

      </div>
    </AppShell>
  );
}