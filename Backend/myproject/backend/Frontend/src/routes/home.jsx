import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/agrolens/AppShell";
import { ClimateMap } from "@/components/agrolens/ClimateMap";
import { useDerivedAgroLens } from "@/lib/agrolens-store";
import { useWeather } from "@/lib/useWeather";
import { useAgroLensEngine } from "@/lib/useAgroLensEngine";
import { CROPS } from "@/lib/agrolens-data";
import { ProtectedRoute } from "./ProtectedRoute";

import {
  ArrowRight,
  Sparkles,
  CloudRain,
  Activity,
  Bug,
} from "lucide-react";

import { useState } from "react";

// const { user, regionId } = useUser();
// const { region } = useDerivedAgroLens(regionId);

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      {
        title: "AGROLENS — Climate Intelligence for West Africa",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {

  const {
    regionId,
    setRegionId,
    setCropId,
    region,
  } = useDerivedAgroLens();

  const navigate = useNavigate();

  const weather = useWeather(region);

  const {
    pestRisks,
    season
  } = useAgroLensEngine(
    region,
    "mixed"
  );

  const [query,setQuery] =
  useState("");

  const goAnalyze=(cropId)=>{
    if(cropId) setCropId(cropId);

    navigate({
      to:"/analysis"
    });
  };

  const dominantRisk =
  pestRisks
  ?
  Object.entries(
    pestRisks
  ).sort(
    (a,b)=>b[1]-a[1]
  )[0]?.[0]
  :
  null;

  return(

<ProtectedRoute>
<AppShell>

<div className="px-4 py-6 md:px-8 md:py-8">

{/* HERO */}

<section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">

<div>

<span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[color-mix(in_oklab,var(--ag-cyan)_14%,transparent)] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-ag-cyan">

<Sparkles className="h-3 w-3"/>

Live Climate Intelligence

</span>

<h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">

Agricultural

<span className="bg-gradient-to-r from-ag-green via-ag-cyan to-ag-amber bg-clip-text text-transparent">

{" "}Intelligence

</span>

<br/>

for West Africa

</h1>


{/* DYNAMIC BRIEFING */}

<div className="mt-5 surface-elevated relative overflow-hidden p-5">

<div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,color-mix(in_oklab,var(--ag-cyan)_18%,transparent),transparent_60%)]"/>

<div className="relative">

<p className="font-mono text-[10px] uppercase tracking-widest text-ag-cyan">

Field Briefing · {region.name}

</p>


<p className="mt-2 font-display text-lg leading-snug md:text-xl">

{

weather.loading

?

"Loading climate intelligence..."

:

season==="Rainy"

?

`High rainfall activity detected in ${region.name}. Humidity levels around ${weather.currentHumidity}% may increase fungal pressure.`

:

season==="Harmattan"

?

`Dry dusty conditions active across ${region.name}. Monitor moisture loss and crop stress.`

:

dominantRisk==="insect"

?

`Warm conditions favour higher insect activity. Increase scouting frequency.`

:

`Weather conditions currently support relatively stable growing environments.`

}

</p>


<div className="mt-4 flex gap-3 flex-wrap">

<div className="surface-card px-3 py-2">

🌡 {weather.currentTemp}°

</div>

<div className="surface-card px-3 py-2">

💧 {weather.currentHumidity}%

</div>

<div className="surface-card px-3 py-2">

🌧 {season}

</div>

</div>

</div>

</div>


{/* SEARCH */}

<div className="mt-5 flex flex-col gap-2 sm:flex-row">

<div className="flex-1">

<input

value={query}

onChange={(e)=>
setQuery(
e.target.value
)}

onKeyDown={(e)=>{

if(e.key==="Enter"){

const match=
CROPS.find(
c=>
c.name
.toLowerCase()
.includes(
query
.toLowerCase()
)
);

if(match)
goAnalyze(
match.id
);

else
navigate({
to:"/crops"
});

}

}}

placeholder="Analyze a crop — cassava, rice, maize..."

className="w-full rounded-full border border-input px-5 py-3 text-sm"

/>

</div>


<button

onClick={()=>
goAnalyze()
}

className="rounded-full bg-gradient-to-r from-ag-green to-ag-cyan px-5 py-3 text-sm font-semibold"

>

Open Engine

</button>

</div>


<div className="mt-3 flex flex-wrap gap-2">

{

["tomato","corn","cassava","sorghum"]

.map(id=>{

const c=
CROPS.find(
x=>x.id===id
);

return(

<button

key={id}

onClick={()=>
goAnalyze(id)
}

className="rounded-full border px-3 py-1 text-xs"

>

{c?.emoji}

{" "}

{c?.name}

</button>

);

})

}

</div>

</div>


{/* MAP */}

{/* MAP */}

<div>

<ClimateMap
selectedRegionId={regionId}
onSelect={setRegionId}
/>

<div className="mt-4 grid grid-cols-3 gap-2 text-center">

{[
{
label:"Capital",
value:region.name
},

{
label:"Country",
value:region.country
},

{
label:"Season",
value:season
}

].map((s)=>(

<div
key={s.label}
className="surface-card p-3"
>

<p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">

{s.label}

</p>

<p className="mt-1 font-display text-sm font-semibold">

{s.value}

</p>

</div>

))}

</div>

</div>
</section>


{/* SHORTCUTS */}

<section className="mt-12 grid gap-4 md:grid-cols-3">

{[
{
title:"Analysis Engine",
to:"/analysis",
icon:Activity,
body:"Score crops using climate intelligence."
},

{
title:"Weather",
to:"/weather",
icon:CloudRain,
body:"Live weather and atmospheric data."
},

{
title:"Pest Radar",
to:"/pests",
icon:Bug,
body:"Weather-driven pest intelligence."
}

].map(f=>{

const Icon=f.icon;

return(

<Link

key={f.to}

to={f.to}

className="surface-card p-5"

>

<Icon className="h-5 w-5"/>

<h3 className="mt-3 font-display text-lg font-semibold">

{f.title}

</h3>

<p className="mt-1 text-sm text-muted-foreground">

{f.body}

</p>

</Link>

);

})}

</section>

</div>

</AppShell>
</ProtectedRoute>

);

}