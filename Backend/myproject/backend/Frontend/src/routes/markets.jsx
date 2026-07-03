import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/agrolens/AppShell";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import csvFile from "../data/market_data.csv?raw";

export const Route = createFileRoute("/markets")({
  component: MarketsPage,
});

const cropEmoji = {
  Tomato: "🍅",
  Maize: "🌽",
  Rice: "🌾",
  Cassava: "🥔",
  Yam: "🍠",
  Pepper: "🌶️",
  Onion: "🧅",
  Cocoa: "🍫",
  Plantain: "🍌",
  Millet: "🌾",
  Sorghum: "🌱",
};

function MarketsPage() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        setCrops(results.data);
        setLoading(false);
      },

      error: () => {
        setLoading(false);
      },
    });
  }, []);

  const filtered = crops.filter((crop) =>
    crop.crop?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell>
      <div className="px-4 py-6 md:px-8">

        {/* HERO */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            📈 Market Intelligence
          </h1>

          <p className="mt-2 text-muted-foreground">
            Compare crop prices across major West African markets.
          </p>
        </div>

        {/* SEARCH */}
        <div className="surface-card mb-6 p-4">
          <input
            className="w-full rounded-lg border p-3"
            placeholder="Search crops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* STATS */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <div className="surface-card p-5">
            <p className="text-sm text-muted-foreground">
              Crops Tracked
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {crops.length}
            </h2>
          </div>

          <div className="surface-card p-5">
            <p className="text-sm text-muted-foreground">
              Markets Covered
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              4
            </h2>
          </div>

          <div className="surface-card p-5">
            <p className="text-sm text-muted-foreground">
              Search Results
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {filtered.length}
            </h2>
          </div>

          <div className="surface-card p-5">
            <p className="text-sm text-muted-foreground">
              Coverage
            </p>

            <h2 className="mt-2 text-lg font-semibold">
              West Africa
            </h2>
          </div>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="surface-card p-6 text-center">
            Loading market data...
          </div>
        ) : (

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

            {filtered.map((item, index) => (

              <div
                key={index}
                className="surface-card border border-border p-5 transition hover:border-ag-cyan hover:shadow-lg"
              >

                {/* HEADER */}
                <div className="mb-4 flex items-center gap-3">

                  <div className="text-4xl">
                    {cropEmoji[item.crop] || "🌱"}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.crop}
                    </h2>

                    <p className="text-xs text-muted-foreground">
                      Market Prices
                    </p>
                  </div>

                </div>

                {/* MARKET PRICES */}
                <div className="space-y-3">

                  <div className="flex justify-between">
                    <span>🇳🇬 Lagos</span>
                    <span className="font-medium">
                      {item.nigeria}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>🇬🇭 Accra</span>
                    <span className="font-medium">
                      {item.ghana}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>🇸🇳 Dakar</span>
                    <span className="font-medium">
                      {item.senegal}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>🇨🇮 Abidjan</span>
                    <span className="font-medium">
                      {item.cote_divoire}
                    </span>
                  </div>

                </div>

                {/* INSIGHT */}
                <div className="mt-5 rounded-lg border border-ag-cyan/30 bg-ag-cyan/10 p-3 text-xs">

                  <p className="font-semibold text-ag-cyan">
                     AGROLENS Insight
                  </p>

                  <p className="mt-1 text-muted-foreground">
                    Compare prices across markets before selling to
                    identify the strongest opportunities.
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

        {!loading && filtered.length === 0 && (
          <div className="surface-card mt-6 p-6 text-center">
            No crops found matching "{search}"
          </div>
        )}

      </div>
    </AppShell>
  );
}