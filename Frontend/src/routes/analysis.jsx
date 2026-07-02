import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/agrolens/AppShell";
import { CompatibilityRing } from "@/components/agrolens/CompatibilityRing";
import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { CROPS, ZONES, scoreLabel } from "@/lib/agrolens-data";
import { useCropDetail, getStaticCrop } from "@/lib/api";
import { CheckCircle2, AlertTriangle, XCircle, CalendarClock, Play, Bell, } from "lucide-react";
import { ProtectedRoute } from "./ProtectedRoute";

// const { user, regionId } = useUser();
// const { region } = useDerivedAgroLens(regionId);
export const Route = createFileRoute("/analysis")({
    head: () => ({
        meta: [
            { title: "Crop Analysis Engine — AGROLENS" },
            {
                name: "description",
                content: "Environmental compatibility scoring with rainfall, heat, and disease risk intelligence.",
            },
            { property: "og:title", content: "Crop Analysis Engine — AGROLENS" },
            { property: "og:description", content: "Decide what to plant where." },
        ],
    }),
    component: AnalysisPage,
});
function AnalysisPage() {
    const { crop, region } = useDerivedAgroLens();
    const apiZoneName = ZONES.find((z) => z.id === region.primaryZone)?.name ?? region.primaryZone;
    const { data: remote, isLoading } = useCropDetail(crop?.name ?? crop?.id, apiZoneName);
    if (!crop) {
        return (
          <ProtectedRoute>
        <AppShell>
        <div className="mx-auto max-w-md px-4 py-20 text-center">
          <h1 className="font-display text-2xl font-semibold">No crop selected</h1>
          <p className="mt-2 text-muted-foreground">Pick a crop to start the analysis.</p>
          <Link to="/crops" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-ag-green to-ag-cyan px-5 py-2.5 text-sm font-semibold text-[#0F172A]">
            Browse Crops
          </Link>
        </div>
      </AppShell>
      </ProtectedRoute>
      );
    }
    // Map zone id -> human name expected by backend, then load remote crop detail
    const detail = remote ?? getStaticCrop(crop.id) ?? crop;

    const zoneName = ZONES.find((z) => z.id === region.primaryZone).name;
    const score = detail.scores?.[region.primaryZone] ?? detail.scores?.[zoneName] ?? 0;
    const { label, tone } = scoreLabel(score);
    const toneColor = tone === "success" ? "var(--ag-green)" : tone === "warning" ? "var(--ag-amber)" : "var(--ag-red)";
    const diseaseRisk =
  detail.risks?.find((r) =>
    r.label.toLowerCase().includes("disease")
  ) ?? { level: "Low" };

const pestRisk =
  detail.risks?.find((r) =>
    r.label.toLowerCase().includes("pest")
  ) ?? { level: "Low" };

const rainfallMatch =
  score >= 8
    ? "Excellent"
    : score >= 6
    ? "Good"
    : score >= 4
    ? "Moderate"
    : "Poor";

const heatStress =
  score >= 8
    ? "Low"
    : score >= 6
    ? "Moderate"
    : "High";

const soilCompatibility =
  score >= 8
    ? "Excellent"
    : score >= 6
    ? "Good"
    : score >= 4
    ? "Fair"
    : "Poor";
    const reportRows = [
  {
    label: "Rainfall Match",
    value: rainfallMatch,
    color:
      score >= 8
        ? "var(--ag-green)"
        : score >= 6
        ? "var(--ag-green)"
        : score >= 4
        ? "var(--ag-amber)"
        : "var(--ag-red)",
  },
  {
    label: "Heat Stress",
    value: heatStress,
    color:
      heatStress === "Low"
        ? "var(--ag-green)"
        : heatStress === "Moderate"
        ? "var(--ag-amber)"
        : "var(--ag-red)",
  },
  {
    label: "Disease Risk",
    value: diseaseRisk.level,
    color:
      diseaseRisk.level === "High"
        ? "var(--ag-red)"
        : diseaseRisk.level === "Medium"
        ? "var(--ag-amber)"
        : "var(--ag-green)",
  },
  {
    label: "Pest Risk",
    value: pestRisk.level,
    color:
      pestRisk.level === "High"
        ? "var(--ag-red)"
        : pestRisk.level === "Medium"
        ? "var(--ag-amber)"
        : "var(--ag-green)",
  },
  {
    label: "Soil Compatibility",
    value: soilCompatibility,
    color:
      score >= 8
        ? "var(--ag-green)"
        : score >= 6
        ? "var(--ag-green)"
        : score >= 4
        ? "var(--ag-amber)"
        : "var(--ag-red)",
  },
];
    const alts = CROPS.filter((c) => c.id !== crop.id)
      .map((c) => ({ c, s: c.scores[region.primaryZone] }))
        .sort((a, b) => b.s - a.s)
        .slice(0, 3);
    const harvestDate = new Date(Date.now() + ((detail.growthDays ?? crop.growthDays) || 0) * 86400000);
    return (
    <ProtectedRoute>
    <AppShell>
      <div className="space-y-6 px-4 py-6 md:px-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-ag-cyan">
            Intelligence Report
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {detail.emoji || crop.emoji} {detail.name || crop.name} <span className="text-muted-foreground">·</span> {region.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {region.country} · {zoneName} zone · {region.season} season
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* LEFT — crop & ring */}
          <div className="space-y-4">
            <section className="surface-elevated overflow-hidden p-6">
              <div className="grid h-32 w-full place-items-center rounded-xl bg-gradient-to-br from-[color-mix(in_oklab,var(--ag-green)_25%,transparent)] to-[color-mix(in_oklab,var(--ag-cyan)_15%,transparent)] text-7xl">
                {detail.emoji || crop.emoji}
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold">{detail.name || crop.name}</h2>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
               {(detail.growthDays ?? crop.growthDays) >= 365
  ? `First harvest in ${Math.round(
      (detail.growthDays ?? crop.growthDays) / 365
    )} year${
      Math.round((detail.growthDays ?? crop.growthDays) / 365) > 1
        ? "s"
        : ""
    }`
  : `${detail.growthDays ?? crop.growthDays} day cycle`}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(detail.tags || crop.tags || []).map((t) => (<span key={t} className="rounded-full border border-border bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {t}
                  </span>))}
              </div>
            </section>

            <section className="surface-card p-6">
              <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Environmental Compatibility
              </p>
              <div className="mt-3 grid place-items-center">
                <CompatibilityRing score={score}/>
              </div>
              <p className="mt-3 text-center text-sm font-semibold" style={{ color: toneColor }}>
                {label}
              </p>
            </section>
          </div>

          {/* CENTER — Intelligence Report */}
          <div className="space-y-4">
            <section className="surface-elevated p-6">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-semibold">Suitability</h2>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-5xl font-bold" style={{ color: toneColor }}>
                    {score}.0
                  </span>
                  <span className="font-mono text-lg text-muted-foreground">/10</span>
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full" style={{ width: `${score * 10}%`, background: `linear-gradient(90deg, var(--ag-amber), ${toneColor})` }}/>
              </div>
              <dl className="mt-6 divide-y divide-border">
                {reportRows.map((r) => (<div key={r.label} className="flex items-center justify-between py-3">
                    <dt className="text-sm text-muted-foreground">{r.label}</dt>
                    <dd className="font-mono text-base font-semibold" style={{ color: r.color }}>
                      {r.value}
                    </dd>
                  </div>))}
              </dl>
            </section>

            <section className="surface-card p-5">
              <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Risk Vectors
              </h3>
              <ul className="space-y-2">
                {(detail.risks || []).map((r) => {
            const c = r.level === "High"
                ? "var(--ag-red)"
                : r.level === "Medium"
                    ? "var(--ag-amber)"
                    : "var(--ag-green)";
            const Icon = r.level === "High"
                ? XCircle
                : r.level === "Medium"
                    ? AlertTriangle
                    : CheckCircle2;
            return (<li key={r.label} className="flex items-start gap-3 rounded-lg border border-border bg-[color-mix(in_oklab,var(--surface-2)_60%,transparent)] p-3 text-sm" style={{ borderLeft: `3px solid ${c}` }}>
                      <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: c }}/>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{r.label}</span>
                          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: c }}>
                            {r.level}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{r.note}</p>
                      </div>
                    </li>);
        })}
              </ul>
            </section>
          </div>

          {/* RIGHT — Actions */}
          <div className="space-y-4">
            <section className="surface-elevated overflow-hidden p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ag-green">
                Action Plan
              </p>
              <a href="/start-planting">
              <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ag-green to-ag-cyan px-5 py-3 text-sm font-bold text-[#0F172A] transition hover:glow-green">
                <Play className="h-4 w-4"/>
                Start Planting
              </button>
              </a>
              <ul className="mt-4 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CalendarClock className="mt-0.5 h-4 w-4 text-ag-cyan"/>
                  <div>
                    <div className="font-medium">Projected harvest</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      {harvestDate.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
        })}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Bell className="mt-0.5 h-4 w-4 text-ag-amber"/>
                  <div>
                    <div className="font-medium">Auto-reminders</div>
                    <div className="font-mono text-xs text-muted-foreground">
                      Fertilizer · Scouting · Harvest
                    </div>
                  </div>
                </li>
              </ul>
            </section>

            <section className="surface-card p-5">
              <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Growth Tracker
              </h3>
              <ol className="relative space-y-3 border-l border-border pl-4">
                {["Sowing", "Vegetative", "Flowering", "Fruiting", "Harvest"].map((stage, i) => (<li key={stage} className="relative">
                    <span className="absolute -left-[1.4rem] top-1 grid h-4 w-4 place-items-center rounded-full" style={{
                background: i === 0 ? "var(--ag-green)" : "var(--surface-2)",
                border: `1px solid ${i === 0 ? "var(--ag-green)" : "var(--border)"}`,
            }}/>
                    <div className="text-sm font-medium">{stage}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Day {Math.round((i / 4) * (detail.growthDays ?? crop.growthDays))}
                    </div>
                  </li>))}
              </ol>
            </section>

            <section className="surface-card p-5">
              <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Alternatives
              </h3>
              <ul className="space-y-2">
                {alts.map(({ c, s }) => {
            const altTone = scoreLabel(s).tone;
            const color = altTone === "success" ? "var(--ag-green)" : altTone === "warning" ? "var(--ag-amber)" : "var(--ag-red)";
            return (<li key={c.id} className="flex items-center justify-between rounded-lg border border-border bg-[color-mix(in_oklab,var(--surface-2)_50%,transparent)] p-2.5">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <span>{c.emoji}</span>
                        {c.name}
                      </span>
                      <span className="font-mono text-sm font-bold" style={{ color }}>
                        {s}
                      </span>
                    </li>);
        })}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </AppShell>
    </ProtectedRoute>
  );
}
