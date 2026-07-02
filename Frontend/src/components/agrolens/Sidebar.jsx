import { Link, useRouterState } from "@tanstack/react-router";
import { REGIONS } from "@/lib/agrolens-data";
import { useDerivedAgroLens } from "@/lib/agrolens-store";

import {
  Home,
  Sprout,
  Activity,
  Map,
  CloudRain,
  LineChart,
  Bug,
  Lightbulb,
  MapPin,
  User
} from "lucide-react";

const NAV = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/crops", label: "Crops", icon: Sprout },
  { to: "/analysis", label: "Analysis", icon: Activity },
  { to: "/zones", label: "Zones", icon: Map },
  { to: "/weather", label: "Weather", icon: CloudRain },
  { to: "/markets", label: "Markets", icon: LineChart },
  { to: "/pests", label: "Pests", icon: Bug },
  { to: "/insights", label: "Insights", icon: Lightbulb },

  // 👇 NEW
  { to: "/user", label: "Account", icon: User },
];

export function Sidebar() {
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const { regionId, setRegionId, setZoneOverride } =
    useDerivedAgroLens();

  return (
    <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-border bg-[color-mix(in_oklab,var(--surface-1)_85%,transparent)] backdrop-blur-xl lg:flex">

      {/* LOGO */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-ag-green to-ag-cyan text-[#0F172A] glow-green">
          <span className="text-lg">🌿</span>
        </div>

        <div className="leading-tight">
          <div className="font-display text-base font-semibold tracking-tight">
            AGROLENS
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Climate Intel
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 space-y-0.5 px-3">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active =
            item.to === "/"
              ? pathname === "/"
              : pathname.startsWith(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[color-mix(in_oklab,var(--ag-cyan)_14%,transparent)] text-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-ag-cyan glow-cyan" />
              )}

              <Icon
                className={`h-4 w-4 ${
                  active
                    ? "text-ag-cyan"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              />

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* REGION SELECTOR */}
      <div className="border-t border-border p-4">
        <label className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <MapPin className="h-3 w-3 text-ag-cyan" />
          Active States
        </label>

        <select
          value={regionId}
          onChange={(e) => {
            setRegionId(e.target.value);
            setZoneOverride(null);
          }}
          className="w-full cursor-pointer appearance-none rounded-lg border border-input bg-[color-mix(in_oklab,var(--surface-2)_70%,transparent)] px-3 py-2 text-sm font-medium text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
        >
          {REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}, {r.country}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}