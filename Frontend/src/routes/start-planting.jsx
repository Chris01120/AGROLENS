import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/agrolens/AppShell";
import { getCurrentUser } from "@/lib/auth";
import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { CROPS } from "@/lib/agrolens-data";

export const Route = createFileRoute("/start-planting")({
  component: StartPlantingPage,
});

function StartPlantingPage() {
  const user = getCurrentUser();

  const { region } = useDerivedAgroLens();

  const recommended = CROPS
    .filter(
      (crop) =>
        crop.scores?.[region.primaryZone] >= 7
    )
    .slice(0, 6);

  return (
    <AppShell>
      <div className="space-y-6 px-4 py-6 md:px-8">

        {/* Hero */}
        <section className="surface-elevated p-6">
          <h1 className="text-3xl font-bold">
            🌱 Start Planting
          </h1>

          <p className="mt-2 text-muted-foreground">
            Welcome {user?.firstName || "Farmer"}.
            Get started with crops suited for
            {` ${region.name}`}.
          </p>
        </section>

        {/* Region */}
        <section className="surface-card p-5">
          <h2 className="mb-3 text-xl font-semibold">
            Active Region
          </h2>

          <div className="rounded-lg border p-4">
            <p>
              <strong>Location:</strong>{" "}
              {region.name}
            </p>

            <p>
              <strong>Country:</strong>{" "}
              {region.country}
            </p>

            <p>
              <strong>Zone:</strong>{" "}
              {region.primaryZone}
            </p>
          </div>
        </section>

        {/* Recommended Crops */}
        <section className="surface-card p-5">
          <h2 className="mb-4 text-xl font-semibold">
            Recommended Crops
          </h2>

          <div className="grid gap-3 md:grid-cols-3">
            {recommended.map((crop) => (
              <div
                key={crop.id}
                className="rounded-xl border p-4"
              >
                <div className="text-3xl">
                  {crop.emoji}
                </div>

                <h3 className="mt-2 font-semibold">
                  {crop.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  Growth Cycle: {crop.growthDays} days
                </p>

                <p className="mt-2 text-sm">
                  Suitability Score:
                  {" "}
                  {crop.scores?.[region.primaryZone]}/10
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section className="surface-card p-5">
          <h2 className="mb-4 text-xl font-semibold">
            Planting Checklist
          </h2>

          <div className="space-y-3">

            <div className="rounded-lg border p-3">
              ✅ Select a suitable crop
            </div>

            <div className="rounded-lg border p-3">
              ✅ Check weather forecast
            </div>

            <div className="rounded-lg border p-3">
              ✅ Prepare land and soil
            </div>

            <div className="rounded-lg border p-3">
              ✅ Acquire seeds
            </div>

            <div className="rounded-lg border p-3">
              ✅ Begin planting
            </div>

          </div>
        </section>

      </div>
    </AppShell>
  );
}