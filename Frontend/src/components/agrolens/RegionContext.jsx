import { ZONES, zoneById } from "@/lib/agrolens-data";
export function RegionContext({ region, onZoneChange, }) {
    const active = zoneById(region.primaryZone);
    return (<section className="surface-card p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Region Context
        </h2>
        <span className="font-mono text-xs text-muted-foreground">
          {region.name}, {region.country}
        </span>
      </div>

      <div className="mb-4 rounded-lg bg-secondary/60 p-3">
        <p className="text-xs text-muted-foreground">Detected primary zone</p>
        <p className="mt-0.5 font-display text-lg font-semibold text-foreground">
          {active.emoji} {active.name}
        </p>
        <p className="text-xs text-muted-foreground">{active.description}</p>
      </div>

      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Switch climate zone
      </p>
      <div className="grid grid-cols-2 gap-2">
        {ZONES.map((z) => {
            const isActive = z.id === region.primaryZone;
            return (<button key={z.id} onClick={() => onZoneChange(z.id)} className={`group relative overflow-hidden rounded-lg border p-3 text-left transition ${isActive
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-ring/40"}`}>
              <div className={`absolute inset-0 opacity-70 ${z.tint}`}/>
              <div className="relative">
                <div className="text-xl">{z.emoji}</div>
                <div className="mt-1 text-sm font-semibold text-foreground">{z.name}</div>
              </div>
            </button>);
        })}
      </div>
    </section>);
}
