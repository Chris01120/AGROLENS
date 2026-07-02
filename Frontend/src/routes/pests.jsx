import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/agrolens/AppShell";
import { PestRadar } from "@/components/agrolens/PestRadar";
import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { useAgroLensEngine } from "@/lib/useAgroLensEngine";
import { AlertOctagon, Droplets, SprayCan, Ruler, Shield } from "lucide-react";

// const { user, regionId } = useUser();
// const { region } = useDerivedAgroLens(regionId);

export const Route = createFileRoute("/pests")({
  head: () => ({
    meta: [
      { title: "Pest Risk Radar — AGROLENS" },
      { name: "description", content: "Real-time pest and disease risk analysis for your crops and region." },
      { property: "og:title", content: "Pest Risk Radar — AGROLENS" },
      { property: "og:description", content: "Disease pressure forecasting for West African farms." },
    ],
  }),
  component: PestsPage,
});

function PestsPage() {
  const { region } = useDerivedAgroLens();

  // ✅ hook MUST be inside component
  const { pestRisks, season } = useAgroLensEngine(region, "tomato");

  // safety fallback (prevents crashes before data loads)
  const RISKS = [
    { label: "Fungal", value: pestRisks?.fungal || 0 },
    { label: "Insect", value: pestRisks?.insect || 0 },
    { label: "Viral", value: pestRisks?.viral || 0 },
    { label: "Soil", value: 4 },
  ];

  const RECS = [
    {
      icon: Droplets,
      title: "Reduce Irrigation",
      body: "Cut overhead watering at dusk to limit fungal spore germination.",
      color: "var(--ag-cyan)",
    },
    {
      icon: SprayCan,
      title: "Preventive Spray",
      body: "Apply copper-based fungicide on tomato canopy within 48h.",
      color: "var(--ag-amber)",
    },
    {
      icon: Ruler,
      title: "Wider Spacing",
      body: "Increase row spacing to 60cm to improve airflow on next planting.",
      color: "var(--ag-green)",
    },
    {
      icon: Shield,
      title: "Field Scouting",
      body: "Inspect 20 plants per acre daily — flag yellow spotting immediately.",
      color: "var(--ag-red)",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-6 px-4 py-6 md:px-8">

        {/* Alert banner */}
        <section
          className="relative overflow-hidden rounded-2xl border p-6 md:p-8"
          style={{
            borderColor: "color-mix(in oklab, var(--ag-red) 50%, transparent)",
            background:
              "radial-gradient(circle at 0% 0%, color-mix(in oklab, var(--ag-red) 25%, transparent), transparent 60%), color-mix(in oklab, var(--ag-red) 8%, var(--surface-1))",
          }}
        >
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-20" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-1 grid h-3 w-3 place-items-center rounded-full bg-ag-red animate-pulse-dot" />

              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ag-red">
                  Critical Alert · {region?.name || "Unknown Region"}
                </p>

                <h1 className="mt-1 font-display text-2xl font-bold text-foreground md:text-3xl">
                  HIGH FUNGAL RISK DETECTED
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  Season: {season} · Tomato & cocoa crops affected
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Severity", value: "9.1" },
                { label: "Spread", value: "62%" },
                { label: "Window", value: "48h" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-xl px-3 py-2 text-center"
                >
                  <div className="font-mono text-lg font-bold text-ag-red">
                    {s.value}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Radar */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <section className="surface-elevated grid place-items-center p-6">
            <div>
              <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Pest Risk Radar · {season}
              </p>

              <div className="mt-2">
                <PestRadar risks={RISKS} />
              </div>
            </div>
          </section>

          <section className="surface-card p-6">
            <h2 className="font-display text-lg font-semibold">
              Active Threat Vectors
            </h2>

            <p className="text-xs text-muted-foreground">
              Probability-weighted disease pressure for your region
            </p>

            <ul className="mt-4 space-y-3">
              {RISKS.sort((a, b) => b.value - a.value).map((r) => {
                const color =
                  r.value >= 8
                    ? "var(--ag-red)"
                    : r.value >= 6
                    ? "var(--ag-amber)"
                    : "var(--ag-green)";

                return (
                  <li
                    key={r.label}
                    className="rounded-lg border border-border bg-[color-mix(in_oklab,var(--surface-2)_60%,transparent)] p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 font-medium">
                        <AlertOctagon className="h-4 w-4" style={{ color }} />
                        {r.label} Disease
                      </span>

                      <span
                        className="font-mono text-sm font-bold"
                        style={{ color }}
                      >
                        {r.value}/10
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${r.value * 10}%`,
                          background: color,
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        {/* Recommendations */}
        <section>
          <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Prevention Protocol
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {RECS.map((r) => {
              const Icon = r.icon;

              return (
                <div
                  key={r.title}
                  className="surface-card p-5 transition hover:-translate-y-0.5"
                  style={{ borderTop: `3px solid ${r.color}` }}
                >
                  <Icon className="h-5 w-5" style={{ color: r.color }} />
                  <h3 className="mt-3 font-display text-base font-semibold">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {r.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AppShell>
  );
}