import { createFileRoute, Link } from "@tanstack/react-router";

import {
CloudRain,
Bug,
Activity,
ArrowRight,
Sparkles,
Map,
Shield,
TrendingUp
} from "lucide-react";

import { ClimateMap } from "@/components/agrolens/ClimateMap";

export const Route =
createFileRoute("/")({

component:LandingPage

});

function LandingPage(){

return(

<div className="min-h-screen bg-background">

{/* NAVBAR */}

<header className="sticky top-0 z-40 border-b border-border backdrop-blur-xl bg-background/70">

<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

<div className="flex items-center gap-2">

<div className="h-9 w-9 rounded-xl bg-gradient-to-r from-ag-green to-ag-cyan"/>

<span className="font-display text-xl font-bold">

AGROLENS

</span>

</div>


<nav className="flex items-center gap-3">

<Link
to="/loginpage"
className="text-sm text-muted-foreground hover:text-foreground"
>

Login

</Link>


<Link
to="/signuppage"
className="rounded-full bg-gradient-to-r from-ag-green to-ag-cyan px-4 py-2 text-sm font-semibold text-[#0F172A]"
>

Get Started

</Link>

</nav>

</div>

</header>


{/* HERO */}

<section className="mx-auto max-w-7xl px-6 py-16">

<div className="grid gap-12 lg:grid-cols-2 items-center">

<div>

<span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1 text-xs uppercase tracking-widest">

<Sparkles className="h-3 w-3"/>

Climate Intelligence Platform

</span>


<h1 className="mt-6 font-display text-5xl font-bold leading-tight md:text-7xl">

Agricultural<br/>

<span className="bg-gradient-to-r from-ag-green via-ag-cyan to-ag-amber bg-clip-text text-transparent">

 Intelligence

</span>

for West Africa

</h1>


<p className="mt-6 max-w-xl text-muted-foreground">

Real-time weather intelligence, pest forecasting,
climate analysis, and crop insights built for
West African agriculture.

</p>


<div className="mt-8 flex gap-3 flex-wrap">

<Link

to="/signuppage"

className="rounded-full bg-gradient-to-r from-ag-green to-ag-cyan px-6 py-3 font-semibold text-[#0F172A]"

>

Start Free

</Link>


<Link

to="/login"

className="rounded-full border border-border px-6 py-3"

>

Login

</Link>

</div>


<div className="mt-10 grid grid-cols-3 gap-3">

{[
["4","Countries"],
["24/7","Climate Data"],
["Live","Pest Monitoring"]
].map(s=>(

<div
key={s[1]}
className="surface-card p-4 text-center"
>

<div className="text-2xl font-bold">

{s[0]}

</div>

<div className="text-xs text-muted-foreground">

{s[1]}

</div>

</div>

))}

</div>

</div>


{/* MAP PREVIEW */}

<div>

<div className="surface-card p-5 ">

<div className="flex items-center justify-between">

<h2 className="font-semibold">

Climate Coverage

</h2>

<Map className="h-5 w-5"/>

</div>


<div className="mt-5">

<ClimateMap/>

</div>


<p className="mt-4 text-sm text-muted-foreground">

Explore weather intelligence across West African capitals.

</p>

</div>

</div>

</div>

</section>


{/* FEATURES */}

<section className="mx-auto max-w-7xl px-6 py-12">

<div className="grid gap-5 md:grid-cols-3">

{[

{

icon:CloudRain,

title:"Weather Intelligence",

body:"Live weather forecasts with agricultural impact analysis."

},

{

icon:Bug,

title:"Pest Radar",

body:"Climate-driven pest prediction and disease monitoring."

},

{

icon:Activity,

title:"Analysis Engine",

body:"Analyze crop suitability using environmental signals."

}

].map(f=>{

const Icon=f.icon;

return(

<div
key={f.title}
className="surface-card p-6"
>

<Icon className="h-6 w-6 text-ag-cyan"/>

<h3 className="mt-4 font-semibold text-lg">

{f.title}

</h3>

<p className="mt-2 text-sm text-muted-foreground">

{f.body}

</p>

</div>

);

})}

</div>

</section>


{/* WHY SECTION */}

<section className="mx-auto max-w-7xl px-6 py-16">

<div className="surface-card p-8">

<h2 className="text-3xl font-bold">

Why AGROLENS?

</h2>

<div className="mt-8 grid gap-6 md:grid-cols-3">

{[
[Shield,"Built for African agriculture"],
[TrendingUp,"Weather-driven insights"],
[ArrowRight,"Simple decisions faster"]
].map(([Icon,text],i)=>(

<div key={i}>

<Icon className="h-6 w-6 text-ag-green"/>

<p className="mt-3">

{text}

</p>

</div>

))}

</div>

</div>

</section>


{/* CTA */}

<section className="mx-auto max-w-7xl px-6 pb-24">

<div className="surface-elevated rounded-3xl p-10 text-center">

<h2 className="text-4xl font-bold">

Ready to start?

</h2>

<p className="mt-3 text-muted-foreground">

Create an account and explore climate intelligence.

</p>


<Link

to="/signuppage"

className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-ag-green to-ag-cyan px-6 py-3 font-semibold text-[#0F172A]"

>

Create Account

<ArrowRight className="h-4 w-4"/>

</Link>

</div>

</section>


<footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">

AGROLENS • Climate Intelligence Platform

</footer>

</div>

)

}