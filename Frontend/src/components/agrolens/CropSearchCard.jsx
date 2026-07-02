import { CROPS } from "@/lib/agrolens-data";
import { Sparkles } from "lucide-react";
import { useCropList } from "@/lib/api";

export function CropSearchCard({ query, onQuery, selected, onSelect, recent }) {
    const { data: remote } = useCropList();
    const crops = remote
        ? remote.map((crop) => {
            const local = CROPS.find((c) => c.id === crop.id || c.name.toLowerCase() === crop.name.toLowerCase());
            return local
                ? { ...local, ...crop, id: local.id, backendId: crop.id, growthDays: local.growthDays ?? crop.growth_duration_days }
                : { ...crop, id: crop.name ? crop.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : String(crop.id), backendId: crop.id, emoji: crop.emoji ?? "🌱", growthDays: crop.growth_duration_days ?? 0 };
        })
        : CROPS;

    const results = query
        ? crops.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
        : crops;
    const suggested = crops.slice(0, 4);
    return (<section className="surface-card p-5 md:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-accent"/>
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Crop Search
        </h2>
      </div>

      <input value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Search crop (e.g. Tomato, Corn, Cassava…)" className="w-full rounded-xl border-2 border-input bg-background px-4 py-4 font-display text-lg text-foreground placeholder:text-muted-foreground/70 focus:border-ring focus:outline-none"/>

      {results.length > 0 && (<div className="mt-3 overflow-hidden rounded-lg border border-border">
          {results.map((c) => (<button key={c.id} onClick={() => onSelect(c)} className="flex w-full items-center gap-3 border-b border-border bg-card px-4 py-2.5 text-left last:border-0 hover:bg-secondary">
              <span className="text-xl">{c.emoji}</span>
              <span className="font-medium text-foreground">{c.name}</span>
              <span className="ml-auto font-mono text-xs text-muted-foreground">
                {c.growthDays}d
              </span>
            </button>))}
        </div>)}

      {recent.length > 0 && (<div className="mt-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Recent
          </p>
          <div className="flex flex-wrap gap-2">
            {recent.map((id) => {
                const c = CROPS.find((x) => x.id === id);
                if (!c)
                    return null;
                return (<button key={id} onClick={() => onSelect(c)} className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium hover:border-ring">
                  <span>{c.emoji}</span>
                  {c.name}
                </button>);
            })}
          </div>
        </div>)}

      <div className="mt-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Suggested
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {suggested.map((c) => {
            const active = selected?.id === c.id;
            return (<button key={c.id} onClick={() => onSelect(c)} className={`flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition ${active
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-ring/40"}`}>
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-sm font-semibold text-foreground">{c.name}</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {c.growthDays}d cycle
                </span>
              </button>);
        })}
        </div>
      </div>
    </section>);
}
