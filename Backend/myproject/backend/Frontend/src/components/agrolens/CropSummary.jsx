import { useCropDetail, getStaticCrop } from "@/lib/api";
import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { ZONES } from "@/lib/agrolens-data";

export function CropSummary({ crop }) {
  const { region } = useDerivedAgroLens();
  const zoneName = ZONES.find((z) => z.id === region.primaryZone)?.name ?? region.primaryZone;
  const { data } = useCropDetail(crop.name ?? crop.id, zoneName);
  const detail = data ?? getStaticCrop(crop.id) ?? crop;

  const facts = [
    { label: "Growth", value: `${detail.growthDays} days` },
    { label: "Soil", value: detail.soil },
    { label: "Sunlight", value: detail.sunlight },
    { label: "Water", value: detail.water },
  ];
    return (<section className="surface-card overflow-hidden">
      <div className="flex items-center gap-4 border-b border-border bg-gradient-to-br from-[color-mix(in_oklab,var(--terracotta-soft)_20%,transparent)] to-transparent p-5 md:p-6">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-card text-4xl shadow-sm">
          {detail.emoji || crop.emoji}
        </div>
        <div className="flex-1">
          <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
            {detail.name || crop.name}
          </h2>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {(detail.tags || []).map((t) => (<span key={t} className="rounded-full bg-card/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {t}
              </span>))}
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
        {facts.map((f) => (<div key={f.label} className="p-4">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {f.label}
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">{f.value}</dd>
          </div>))}
      </dl>
    </section>);
}
