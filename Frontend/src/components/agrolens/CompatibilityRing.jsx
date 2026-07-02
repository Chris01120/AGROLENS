export function CompatibilityRing({ score, label = "Compatibility" }) {
    const pct = Math.max(0, Math.min(10, score)) / 10;
    const R = 56;
    const C = 2 * Math.PI * R;
    const dash = C * pct;
    const tone = score >= 8 ? "var(--ag-green)" : score >= 6 ? "var(--ag-amber)" : "var(--ag-red)";
    return (<div className="relative grid place-items-center">
      <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={tone}/>
            <stop offset="100%" stopColor="var(--ag-cyan)"/>
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r={R} fill="none" stroke="color-mix(in oklab, var(--ag-cyan) 12%, transparent)" strokeWidth="10"/>
        <circle cx="80" cy="80" r={R} fill="none" stroke="url(#ring-grad)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${dash} ${C - dash}`} style={{
            filter: `drop-shadow(0 0 8px ${tone})`,
            transition: "stroke-dasharray 0.8s ease",
        }}/>
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-mono text-4xl font-bold" style={{ color: tone }}>
            {score.toFixed(1)}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {label}
          </div>
        </div>
      </div>
    </div>);
}
