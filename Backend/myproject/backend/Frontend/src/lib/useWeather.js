import { useEffect, useState } from "react";

import { CAPITAL_COORDS }
from "./capitalCoordinates";

export function useWeather(region){

const [weather,setWeather]=useState({

loading:true,

temp:[],

humidity:[],

rain:[],

currentTemp:0,

currentHumidity:0,

error:null

});

useEffect(()=>{

async function load(){

try{

const city =
region?.name;

const coords =
CAPITAL_COORDS[city];

if(!coords){

throw new Error(
"No coordinates"
);

}

const url=
`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m,relative_humidity_2m,precipitation&forecast_days=2&timezone=auto`;

const res=
await fetch(url);

const data=
await res.json();

const start =
new Date().getHours();

const temp =
data.hourly.temperature_2m
.slice(start,start+12);

const humidity =
data.hourly.relative_humidity_2m
.slice(start,start+12);

const rain =
data.hourly.precipitation
.slice(start,start+12)
.map(
v=>Math.min(v/10,1)
);

setWeather({

loading:false,

temp,

humidity,

rain,

currentTemp:
Math.round(
temp[0]
),

currentHumidity:
Math.round(
humidity[0]
),

error:null

});

}

catch(err){

console.log(err);

setWeather(prev=>({

...prev,

loading:false,

error:
"Weather unavailable"

}));

}

}

load();

},[
region?.name
]);

return weather;

}