import { scoreLabel, zoneById, ZONES } from "@/lib/agrolens-data";
import { Sparkles } from "lucide-react";
import { useCropDetail, getStaticCrop } from "@/lib/api";
export function RecommendationBox({ crop, region, zoneId, }) {
    const zone = zoneById(zoneId);
  const zoneName = ZONES.find((z) => z.id === zoneId)?.name ?? zoneId;
  const { data: remote } = useCropDetail(crop.name ?? crop.id, zoneName);
  const detail = remote ?? getStaticCrop(crop.id) ?? crop;

  const score = detail.scores?.[zoneId] ?? detail.scores?.[zoneName] ?? 0;
  const { tone } = scoreLabel(score);
  const bestZone = [...ZONES].sort((a, b) => (detail.scores?.[b.id] ?? detail.scores?.[b.name] ?? 0) - (detail.scores?.[a.id] ?? detail.scores?.[a.name] ?? 0))[0];
  const seasonMatch = (detail.bestSeason || []).includes(region.season);
    let message = "";
    if (tone === "success") {
        message = `${detail.name || crop.name} performs strongly in ${zone.name} zones with a score of ${score}/10. Conditions in ${region.name} align well — proceed with confidence.`;
    }
    else if (tone === "warning") {
        message = `${detail.name || crop.name} grows moderately in ${zone.name}. For best yields consider ${bestZone.name} (${detail.scores?.[bestZone.id] ?? detail.scores?.[bestZone.name] ?? 0}/10), or apply targeted disease and water management.`;
    }
    else {
        message = `${detail.name || crop.name} struggles in ${zone.name} (${score}/10). Strong recommendation: shift to ${bestZone.name} (${detail.scores?.[bestZone.id] ?? detail.scores?.[bestZone.name] ?? 0}/10) or choose a more climate-matched crop.`;
    }
    return (<section className="surface-card overflow-hidden bg-gradient-to-br from-primary/5 to-transparent p-5">
      <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        <Sparkles className="h-4 w-4 text-primary"/>
        Recommendation
      </h3>
      <p className="text-sm leading-relaxed text-foreground">{message}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {seasonMatch ? "✓ Season match" : "⚠ Off-season planting"}
        </span>
        <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          Best zone: {bestZone.name}
        </span>
      </div>
    </section>);
}
