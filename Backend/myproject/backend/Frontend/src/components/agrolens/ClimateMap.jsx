import { REGIONS, ZONES, zoneById } from "@/lib/agrolens-data";
const COUNTRY_COORDS = {
    Senegal: { x: 10, y: 22 },
    "Côte d'Ivoire": { x: 38, y: 62 },
    Ghana: { x: 52, y: 64 },
    Nigeria: { x: 75, y: 50 },
};
export function ClimateMap({ selectedRegionId, onSelect }) {
    const selected = REGIONS.find((r) => r.id === selectedRegionId);
    return (<div className="relative">
      <div className="surface-elevated relative aspect-[4/3] overflow-hidden p-0">
        {/* atmospheric gradient backdrop */}
        <div className="absolute inset-0 animate-gradient-shift bg-[radial-gradient(circle_at_30%_30%,color-mix(in_oklab,var(--ag-cyan)_28%,transparent),transparent_55%),radial-gradient(circle_at_75%_70%,color-mix(in_oklab,var(--ag-green)_22%,transparent),transparent_55%),radial-gradient(circle_at_85%_15%,color-mix(in_oklab,var(--ag-amber)_18%,transparent),transparent_50%)]"/>

        {/* grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-40"/>

        {/* rainfall lines */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
          {Array.from({ length: 18 }).map((_, i) => (<span key={i} className="animate-rainfall absolute block h-8 w-px bg-gradient-to-b from-transparent via-ag-cyan to-transparent" style={{
                left: `${(i * 6 + 5) % 100}%`,
                animationDelay: `${(i % 6) * 0.25}s`,
                animationDuration: `${1.2 + (i % 5) * 0.2}s`,
            }}/>))}
        </div>

        {/* perspective tilt wrap */}
        <div className="absolute inset-0" style={{
            transform: "perspective(1400px) rotateX(14deg) rotateY(-6deg) scale(0.92)",
            transformOrigin: "center center",
        }}>
          <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="land-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="color-mix(in oklab, var(--ag-green) 36%, transparent)"/>
                <stop offset="100%" stopColor="color-mix(in oklab, var(--ag-cyan) 26%, transparent)"/>
              </linearGradient>
              <filter id="landshadow">
                <feGaussianBlur stdDeviation="0.6"/>
              </filter>
            </defs>
            {/* glow halo */}
            <path d="M5,15 Q15,8 28,12 L42,10 Q58,8 72,14 L88,18 Q95,28 92,42 L90,55 Q82,68 65,70 L48,72 Q32,72 22,64 L12,52 Q4,38 5,15 Z" fill="color-mix(in oklab, var(--ag-cyan) 22%, transparent)" filter="url(#landshadow)"/>
            <path d="M5,15 Q15,8 28,12 L42,10 Q58,8 72,14 L88,18 Q95,28 92,42 L90,55 Q82,68 65,70 L48,72 Q32,72 22,64 L12,52 Q4,38 5,15 Z" fill="url(#land-gradient)" stroke="color-mix(in oklab, var(--ag-cyan) 55%, transparent)" strokeWidth="0.35"/>
          </svg>

          {/* Country pins with glow */}
          {REGIONS.map((r) => {
            const coord = COUNTRY_COORDS[r.country];
            if (!coord)
                return null;
            const isSelected = r.id === selectedRegionId;
            return (<button key={r.id} onClick={() => onSelect(r.id)} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${coord.x}%`, top: `${coord.y}%` }} title={`${r.name}, ${r.country}`}>
                <span className="relative block">
                  <span className={`absolute inset-0 rounded-full ${isSelected ? "animate-glow-pulse" : ""}`} style={{
                    background: "radial-gradient(circle, color-mix(in oklab, var(--ag-cyan) 70%, transparent), transparent 70%)",
                    width: isSelected ? "42px" : "26px",
                    height: isSelected ? "42px" : "26px",
                    transform: "translate(-50%, -50%)",
                    left: "50%",
                    top: "50%",
                }}/>
                  <span className={`relative block rounded-full transition-all ${isSelected ? "h-3.5 w-3.5" : "h-2.5 w-2.5"}`} style={{
                    background: isSelected ? "var(--ag-cyan)" : "var(--ag-green)",
                    boxShadow: isSelected
                        ? "0 0 0 2px #0F172A, 0 0 18px var(--ag-cyan)"
                        : "0 0 0 2px #0F172A",
                }}/>
                </span>
                <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-[color-mix(in_oklab,var(--surface-2)_90%,transparent)] px-2 py-0.5 text-[10px] font-semibold text-foreground opacity-0 backdrop-blur transition group-hover:opacity-100">
                  {r.name}
                </span>
              </button>);
        })}
        </div>

        {/* floating selection card */}
        {selected && (<div className="absolute bottom-3 left-3 right-3 glass flex items-center justify-between gap-2 rounded-xl p-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ag-cyan">
                Active Region
              </p>
              <p className="font-display text-base font-semibold text-foreground">
                {selected.name}, {selected.country}
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-[color-mix(in_oklab,var(--ag-cyan)_15%,transparent)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ag-cyan">
              {zoneById(selected.primaryZone).emoji} {zoneById(selected.primaryZone).name}
            </span>
          </div>)}
      </div>

      {/* Zone legend */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {ZONES.map((z) => (<span key={z.id} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-[color-mix(in_oklab,var(--surface-2)_60%,transparent)] px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
            <span>{z.emoji}</span>
            {z.name}
          </span>))}
      </div>
    </div>);
}
