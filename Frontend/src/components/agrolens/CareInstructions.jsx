import { Droplets, Sprout, FlaskConical } from "lucide-react";
import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { ZONES } from "@/lib/agrolens-data";
import { useCropDetail, getStaticCrop } from "@/lib/api";

export function CareInstructions({ crop }) {
  const { region } = useDerivedAgroLens();
  const zoneName = ZONES.find((z) => z.id === region.primaryZone)?.name ?? region.primaryZone;
  const { data: remote } = useCropDetail(crop.name ?? crop.id, zoneName);
  const detail = remote ?? getStaticCrop(crop.id) ?? crop;

  const items = [
    { icon: Droplets, label: "Watering", text: detail.water },
    { icon: Sprout, label: "Planting", text: detail.planting },
    { icon: FlaskConical, label: "Fertilizer", text: detail.fertilizer },
  ];
    return (<section className="surface-card p-5 md:p-6">
      <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Care Instructions
      </h3>
      <div className="grid gap-3 md:grid-cols-3">
        {items.map(({ icon: Icon, label, text }) => (<div key={label} className="rounded-lg border border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-3.5 w-3.5"/>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {label}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground">{text}</p>
          </div>))}
      </div>
    </section>);
}
