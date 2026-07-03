import { Link } from "@tanstack/react-router";
import { REGIONS } from "@/lib/agrolens-data";
import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { Cloud, MapPin } from "lucide-react";
const links = [
    { to: "/", label: "Home" },
    { to: "/crops", label: "Crop Search" },
    { to: "/analysis", label: "Analysis" },
    { to: "/zones", label: "Zone Explorer" },
    { to: "/insights", label: "Insights" },
];
export function NavBar() {
    const { regionId, setRegionId, setZoneOverride, region } = useDerivedAgroLens();
    return (<header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 md:gap-6 md:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <span className="text-lg">🌿</span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            AGROLENS
          </span>
        </Link>

        <nav className="order-3 flex flex-1 items-center gap-1 overflow-x-auto md:order-2 md:gap-2">
          {links.map((l) => (<Link key={l.to} to={l.to} activeOptions={{ exact: l.to === "/" }} className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground">
              {l.label}
            </Link>))}
        </nav>

        <div className="order-2 ml-auto flex items-center gap-2 md:order-3">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-accent"/>
            <select value={regionId} onChange={(e) => {
            setRegionId(e.target.value);
            setZoneOverride(null);
        }} className="appearance-none rounded-full border border-input bg-card py-2 pl-8 pr-3 text-xs font-medium text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30 md:text-sm">
              {REGIONS.map((r) => (<option key={r.id} value={r.id}>
                  {r.name}, {r.country}
                </option>))}
            </select>
          </div>
          <div className="hidden items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground sm:flex">
            <Cloud className="h-3.5 w-3.5 text-accent"/>
            <span>{region.season}</span>
          </div>
        </div>
      </div>
    </header>);
}
