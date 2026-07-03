import { CROPS, scoreLabel, ZONES } from "@/lib/agrolens-data";
import { TrendingUp, Calendar, AlertOctagon } from "lucide-react";
import { useCropIntelligence } from "@/lib/api";

export function BottomInsights({ region, zoneId, onCropSelect, }) {
  const zoneName = ZONES.find((z) => z.id === zoneId)?.name ?? zoneId;
  const { data: intel } = useCropIntelligence(zoneName);
  const bestCrops = intel?.ranking
    ? intel.ranking.map((r) => ({ c: CROPS.find((x) => x.name === r.crop) || { id: r.crop, name: r.crop, emoji: "🌱" }, score: r.score }))
    : [...CROPS].map((c) => ({ c, score: c.scores[zoneId] ?? c.scores[ZONES.find((z) => z.id === zoneId)?.name] ?? 0 })).sort((a, b) => b.score - a.score).slice(0, 5);
    const seasonalTips = {
        Rainy: ["Ensure drainage to prevent waterlogging", "Apply fungicide preventively", "Mulch to reduce erosion"],
        Dry: ["Irrigate at dawn or dusk", "Mulch to retain soil moisture", "Choose drought-tolerant varieties"],
        Harmattan: ["Protect seedlings from dust", "Watch for thrips and mites", "Increase irrigation frequency"],
        "Early Rains": ["Prepare beds now for optimal planting", "Apply base fertilizer", "Sow short-cycle crops first"],
    };
    const alerts = [
        { tone: "danger", text: "High fungal pressure ongoing in humid zones" },
        { tone: "warning", text: "Drought stress expected in Semi-Arid through next 30 days" },
        { tone: "warning", text: "Bird pressure rising for cereals at grain-fill stage" },
    ];
    return (<section className="grid gap-4 lg:grid-cols-3">
      <div className="surface-card p-5">
        <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-primary"/>
          Best Crops for This Region
        </h3>
        <ul className="space-y-1.5">
          {bestCrops.map(({ c, score }) => {
            const { tone } = scoreLabel(score);
            const color = tone === "success"
                ? "var(--success)"
                : tone === "warning"
                    ? "var(--warning)"
                    : "var(--danger)";
            return (<li key={c.id}>
                <button onClick={() => onCropSelect(c)} className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-secondary">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="text-base">{c.emoji}</span>
                    {c.name}
                  </span>
                  <span className="font-mono text-sm font-bold" style={{ color }}>
                    {score}/10
                  </span>
                </button>
              </li>);
        })}
        </ul>
      </div>

      <div className="surface-card p-5">
        <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary"/>
          {region.season} Season Tips
        </h3>
        <ul className="space-y-2">
          {seasonalTips[region.season].map((t) => (<li key={t} className="flex gap-2 text-sm text-foreground">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"/>
              {t}
            </li>))}
        </ul>
      </div>

      <div className="surface-card p-5">
        <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          <AlertOctagon className="h-4 w-4 text-accent"/>
          Active Risk Alerts
        </h3>
        <ul className="space-y-2">
          {alerts.map((a) => {
            const color = a.tone === "danger" ? "var(--danger)" : "var(--warning)";
            return (<li key={a.text} className="rounded-md border border-border bg-card p-2.5 text-xs text-foreground" style={{ borderLeft: `3px solid ${color}` }}>
                {a.text}
              </li>);
        })}
        </ul>
      </div>
    </section>);
}
