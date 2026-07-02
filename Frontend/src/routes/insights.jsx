import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/agrolens/AppShell";
import { CROPS, ZONES } from "@/lib/agrolens-data";
import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { useAgroLensEngine } from "@/lib/useAgroLensEngine";
import { AlertOctagon, Cloud, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";

// const { user, regionId } = useUser();
// const { region } = useDerivedAgroLens(regionId);

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — AGROLENS" },
      { name: "description", content: "Seasonal alerts, planting windows and risk warnings across West Africa." },
      { property: "og:title", content: "Insights — AGROLENS" },
      { property: "og:description", content: "Seasonal intelligence and warnings for farmers." },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const { region } = useDerivedAgroLens();

  const { pestRisks, season } = useAgroLensEngine(region, "mixed");

  const planting = CROPS
    .filter((c) => c.bestSeason.includes(season))
    .slice(0, 6);

  // -----------------------------
  // 🧠 derive top risk dynamically
  // -----------------------------
  const topRisk = pestRisks
    ? Object.entries(pestRisks).sort((a, b) => b[1] - a[1])[0]
    : null;

  const riskType = topRisk?.[0] || "fungal";
  const riskValue = topRisk?.[1] || 0;

  const riskLabel =
    riskType === "fungal"
      ? "Fungal"
      : riskType === "insect"
      ? "Insect"
      : "Viral";

  const isHigh = riskValue >= 7;

  const riskText =
    riskType === "fungal"
      ? "Fungal disease pressure elevated due to humidity and moisture conditions."
      : riskType === "insect"
      ? "Insect activity increasing with current temperature patterns."
      : "Viral transmission risk elevated under environmental stress conditions.";

  // -----------------------------
  // 🌦 dynamic seasonal insight
  // -----------------------------
  const seasonalInsight = (() => {
    if (season === "Rainy") {
      return "Heavy rainfall increases fungal and soil-borne disease pressure across humid zones.";
    }
    if (season === "Harmattan") {
      return "Dry dusty winds increase plant stress and reduce photosynthetic efficiency.";
    }
    if (season === "Early Rains") {
      return "Optimal moisture conditions for germination but early fungal risks emerging.";
    }
    if (season === "Dry") {
      return "Low moisture reduces fungal risk but increases insect pressure.";
    }
    return "Stable conditions — standard monitoring recommended.";
  })();

  return (
    <AppShell>
      <div className="space-y-6 px-4 py-6 md:px-8">

        {/* HEADER */}
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Insights
          </h1>
          <p className="text-sm text-muted-foreground">
            Live seasonal intelligence — {season} season · {region.name}, {region.country}.
          </p>
        </div>

        {/* ALERTS + RISKS */}
        <section className="grid gap-4 lg:grid-cols-2">

          {/* Seasonal Alerts (NOW DYNAMIC) */}
          <div className="surface-card p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <Cloud className="h-4 w-4 text-ag-cyan" />
              Seasonal Alerts
            </h2>

            <ul className="space-y-2">
              <li className="rounded-lg border border-border p-3 text-sm"
                  style={{
                    borderLeft: "3px solid var(--ag-amber)"
                  }}>
                {seasonalInsight}
              </li>
            </ul>
          </div>

          {/* Risk Warnings (NOW ENGINE DRIVEN) */}
          <div className="surface-card p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <AlertOctagon className="h-4 w-4 text-ag-red" />
              Risk Warnings
            </h2>

            <ul className="space-y-2">
              <li
                className="rounded-lg border border-border p-3 text-sm"
                style={{
                  borderLeft: `3px solid ${
                    isHigh ? "var(--ag-red)" : "var(--ag-amber)"
                  }`,
                }}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-semibold text-foreground">
                    {riskLabel}
                  </span>

                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#0F172A]"
                    style={{
                      backgroundColor: isHigh
                        ? "var(--ag-red)"
                        : "var(--ag-amber)",
                    }}
                  >
                    {isHigh ? "High" : "Medium"}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">{riskText}</p>
              </li>
            </ul>
          </div>
        </section>

        {/* PLANTING WINDOW (kept same logic, slightly corrected) */}
        <section className="surface-card p-5">
          <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Calendar className="h-4 w-4 text-ag-green" />
            Best Planting Periods — {season}
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {planting.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No prime planting matches this season — consult Zone Explorer for alternatives.
              </p>
            )}

            {planting.map((c) => (
              <div
                key={c.id}
                className="rounded-lg border border-border bg-[color-mix(in_oklab,var(--surface-2)_60%,transparent)] p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-base font-semibold">
                      {c.emoji} {c.name}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {c.growthDays}d cycle
                    </p>
                  </div>

                  <span className="rounded-full bg-[color-mix(in_oklab,var(--ag-green)_18%,transparent)] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-ag-green">
                    Plant now
                  </span>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {c.planting}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ZONES (unchanged UI, already fine) */}
        <section className="surface-card p-5">
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Zone Conditions Today
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ZONES.map((z) => (
              <div
                key={z.id}
                className="rounded-lg border border-border bg-[color-mix(in_oklab,var(--surface-2)_60%,transparent)] p-3"
              >
                <div className="text-2xl">{z.emoji}</div>
                <div className="font-display text-sm font-semibold">
                  {z.name}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {z.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="surface-card mt-6 p-5">
  <h3 className="mb-2 font-semibold">Account</h3>

  <p className="mb-4 text-sm text-muted-foreground">
    View your profile, account information and settings.
  </p>

  <Link
    to="/account"
    className="inline-flex items-center gap-2 rounded-lg bg-ag-cyan px-4 py-2 font-medium text-black"
  >
    <User className="h-4 w-4" />
    Open Account
  </Link>
</div>
      </div>
    </AppShell>
  );
}