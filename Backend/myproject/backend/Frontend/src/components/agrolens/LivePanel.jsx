import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { useAgroLensEngine } from "@/lib/useAgroLensEngine";
import {
  CloudRain,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

const MARKET = [
  { name: "Tomato", emoji: "🍅", price: "₦ 1,400/kg" },
  { name: "Maize", emoji: "🌽", price: "₦ 480/kg" },
  { name: "Cassava", emoji: "🌱", price: "₦ 350/kg" },
];

export function LivePanel() {
  const { region } = useDerivedAgroLens();

  // 🌍 engine connection
  const { pestRisks, season } = useAgroLensEngine(region, "mixed");

  // 🧠 derive top risk safely
  const topRisk = pestRisks
    ? Object.entries(pestRisks).sort((a, b) => b[1] - a[1])[0]
    : null;

  const riskType = topRisk?.[0] || "fungal";
  const riskValue = topRisk?.[1] || 0;

  const isHigh = riskValue >= 7;

  const riskLabel =
    riskType === "fungal"
      ? "Fungal"
      : riskType === "insect"
      ? "Insect"
      : "Viral";

  const titleText = `${isHigh ? "High" : ""} ${riskLabel} Risk`;

  const insight =
    riskType === "fungal"
      ? "Conditions favor fungal outbreak risk"
      : riskType === "insect"
      ? "Pest activity increasing under current conditions"
      : "Virus transmission risk elevated in current environment";

  return (
    <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 overflow-y-auto border-l border-border bg-[color-mix(in_oklab,var(--surface-1)_70%,transparent)] backdrop-blur-xl xl:block">
      <div className="space-y-4 p-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Live Field Intel
          </span>

          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-ag-green">
            <span className="h-1.5 w-1.5 rounded-full bg-ag-green animate-glow-pulse" />
            LIVE
          </span>
        </div>

        {/* Weather */}
        <Link
          to="/weather"
          className="surface-elevated relative block overflow-hidden p-4 transition hover:glow-cyan"
        >
          <div className="absolute inset-0 -z-0 bg-gradient-to-br from-[color-mix(in_oklab,var(--ag-cyan)_18%,transparent)] to-transparent animate-gradient-shift" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <CloudRain className="h-3 w-3 text-ag-cyan" />
                Weather · {region?.name || "Region"}
              </span>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-4xl font-bold text-foreground">
                26°
              </span>
              <span className="text-xs text-muted-foreground">C · Humid</span>
            </div>

            <p className="mt-1 text-xs text-ag-cyan">
              Heavy rainfall expected
            </p>
          </div>
        </Link>

        {/* Pest alert (NOW LIVE) */}
        <Link
          to="/pests"
          className="surface-card relative block overflow-hidden p-4 transition hover:border-ag-red"
          style={{ borderLeft: "3px solid var(--ag-red)" }}
        >
          <div className="flex items-start gap-2">
            <span className="mt-1 grid h-2 w-2 place-items-center rounded-full bg-ag-red animate-pulse-dot" />

            <div>
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ag-red">
                <AlertTriangle className="h-3 w-3" />
                {titleText}
              </p>

              <p className="mt-1 text-sm font-semibold text-foreground">
                {region?.name || "Region"} · {season || "Season"}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {insight}
              </p>
            </div>
          </div>
        </Link>

        {/* Market */}
        <Link
          to="/markets"
          className="surface-card block p-4 transition hover:border-ag-green"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <Activity className="h-3 w-3 text-ag-green" />
              Market Pulse
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              24h
            </span>
          </div>

          <ul className="space-y-2">
            {MARKET.map((m) => (
              <li
                key={m.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-1.5">
                  <span>{m.emoji}</span>
                  <span className="font-medium text-foreground">
                    {m.name}
                  </span>
                </span>

                <span className="font-mono text-xs text-muted-foreground">
                  {m.price}
                </span>
              </li>
            ))}
          </ul>
        </Link>

        {/* Season note (unchanged logic, still fine) */}
        <div className="rounded-xl border border-dashed border-border p-3 text-xs text-muted-foreground">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ag-amber">
            {region?.season || "Unknown Season"}
          </span>

          <p className="mt-1">
            {(() => {
              const season = region?.season;

              if (!season) {
                return "No climate data available for advisory generation.";
              }

              if (season === "Rainy") {
                return "High humidity environment — fungal diseases more likely. Improve airflow and reduce overhead irrigation.";
              }

              if (season === "Harmattan") {
                return "Dry dusty winds increase plant stress and pest mobility.";
              }

              if (season === "Early Rains") {
                return "Strong planting window — monitor early fungal outbreaks.";
              }

              if (season === "Dry") {
                return "Low moisture reduces fungal risk but increases insect pressure.";
              }

              return "General monitoring advised.";
            })()}
          </p>
        </div>
      </div>
    </aside>
  );
}