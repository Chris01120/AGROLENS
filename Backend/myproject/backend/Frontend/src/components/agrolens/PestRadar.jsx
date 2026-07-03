export function PestRadar({ risks }) {
    const size = 280;
    const cx = size / 2;
    const cy = size / 2;
    const maxR = 110;
    const n = risks.length;
    const points = risks.map((r, i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
        const radius = (r.value / 10) * maxR;
        return {
            x: cx + Math.cos(angle) * radius,
            y: cy + Math.sin(angle) * radius,
            lx: cx + Math.cos(angle) * (maxR + 18),
            ly: cy + Math.sin(angle) * (maxR + 18),
            label: r.label,
            value: r.value,
        };
    });
    const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ") + " Z";
    return (<div className="relative grid place-items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--ag-red) 40%, transparent)"/>
            <stop offset="100%" stopColor="color-mix(in oklab, var(--ag-red) 8%, transparent)"/>
          </radialGradient>
        </defs>
        {/* concentric rings */}
        {[0.25, 0.5, 0.75, 1].map((f) => (<circle key={f} cx={cx} cy={cy} r={maxR * f} fill="none" stroke="color-mix(in oklab, var(--ag-cyan) 20%, transparent)" strokeWidth="1" strokeDasharray="2 4"/>))}
        {/* spokes */}
        {risks.map((_, i) => {
            const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
            return (<line key={i} x1={cx} y1={cy} x2={cx + Math.cos(angle) * maxR} y2={cy + Math.sin(angle) * maxR} stroke="color-mix(in oklab, var(--ag-cyan) 18%, transparent)" strokeWidth="1"/>);
        })}
        {/* risk polygon */}
        <path d={path} fill="url(#radar-fill)" stroke="var(--ag-red)" strokeWidth="1.5" style={{ filter: "drop-shadow(0 0 8px color-mix(in oklab, var(--ag-red) 50%, transparent))" }}/>
        {/* points */}
        {points.map((p) => (<circle key={p.label} cx={p.x} cy={p.y} r={4} fill="var(--ag-red)" stroke="#0F172A" strokeWidth="2"/>))}
        {/* labels */}
        {points.map((p) => (<text key={`l-${p.label}`} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground font-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>
            {p.label}
          </text>))}
      </svg>
    </div>);
}
