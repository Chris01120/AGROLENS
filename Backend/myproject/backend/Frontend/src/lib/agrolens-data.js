export const ZONES = [
    { id: "humid-forest", name: "Humid Forest", emoji: "🌿", description: "High rainfall, dense canopy", tint: "bg-[color-mix(in_oklab,var(--sage)_25%,transparent)]" },
    { id: "savanna", name: "Savanna", emoji: "🌾", description: "Grasslands, distinct dry season", tint: "bg-[color-mix(in_oklab,var(--terracotta-soft)_35%,transparent)]" },
    { id: "coastal", name: "Coastal", emoji: "🌊", description: "Humid, sandy soils, sea breeze", tint: "bg-[color-mix(in_oklab,oklch(0.75_0.08_220)_30%,transparent)]" },
    { id: "semi-arid", name: "Semi-Arid", emoji: "☀️", description: "Low rainfall, hot, sparse vegetation", tint: "bg-[color-mix(in_oklab,var(--terracotta)_30%,transparent)]" },
];
export const REGIONS = [
    { id: "lagos", name: "Lagos", country: "Nigeria", primaryZone: "coastal", season: "Rainy" },
    { id: "ibadan", name: "Ibadan", country: "Nigeria", primaryZone: "humid-forest", season: "Rainy" },
    { id: "kano", name: "Kano", country: "Nigeria", primaryZone: "semi-arid", season: "Harmattan" },
    { id: "kaduna", name: "Kaduna", country: "Nigeria", primaryZone: "savanna", season: "Early Rains" },
    { id: "accra", name: "Accra", country: "Ghana", primaryZone: "coastal", season: "Dry" },
    { id: "tamale", name: "Tamale", country: "Ghana", primaryZone: "savanna", season: "Rainy" },
    { id: "abidjan", name: "Abidjan", country: "Côte d'Ivoire", primaryZone: "humid-forest", season: "Rainy" },
    { id: "dakar", name: "Dakar", country: "Senegal", primaryZone: "semi-arid", season: "Dry" },
];
export const CROPS = [
//     {
//     id: "tomato",
//     name: "Tomato",
//     emoji: "🍅",
//     growthDays: 80,
//     soil: "Fertile, loamy, well-drained",
//     sunlight: "Full sun (6–8 hours daily)",
//     water: "Moderate, regular watering; avoid waterlogging and wet foliage",
//     fertilizer: "Apply NPK 15-15-15 at transplanting and again at flowering; supplement with compost",
//     planting: "Raise seedlings in a nursery for 3–4 weeks before transplanting",
//     scores: {
//         "humid-forest": 7,
//         savanna: 9,
//         coastal: 7,
//         "semi-arid": 4
//     },
//     risks: [
//         {
//             label: "Disease Risk",
//             level: "High",
//             note: "High humidity increases the risk of early blight, late blight and bacterial wilt."
//         },
//         {
//             label: "Pest Risk",
//             level: "Medium",
//             note: "Whiteflies, aphids and tomato fruit borers are common."
//         },
//         {
//             label: "Waterlogging",
//             level: "High",
//             note: "Poor drainage can cause root rot and reduce yield."
//         }
//     ],
//     bestSeason: ["Early Rains", "Dry Season (with irrigation)"],
//     tags: [
//         "High Value",
//         "Disease Sensitive",
//         "Well-Drained Soil"
//     ]
// },
//     {
//         id: "corn",
//         name: "Corn (Maize)",
//         emoji: "🌽",
//         growthDays: 110,
//         soil: "Deep, fertile loam",
//         sunlight: "Full sun",
//         water: "60–80 mm per week",
//         fertilizer: "Urea topdress at knee-high stage",
//         planting: "Direct sow at onset of rains, 25cm spacing",
//         scores: { "humid-forest": 7, savanna: 9, coastal: 6, "semi-arid": 5 },
//         risks: [
//             { label: "Drought Risk", level: "Medium", note: "Critical during tasseling" },
//             { label: "Stem Borer", level: "Medium", note: "Scout weekly after 30 days" },
//             { label: "Storage Mold", level: "Low", note: "Dry to 13% moisture before storage" },
//         ],
//         bestSeason: ["Rainy", "Early Rains"],
//         tags: ["Staple Crop", "Rain-fed Ready"],
//     },
//     {
//         id: "cassava",
//         name: "Cassava",
//         emoji: "🌱",
//         growthDays: 300,
//         soil: "Sandy loam, tolerates poor soils",
//         sunlight: "Full sun",
//         water: "Drought tolerant once established",
//         fertilizer: "Light NPK at 8 weeks",
//         planting: "Stem cuttings at 1m × 1m spacing",
//         scores: { "humid-forest": 8, savanna: 8, coastal: 7, "semi-arid": 6 },
//         risks: [
//             { label: "Mosaic Virus", level: "Medium", note: "Use disease-free cuttings" },
//             { label: "Rodent Damage", level: "Low", note: "Protect mature tubers" },
//         ],
//         bestSeason: ["Rainy", "Early Rains"],
//         tags: ["Drought Tolerant", "Long Cycle", "Food Security"],
//     },
//     {
//         id: "rice",
//         name: "Rice",
//         emoji: "🌾",
//         growthDays: 120,
//         soil: "Clay, water-retentive",
//         sunlight: "Full sun",
//         water: "Standing water 5–10cm (paddy)",
//         fertilizer: "Split urea applications",
//         planting: "Transplant 21-day seedlings",
//         scores: { "humid-forest": 9, savanna: 7, coastal: 8, "semi-arid": 3 },
//         risks: [
//             { label: "Blast Disease", level: "High", note: "Common in high humidity" },
//             { label: "Bird Damage", level: "Medium", note: "Scare birds at grain filling" },
//         ],
//         bestSeason: ["Rainy"],
//         tags: ["Water Intensive", "Best in Forest"],
//     },
//     {
//         id: "yam",
//         name: "Yam",
//         emoji: "🥔",
//         growthDays: 270,
//         soil: "Deep, friable loam",
//         sunlight: "Full sun, tolerates partial",
//         water: "Moderate, consistent",
//         fertilizer: "Organic compost preferred",
//         planting: "Plant setts on mounds at season start",
//         scores: { "humid-forest": 8, savanna: 7, coastal: 6, "semi-arid": 3 },
//         risks: [
//             { label: "Tuber Rot", level: "Medium", note: "Caused by waterlogging" },
//             { label: "Nematodes", level: "Medium", note: "Rotate with cereals" },
//         ],
//         bestSeason: ["Early Rains", "Rainy"],
//         tags: ["High Value", "Labor Intensive"],
//     },
//     {
//         id: "sorghum",
//         name: "Sorghum",
//         emoji: "🌾",
//         growthDays: 120,
//         soil: "Wide tolerance, prefers loam",
//         sunlight: "Full sun",
//         water: "Highly drought tolerant",
//         fertilizer: "Modest N requirement",
//         planting: "Direct sow, thin to 20cm",
//         scores: { "humid-forest": 4, savanna: 8, coastal: 5, "semi-arid": 9 },
//         risks: [
//             { label: "Bird Damage", level: "High", note: "Major yield loss factor" },
//             { label: "Smut", level: "Low", note: "Use treated seed" },
//         ],
//         bestSeason: ["Rainy", "Early Rains"],
//         tags: ["Drought Tolerant", "Best in Semi-Arid"],
//     },
//     {
//         id: "millet",
//         name: "Millet",
//         emoji: "🌾",
//         growthDays: 90,
//         soil: "Sandy, low fertility tolerated",
//         sunlight: "Full sun",
//         water: "Very drought tolerant",
//         fertilizer: "Low input crop",
//         planting: "Broadcast or row plant at first rains",
//         scores: { "humid-forest": 3, savanna: 8, coastal: 4, "semi-arid": 9 },
//         risks: [
//             { label: "Downy Mildew", level: "Medium", note: "Resistant varieties available" },
//             { label: "Bird Damage", level: "High", note: "Scare at grain filling" },
//         ],
//         bestSeason: ["Early Rains", "Rainy"],
//         tags: ["Drought Tolerant", "Short Cycle"],
//     },
    {
        id: "cocoa",
        name: "Cocoa",
        emoji: "🍫",
        growthDays: 1825,
        soil: "Deep, well-drained loam",
        sunlight: "Partial shade",
        water: "1500mm+ annual rainfall",
        fertilizer: "Balanced NPK twice yearly",
        planting: "Under shade trees, 3m × 3m",
        scores: { "humid-forest": 9, savanna: 3, coastal: 7, "semi-arid": 1 },
        risks: [
            { label: "Black Pod", level: "High", note: "Fungal disease in wet seasons" },
            { label: "Capsid Bugs", level: "Medium", note: "Spray during flush" },
        ],
        bestSeason: ["Rainy"],
        tags: ["Cash Crop", "Forest Only", "Long Term"],
    },
];
export function scoreLabel(score) {
    const value = Number(score) || 0;

    if (value >= 8) {
        return {
            label: "High Suitability",
            tone: "success"
        };
    }

    if (value >= 5) {
        return {
            label: "Moderate Suitability",
            tone: "warning"
        };
    }

    return {
        label: "Low Suitability",
        tone: "danger"
    };
}
export function zoneById(id) {
    return ZONES.find((z) => z.id === id);
}
