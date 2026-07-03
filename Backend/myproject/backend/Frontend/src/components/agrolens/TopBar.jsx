import { REGIONS } from "@/lib/agrolens-data";
import { Search, MapPin, Cloud } from "lucide-react";
export function TopBar({ query, onQuery, regionId, onRegion, season }) {
    const region = REGIONS.find((r) => r.id === regionId);
    return (<header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6 md:px-6">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-lg">🌿</span>
          </div>
          <span className="hidden font-display text-lg font-semibold tracking-tight text-foreground sm:inline">
            AGROLENS
          </span>
        </a>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
          <input value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Search a crop — Tomato, Corn, Cassava…" className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"/>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-accent"/>
            <select value={regionId} onChange={(e) => onRegion(e.target.value)} className="appearance-none rounded-full border border-input bg-card py-2 pl-8 pr-8 text-sm font-medium text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30">
              {REGIONS.map((r) => (<option key={r.id} value={r.id}>
                  {r.name}, {r.country}
                </option>))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground">
            <Cloud className="h-3.5 w-3.5 text-accent"/>
            <span>{season} Season</span>
          </div>
        </div>
      </div>

      {/* Mobile region/season row */}
      <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-2 md:hidden">
        <select value={regionId} onChange={(e) => onRegion(e.target.value)} className="rounded-full border border-input bg-card px-3 py-1.5 text-xs font-medium">
          {REGIONS.map((r) => (<option key={r.id} value={r.id}>
              📍 {r.name}, {r.country}
            </option>))}
        </select>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
          🌦️ {season}
        </span>
        <span className="text-xs text-muted-foreground">
          Zone: <span className="font-medium text-foreground">{region.primaryZone}</span>
        </span>
      </div>
    </header>);
}
