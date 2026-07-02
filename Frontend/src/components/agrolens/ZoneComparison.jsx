import { ZONES, scoreLabel } from "@/lib/agrolens-data";
import { useCropDetail, getStaticCrop } from "@/lib/api";
export function ZoneComparison({ crop, activeZone, onZoneSelect, }) {
  const zoneName = ZONES.find((z) => z.id === activeZone)?.name ?? ZONES[0]?.name ?? activeZone;
  const { data: remote } = useCropDetail(crop.name ?? crop.id, zoneName);
  const detail = remote ?? getStaticCrop(crop.id) ?? crop;

  const sorted = [...ZONES].sort((a, b) => (detail.scores?.[b.id] ?? detail.scores?.[b.name] ?? 0) - (detail.scores?.[a.id] ?? detail.scores?.[a.name] ?? 0));
    return (<section className="surface-card p-5">
      <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Zone Comparison
      </h3>
      <div className="space-y-2">
        {sorted.map((z) => {
            const score = detail.scores?.[z.id] ?? detail.scores?.[z.name] ?? 0;
            const { tone } = scoreLabel(score);
            const color = tone === "success"
                ? "var(--success)"
                : tone === "warning"
                    ? "var(--warning)"
                    : "var(--danger)";
            const isActive = z.id === activeZone;
            return (<button key={z.id} onClick={() => onZoneSelect(z.id)} className={`block w-full rounded-lg border p-3 text-left transition ${isActive
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-ring/40"}`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{z.emoji}</span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{z.name}</div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color }}>
                      {tone === "success" ? "Low risk" : tone === "warning" ? "Medium risk" : "High risk"}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-2xl font-bold" style={{ color }}>
                  {score}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full transition-all" style={{ width: `${score * 10}%`, backgroundColor: color }}/>
              </div>
            </button>);
        })}
      </div>
    </section>);
}
