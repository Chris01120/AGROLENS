import { REGIONS } from "@/lib/agrolens-data";
import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { MapPin, CloudRain } from "lucide-react";
import { Link } from "@tanstack/react-router";
export function MobileHeader() {
    const { regionId, setRegionId, setZoneOverride, region } = useDerivedAgroLens();
    return (<header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-[color-mix(in_oklab,var(--background)_85%,transparent)] px-4 py-3 backdrop-blur-xl lg:hidden">
      <Link to="/" className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-ag-green to-ag-cyan text-[#0F172A]">
          <span>🌿</span>
        </div>
        <span className="font-display text-sm font-semibold tracking-tight">
          AGROLENS
        </span>
      </Link>
      <div className="flex items-center gap-2">
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ag-cyan"/>
          <select value={regionId} onChange={(e) => {
            setRegionId(e.target.value);
            setZoneOverride(null);
        }} className="appearance-none rounded-full border border-input bg-[color-mix(in_oklab,var(--surface-2)_70%,transparent)] py-1.5 pl-7 pr-3 text-[11px] font-medium focus:outline-none">
            {REGIONS.map((r) => (<option key={r.id} value={r.id}>
                {r.name}
              </option>))}
          </select>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--ag-cyan)_18%,transparent)] px-2 py-1 text-[10px] font-semibold text-ag-cyan">
          <CloudRain className="h-3 w-3"/>
          {region.season}
        </span>
      </div>
    </header>);
}
