import { scoreLabel, zoneById } from "@/lib/agrolens-data";
export function SuitabilityScore({ crop, zoneId }) {
    const zone = zoneById(zoneId);
    const score = crop.scores?.[zoneId] ?? crop.scores?.[zone?.name] ?? 0;
    const { label, tone } = scoreLabel(score);
    const toneColor = tone === "success"
        ? "var(--success)"
        : tone === "warning"
            ? "var(--warning)"
            : "var(--danger)";
    return (<section className="surface-card overflow-hidden" style={{ borderTop: `4px solid ${toneColor}` }}>
      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Suitability Score
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-mono text-5xl font-bold leading-none" style={{ color: toneColor }}>
            {score}
          </span>
          <span className="font-mono text-lg text-muted-foreground">/10</span>
        </div>
        <p className="mt-1.5 text-sm font-semibold" style={{ color: toneColor }}>
          {label}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          for {crop.name} in {zone.name}
        </p>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score * 10}%`, backgroundColor: toneColor }}/>
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-muted-foreground">
          <span>0</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
    </section>);
}
