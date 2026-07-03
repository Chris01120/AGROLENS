import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/agrolens/AppShell";
import { CROPS, ZONES } from "@/lib/agrolens-data";
import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { getCurrentUser } from "@/lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/zones")({
  head: () => ({
    meta: [
      { title: "Zone Explorer — AGROLENS" },
      {
        name: "description",
        content: "Explore West African climate zones and crops.",
      },
    ],
  }),
  component: ZonesPage,
});

const ZONE_DATA = {
  "humid-forest": {
    rainfall: "1500–2500mm",
    humidity: "75–95%",
    soil: "Ferralsols, acidic loam",
  },
  savanna: {
    rainfall: "800–1400mm",
    humidity: "40–70%",
    soil: "Loamy, fertile",
  },
  coastal: {
    rainfall: "1200–1800mm",
    humidity: "70–85%",
    soil: "Sandy loam",
  },
  "semi-arid": {
    rainfall: "300–700mm",
    humidity: "20–45%",
    soil: "Dry sandy soils",
  },
};

const ZONE_ACCENT = {
  "humid-forest": "var(--ag-green)",
  savanna: "var(--ag-amber)",
  coastal: "var(--ag-cyan)",
  "semi-arid": "var(--ag-red)",
};

function ZonesPage() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const { setCropId, setZoneOverride } = useDerivedAgroLens();

  const [activeZone, setActiveZone] = useState("savanna");

  const zone = ZONES.find((z) => z.id === activeZone);
  const data = ZONE_DATA[activeZone];
  const accent = ZONE_ACCENT[activeZone];

  // safety check (prevents crashes)
  if (!zone || !data) return <div>Zone data missing</div>;

  const grouped = { high: [], medium: [], low: [] };

  CROPS.forEach((c) => {
    const score = c.scores?.[activeZone] ?? 0;

    if (score >= 8) grouped.high.push(c);
    else if (score >= 6) grouped.medium.push(c);
    else grouped.low.push(c);
  });

  function analyze(id) {
    setCropId(id);
    setZoneOverride(activeZone);
    navigate({ to: "/analysis" });
  }

  return (
    <AppShell>
      <div className="space-y-6 px-4 py-6 md:px-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold">Zone Explorer</h1>

          <p className="text-sm text-muted-foreground">
            Welcome {user?.firstName || "Farmer"} — Explore climate zones.
          </p>
        </div>

        {/* ZONES */}
        <div className="grid gap-3 md:grid-cols-4">
          {ZONES.map((z) => {
            const active = z.id === activeZone;
            const color = ZONE_ACCENT[z.id];

            return (
              <button
                key={z.id}
                onClick={() => setActiveZone(z.id)}
                className="surface-card p-5 text-left"
                style={{
                  borderColor: active ? color : undefined,
                  boxShadow: active ? `0 0 20px ${color}` : undefined,
                }}
              >
                <div className="text-3xl">{z.emoji}</div>
                <div className="mt-2 font-semibold">{z.name}</div>
                <p className="text-xs text-muted-foreground">
                  {z.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* DETAILS + CROPS */}
        <section className="grid gap-4 lg:grid-cols-[1fr_2fr] ">

          {/* LEFT PANEL */}
          <div
            className="surface-card p-5 h-65"
            style={{ borderTop: `3px solid ${accent}` }}
          >
            <h2 className="text-xl font-semibold">
              {zone.emoji} {zone.name}
            </h2>

            <p className="mt-2 text-sm">{zone.description}</p>

            <div className="mt-5 space-y-3">
              <p>Rainfall: {data.rainfall}</p>
              <p>Humidity: {data.humidity}</p>
              <p>Soil: {data.soil}</p>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-4">
            {["high", "medium", "low"].map((tier) => {
              const items = grouped[tier];
              if (!items.length) return null;

              const color =
                tier === "high"
                  ? "var(--ag-green)"
                  : tier === "medium"
                  ? "var(--ag-amber)"
                  : "var(--ag-red)";

              return (
                <div key={tier} className="surface-card p-5">
                  <h3 className="mb-4 font-semibold" style={{ color }}>
                    {tier.toUpperCase()} SUITABILITY
                  </h3>

                  <div className="grid gap-2 md:grid-cols-3">
                    {items.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => analyze(c.id)}
                        className="rounded-lg border p-3 text-left"
                      >
                        <div>
                          {c.emoji} {c.name}
                        </div>
                        <div style={{ color }}>
                          Score: {c.scores?.[activeZone]}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </section>
      </div>
    </AppShell>
  );
}