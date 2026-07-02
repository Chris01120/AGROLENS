import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Sprout, CloudRain, LineChart, User } from "lucide-react";
const ITEMS = [
    { to: "/home", label: "Home", icon: Home },
    { to: "/crops", label: "Crops", icon: Sprout },
    { to: "/weather", label: "Weather", icon: CloudRain },
    { to: "/markets", label: "Markets", icon: LineChart },
    { to: "/insights", label: "Tracker", icon: User },
];
export function MobileNav() {
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    return (<nav className="fixed inset-x-0 bottom-3 z-50 mx-auto flex w-[min(94%,460px)] items-center justify-around gap-1 rounded-full border border-white/10 bg-[color-mix(in_oklab,var(--surface-1)_75%,transparent)] px-2 py-2 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl lg:hidden">
      {ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (<Link key={item.to} to={item.to} className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-full px-2 py-1.5 text-[10px] font-semibold tracking-wide transition ${active
                    ? "text-[#0F172A]"
                    : "text-muted-foreground hover:text-foreground"}`}>
            {active && (<span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-ag-green to-ag-cyan glow-cyan"/>)}
            <Icon className="h-5 w-5"/>
            {item.label}
          </Link>);
        })}
    </nav>);
}
