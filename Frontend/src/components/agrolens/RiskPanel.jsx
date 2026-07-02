import { AlertTriangle } from "lucide-react";
const toneMap = {
    Low: "var(--success)",
    Medium: "var(--warning)",
    High: "var(--danger)",
};
export function RiskPanel({ crop }) {
    return (<section className="surface-card p-5">
      <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        <AlertTriangle className="h-4 w-4 text-accent"/>
        Risk Analysis
      </h3>
      <ul className="space-y-2">
        {crop.risks.map((r) => {
            const color = toneMap[r.level];
            return (<li key={r.label} className="rounded-lg border border-border bg-card p-3" style={{ borderLeft: `3px solid ${color}` }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{r.label}</span>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: color }}>
                  {r.level}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{r.note}</p>
            </li>);
        })}
      </ul>
    </section>);
}
