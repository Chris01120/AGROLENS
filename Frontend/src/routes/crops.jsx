import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/agrolens/AppShell";
import { CROPS, scoreLabel, ZONES } from "@/lib/agrolens-data";
import { useCropIntelligence, useCropList } from "@/lib/api";
import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { Search, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
// const { user, regionId } = useUser();
// const { region } = useDerivedAgroLens(regionId);
export const Route = createFileRoute("/crops")({
    head: () => ({
        meta: [
            { title: "Crop Search — AGROLENS" },
            { name: "description", content: "Browse crops with growth cycles, soil needs, and zone suitability." },
            { property: "og:title", content: "Crop Search — AGROLENS" },
            { property: "og:description", content: "Discover crops that fit your region." },
        ],
    }),
    component: CropsPage,
});
function normalizeCropId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function CropsPage() {
    const { setCropId, region } = useDerivedAgroLens();
    const navigate = useNavigate();
    const [q, setQ] = useState("");
    const zoneName = ZONES.find((z) => z.id === region.primaryZone)?.name ?? region.primaryZone;
    const { data: remote } = useCropList();
    console.log(remote);
    const { data: intelligence } = useCropIntelligence(zoneName);
    const intelligenceScores = useMemo(() => new Map(Object.entries(intelligence?.scores ?? {}).map(([crop, score]) => [crop.toLowerCase(), score])), [intelligence]);
    const crops = remote
        ? remote.map((crop) => {
            const local = CROPS.find((c) => c.id === crop.id || c.name.toLowerCase() === crop.name.toLowerCase());
            const id = local ? local.id : normalizeCropId(crop.name || String(crop.id));
            const merged = local
                ? { ...local, ...crop, id, backendId: crop.id, growthDays: local.growthDays ?? crop.growth_duration_days }
                : { ...crop, id, backendId: crop.id, emoji: crop.emoji ?? "🌱", growthDays: crop.growth_duration_days ?? 0 };
            return {
                ...merged,
                scoreOverride: merged.scores?.[region.primaryZone] ?? merged.scores?.[zoneName] ?? intelligenceScores.get(merged.name.toLowerCase()),
            };
        })
        : CROPS;
    const filtered = crops.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
    const handleSelect = (id, override = null) => {
        setCropId(id, override);
        navigate({ to: "/analysis" });
    };
    return (<AppShell>
      <div className="space-y-6 px-4 py-6 md:px-8">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Crop Search</h1>
          <p className="text-sm text-muted-foreground">
            Pick a crop to analyze its fit for {region.name}, {region.country}.
          </p>
        </div>

        <div className="surface-elevated p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ag-cyan"/>
            <input value={q} onChange={(e) => setQ(e.target.value)} autoFocus placeholder="Search crops (Tomato, Cassava, Sorghum…)" className="w-full rounded-xl border border-transparent bg-transparent py-4 pl-12 pr-4 text-lg focus:outline-none"/>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
             const score = c.scores?.[region.primaryZone] ?? 0;

    console.log(
      "Crop:",
      c.name,
      "Zone:",
      region.primaryZone,
      "Score:",
      score,
      "Scores:",
      c.scores
    );

    const { label, tone } = scoreLabel(score);
            const color = tone === "success" ? "var(--ag-green)" : tone === "warning" ? "var(--ag-amber)" : "var(--ag-red)";
            const tags = c.tags ?? [];
            return (<button key={c.id} onClick={() => handleSelect(c.id, c)} className="surface-card group relative flex flex-col gap-3 overflow-hidden p-5 text-left transition hover:-translate-y-0.5" style={{ borderTop: `2px solid ${color}` }}>
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl text-3xl" style={{
                    background: `radial-gradient(circle, color-mix(in oklab, ${color} 25%, transparent), transparent 70%), var(--surface-2)`,
                }}>
                    {c.emoji ?? "🌱"}
                  </span>
                  <span className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#0F172A]" style={{ backgroundColor: color }}>
                    {score}/10
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{c.name}</h3>
                  <p className="font-mono text-xs text-muted-foreground">{c.growthDays ?? c.growth_duration_days ?? "?"} day cycle</p>
                </div>
                <p className="text-xs" style={{ color }}>
                  {label} in {region.primaryZone.replace("-", " ")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.slice(0, 2).map((t) => (<span key={t} className="rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {t}
                    </span>))}
                </div>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold" style={{ color }}>
                  Analyze
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"/>
                </span>
              </button>);
        })}
        </div>

        {filtered.length === 0 && (<p className="mt-12 text-center text-sm text-muted-foreground">No crops match "{q}".</p>)}
      </div>
    </AppShell>);
}
