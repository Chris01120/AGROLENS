import { REGIONS, ZONES, zoneById } from "@/lib/agrolens-data";
// Group regions by country for stylized "map" rendering
const COUNTRY_COORDS = {
    Senegal: { x: 8, y: 18, color: "var(--terracotta-soft)" },
    "Côte d'Ivoire": { x: 38, y: 62, color: "var(--sage)" },
    Ghana: { x: 55, y: 65, color: "var(--sage-deep)" },
    Nigeria: { x: 78, y: 50, color: "var(--terracotta)" },
};
export function RegionMap({ selectedRegionId, onSelect }) {
    const selected = REGIONS.find((r) => r.id === selectedRegionId);
    return (<div className="relative">
      <div className="surface-card relative aspect-[4/3] overflow-hidden p-4" style={{
            transform: "perspective(1200px) rotateX(8deg) rotateY(-6deg)",
            transformStyle: "preserve-3d",
            background: "linear-gradient(135deg, color-mix(in oklab, var(--sage) 14%, var(--card)) 0%, color-mix(in oklab, var(--terracotta-soft) 14%, var(--card)) 100%)",
        }}>
        <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 25%, transparent) 1px, transparent 0)",
            backgroundSize: "22px 22px",
        }}/>

        {/* Stylized West Africa landmass */}
        <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="color-mix(in oklab, var(--sage) 35%, transparent)"/>
              <stop offset="100%" stopColor="color-mix(in oklab, var(--terracotta-soft) 30%, transparent)"/>
            </linearGradient>
          </defs>
          <path d="M5,15 Q15,8 28,12 L42,10 Q58,8 72,14 L88,18 Q95,28 92,42 L90,55 Q82,68 65,70 L48,72 Q32,72 22,64 L12,52 Q4,38 5,15 Z" fill="url(#land)" stroke="color-mix(in oklab, var(--sage-deep) 30%, transparent)" strokeWidth="0.4"/>
        </svg>

        {/* Country pins */}
        {REGIONS.map((r) => {
            const coord = COUNTRY_COORDS[r.country];
            if (!coord)
                return null;
            const isSelected = r.id === selectedRegionId;
            const isSameCountry = selected?.country === r.country;
            return (<button key={r.id} onClick={() => onSelect(r.id)} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${coord.x}%`, top: `${coord.y}%` }} title={`${r.name}, ${r.country}`}>
              <span className={`block rounded-full transition-all ${isSelected ? "h-4 w-4 ring-4 ring-primary/30" : "h-3 w-3"} ${isSameCountry ? "" : "opacity-70"}`} style={{
                    backgroundColor: coord.color,
                    boxShadow: isSelected
                        ? `0 0 0 3px var(--card), 0 0 18px ${coord.color}`
                        : "0 0 0 2px var(--card)",
                }}/>
              <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-card/95 px-2 py-0.5 text-[10px] font-semibold text-foreground opacity-0 shadow-sm transition group-hover:opacity-100">
                {r.name}
              </span>
            </button>);
        })}

        {/* Floating climate badge */}
        {selected && (<div className="absolute bottom-3 left-3 right-3 rounded-xl border border-border bg-card/95 p-3 backdrop-blur">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Selected
                </p>
                <p className="font-display text-base font-semibold text-foreground">
                  {selected.name}, {selected.country}
                </p>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground">
                {zoneById(selected.primaryZone).emoji} {zoneById(selected.primaryZone).name}
              </span>
            </div>
          </div>)}
      </div>

      {/* Zone legend */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {ZONES.map((z) => (<span key={z.id} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
            <span>{z.emoji}</span>
            {z.name}
          </span>))}
      </div>
    </div>);
}
