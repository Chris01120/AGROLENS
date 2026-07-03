from django.core.management.base import BaseCommand
from crops.models import Crop, ClimateZone, CropZone, PestAlert


class Command(BaseCommand):
    help = "Seed West African crop intelligence data"

    def handle(self, *args, **kwargs):

        # Clear old crop intelligence
        CropZone.objects.all().delete()
        PestAlert.objects.all().delete()
        Crop.objects.all().delete()

        zones = {
            z.name.lower(): z for z in ClimateZone.objects.all()
        }


        crops = [

            {
                "id": "cocoa",
                "name": "Cocoa",
                "emoji": "🍫",
                "growthDays": 1825,
                "soil": "Deep, well-drained loam",
                "sunlight": "Partial shade",
                "water": "1500mm+ annual rainfall",
                "fertilizer": "Balanced NPK twice yearly",
                "planting": "Under shade trees, 3m × 3m",

                "scores": {
                    "humid-forest": 9,
                    "savanna": 3,
                    "coastal": 7,
                    "semi-arid": 1
                },

                "risks": [
                    {
                        "label": "Black Pod",
                        "level": "High",
                        "note": "Fungal disease in wet seasons"
                    },
                    {
                        "label": "Capsid Bugs",
                        "level": "Medium",
                        "note": "Spray during flush"
                    }
                ],

                "bestSeason": ["Rainy"],
                "tags": [
                    "Cash Crop",
                    "Forest Only",
                    "Long Term"
                ],
            },


{
    "id": "rice",
    "name": "Rice",
    "emoji": "🌾",
    "growthDays": 120,
    "soil": "Clay loam",
    "sunlight": "Full sun",
    "water": "Requires plenty of water",
    "fertilizer": "Nitrogen and potassium fertilizer",
    "planting": "Wet fields or irrigated areas",

    "scores": {
        "humid-forest": 7,
        "savanna": 8,
        "coastal": 6,
        "semi-arid": 2
    },

    "risks": [
        {
            "label": "Rice Blast",
            "level": "High",
            "note": "Fungal disease common in humid conditions"
        },
        {
            "label": "Stem Borer",
            "level": "Medium",
            "note": "Can reduce plant growth"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Staple", "Food Crop"]
},


{
    "id": "maize",
    "name": "Maize",
    "emoji": "🌽",
    "growthDays": 90,
    "soil": "Fertile loam soil",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "NPK fertilizer and nitrogen top dressing",
    "planting": "Rows with 75cm spacing",

    "scores": {
        "humid-forest": 7,
        "savanna": 9,
        "coastal": 6,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Fall Armyworm",
            "level": "High",
            "note": "Feeds on young leaves"
        },
        {
            "label": "Stalk Rot",
            "level": "Medium",
            "note": "More common during wet periods"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Staple", "Fast Growing"]
},


{
    "id": "cassava",
    "name": "Cassava",
    "emoji": "🥔",
    "growthDays": 365,
    "soil": "Sandy loam soil",
    "sunlight": "Full sun",
    "water": "Drought tolerant after establishment",
    "fertilizer": "Potassium-rich fertilizer",
    "planting": "Stem cuttings planted in rows",

    "scores": {
        "humid-forest": 9,
        "savanna": 8,
        "coastal": 8,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Cassava Mosaic Disease",
            "level": "High",
            "note": "Virus spread by whiteflies"
        },
        {
            "label": "Mealybug",
            "level": "Medium",
            "note": "Damages young shoots"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Staple", "Drought Resistant"]
},


{
    "id": "yam",
    "name": "Yam",
    "emoji": "🍠",
    "growthDays": 240,
    "soil": "Loose fertile loam",
    "sunlight": "Full sun",
    "water": "Regular rainfall needed",
    "fertilizer": "Organic manure and potassium fertilizer",
    "planting": "Mounds or ridges",

    "scores": {
        "humid-forest": 8,
        "savanna": 7,
        "coastal": 5,
        "semi-arid": 3
    },

    "risks": [
        {
            "label": "Yam Beetle",
            "level": "Medium",
            "note": "Attacks tubers underground"
        },
        {
            "label": "Anthracnose",
            "level": "Medium",
            "note": "Leaf disease during wet seasons"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Staple", "Root Crop"]
},


{
    "id": "oil-palm",
    "name": "Oil Palm",
    "emoji": "🌴",
    "growthDays": 1095,
    "soil": "Deep fertile loam",
    "sunlight": "Full sun",
    "water": "High rainfall and humidity",
    "fertilizer": "NPK fertilizer and organic manure",
    "planting": "Spacing around 8m × 8m",

    "scores": {
        "humid-forest": 10,
        "savanna": 5,
        "coastal": 8,
        "semi-arid": 1
    },

    "risks": [
        {
            "label": "Bud Rot",
            "level": "High",
            "note": "Fungal infection during wet periods"
        },
        {
            "label": "Palm Weevil",
            "level": "Medium",
            "note": "Damages the palm trunk"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Cash Crop", "Long Term"]
},


{
    "id": "plantain",
    "name": "Plantain",
    "emoji": "🍌",
    "growthDays": 365,
    "soil": "Rich well-drained loam",
    "sunlight": "Full sun",
    "water": "Regular rainfall",
    "fertilizer": "Potassium-rich fertilizer",
    "planting": "Suckers planted with wide spacing",

    "scores": {
        "humid-forest": 9,
        "savanna": 6,
        "coastal": 8,
        "semi-arid": 3
    },

    "risks": [
        {
            "label": "Black Sigatoka",
            "level": "High",
            "note": "Leaf disease affecting yield"
        },
        {
            "label": "Weevils",
            "level": "Medium",
            "note": "Attack plant roots"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Staple"]
},


{
    "id": "tomato",
    "name": "Tomato",
    "emoji": "🍅",
    "growthDays": 90,
    "soil": "Sandy loam soil",
    "sunlight": "Full sun",
    "water": "Moderate irrigation",
    "fertilizer": "Balanced NPK fertilizer",
    "planting": "Raised beds with spacing",

    "scores": {
        "humid-forest": 6,
        "savanna": 8,
        "coastal": 6,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Late Blight",
            "level": "High",
            "note": "Fungal disease during wet weather"
        },
        {
            "label": "Fruit Borer",
            "level": "Medium",
            "note": "Damages fruits"
        }
    ],

    "bestSeason": ["Dry", "Rainy"],
    "tags": ["Vegetable", "Fast Growing"]
},


{
    "id": "pepper",
    "name": "Pepper",
    "emoji": "🌶️",
    "growthDays": 120,
    "soil": "Fertile loam",
    "sunlight": "Full sun",
    "water": "Moderate watering",
    "fertilizer": "Compost and NPK fertilizer",
    "planting": "Rows with proper spacing",

    "scores": {
        "humid-forest": 7,
        "savanna": 8,
        "coastal": 7,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Aphids",
            "level": "Medium",
            "note": "Spread viruses and weaken plants"
        },
        {
            "label": "Fruit Rot",
            "level": "Medium",
            "note": "Can occur from excess moisture"
        }
    ],

    "bestSeason": ["Dry", "Rainy"],
    "tags": ["Vegetable", "Market Crop"]
},

{
    "id": "coffee",
    "name": "Coffee",
    "emoji": "☕",
    "growthDays": 1460,
    "soil": "Rich volcanic or loamy soil",
    "sunlight": "Partial shade",
    "water": "High rainfall with good drainage",
    "fertilizer": "Nitrogen and potassium fertilizer",
    "planting": "Planted under shade trees",

    "scores": {
        "humid-forest": 8,
        "savanna": 4,
        "coastal": 6,
        "semi-arid": 1
    },

    "risks": [
        {
            "label": "Coffee Leaf Rust",
            "level": "High",
            "note": "Fungal disease affecting leaves"
        },
        {
            "label": "Berry Borer",
            "level": "Medium",
            "note": "Damages coffee beans"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Cash Crop", "Long Term"]
},


{
    "id": "cotton",
    "name": "Cotton",
    "emoji": "☁️",
    "growthDays": 180,
    "soil": "Well-drained sandy loam",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Nitrogen fertilizer",
    "planting": "Rows with wide spacing",

    "scores": {
        "humid-forest": 4,
        "savanna": 9,
        "coastal": 5,
        "semi-arid": 7
    },

    "risks": [
        {
            "label": "Bollworm",
            "level": "High",
            "note": "Damages cotton bolls"
        },
        {
            "label": "Aphids",
            "level": "Medium",
            "note": "Weakens young plants"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Cash Crop", "Industrial"]
},


{
    "id": "mango",
    "name": "Mango",
    "emoji": "🥭",
    "growthDays": 1460,
    "soil": "Deep well-drained loam",
    "sunlight": "Full sun",
    "water": "Moderate water requirement",
    "fertilizer": "Organic manure and NPK",
    "planting": "Wide spacing between trees",

    "scores": {
        "humid-forest": 7,
        "savanna": 8,
        "coastal": 7,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Fruit Fly",
            "level": "High",
            "note": "Damages ripe fruits"
        },
        {
            "label": "Anthracnose",
            "level": "Medium",
            "note": "Fungal fruit disease"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Tree Crop"]
},


{
    "id": "sorghum",
    "name": "Sorghum",
    "emoji": "🌾",
    "growthDays": 120,
    "soil": "Sandy loam soil",
    "sunlight": "Full sun",
    "water": "Low to moderate rainfall",
    "fertilizer": "Nitrogen fertilizer",
    "planting": "Direct seed planting",

    "scores": {
        "humid-forest": 3,
        "savanna": 10,
        "coastal": 4,
        "semi-arid": 8
    },

    "risks": [
        {
            "label": "Bird Damage",
            "level": "Medium",
            "note": "Birds attack mature grains"
        },
        {
            "label": "Striga Weed",
            "level": "High",
            "note": "Parasitic weed affecting roots"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Staple", "Drought Resistant"]
},


{
    "id": "millet",
    "name": "Millet",
    "emoji": "🌾",
    "growthDays": 90,
    "soil": "Poor sandy soils",
    "sunlight": "Full sun",
    "water": "Low rainfall requirement",
    "fertilizer": "Organic manure",
    "planting": "Direct seeding",

    "scores": {
        "humid-forest": 2,
        "savanna": 10,
        "coastal": 3,
        "semi-arid": 9
    },

    "risks": [
        {
            "label": "Downy Mildew",
            "level": "Medium",
            "note": "Fungal disease"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Staple", "Drought Resistant"]
},


{
    "id": "onion",
    "name": "Onion",
    "emoji": "🧅",
    "growthDays": 120,
    "soil": "Sandy loam soil",
    "sunlight": "Full sun",
    "water": "Regular irrigation",
    "fertilizer": "Phosphorus and potassium fertilizer",
    "planting": "Raised beds",

    "scores": {
        "humid-forest": 5,
        "savanna": 8,
        "coastal": 5,
        "semi-arid": 7
    },

    "risks": [
        {
            "label": "Thrips",
            "level": "Medium",
            "note": "Damages leaves"
        },
        {
            "label": "Purple Blotch",
            "level": "Medium",
            "note": "Leaf fungal disease"
        }
    ],

    "bestSeason": ["Dry"],
    "tags": ["Vegetable", "Market Crop"]
},


{
    "id": "groundnut",
    "name": "Groundnut",
    "emoji": "🥜",
    "growthDays": 120,
    "soil": "Sandy loam soil",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Phosphorus fertilizer",
    "planting": "Seeds planted in rows",

    "scores": {
        "humid-forest": 5,
        "savanna": 9,
        "coastal": 6,
        "semi-arid": 7
    },

    "risks": [
        {
            "label": "Leaf Spot",
            "level": "High",
            "note": "Fungal disease affecting leaves"
        },
        {
            "label": "Pod Rot",
            "level": "Medium",
            "note": "Affects underground pods"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Cash Crop", "Food Crop"]
},


{
    "id": "beans",
    "name": "Beans",
    "emoji": "🫘",
    "growthDays": 90,
    "soil": "Well-drained loam",
    "sunlight": "Full sun",
    "water": "Moderate water requirement",
    "fertilizer": "Phosphorus and potassium fertilizer",
    "planting": "Direct seed planting",

    "scores": {
        "humid-forest": 7,
        "savanna": 8,
        "coastal": 6,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Bean Beetle",
            "level": "Medium",
            "note": "Feeds on leaves"
        },
        {
            "label": "Rust Disease",
            "level": "Medium",
            "note": "Fungal infection"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Staple", "Legume"]
},


{
    "id": "cashew",
    "name": "Cashew",
    "emoji": "🥜",
    "growthDays": 1095,
    "soil": "Sandy well-drained soil",
    "sunlight": "Full sun",
    "water": "Low to moderate rainfall",
    "fertilizer": "Organic manure and NPK",
    "planting": "Wide spacing trees",

    "scores": {
        "humid-forest": 5,
        "savanna": 8,
        "coastal": 7,
        "semi-arid": 6
    },

    "risks": [
        {
            "label": "Anthracnose",
            "level": "Medium",
            "note": "Fungal disease affecting fruits"
        },
        {
            "label": "Fruit Rot",
            "level": "Medium",
            "note": "Occurs in wet conditions"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Cash Crop", "Tree Crop"]
},


{
    "id": "pineapple",
    "name": "Pineapple",
    "emoji": "🍍",
    "growthDays": 540,
    "soil": "Sandy loam soil",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Nitrogen fertilizer",
    "planting": "Crowns or suckers",

    "scores": {
        "humid-forest": 8,
        "savanna": 6,
        "coastal": 8,
        "semi-arid": 3
    },

    "risks": [
        {
            "label": "Mealybug",
            "level": "High",
            "note": "Weakens plants"
        },
        {
            "label": "Heart Rot",
            "level": "Medium",
            "note": "Caused by excess moisture"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Market Crop"]
},


{
    "id": "watermelon",
    "name": "Watermelon",
    "emoji": "🍉",
    "growthDays": 90,
    "soil": "Sandy loam soil",
    "sunlight": "Full sun",
    "water": "Regular watering",
    "fertilizer": "Potassium-rich fertilizer",
    "planting": "Raised beds with spacing",

    "scores": {
        "humid-forest": 5,
        "savanna": 8,
        "coastal": 6,
        "semi-arid": 7
    },

    "risks": [
        {
            "label": "Fruit Fly",
            "level": "High",
            "note": "Damages developing fruits"
        },
        {
            "label": "Powdery Mildew",
            "level": "Medium",
            "note": "Fungal disease on leaves"
        }
    ],

    "bestSeason": ["Dry"],
    "tags": ["Fruit", "Fast Growing"]
},


{
    "id": "cucumber",
    "name": "Cucumber",
    "emoji": "🥒",
    "growthDays": 60,
    "soil": "Fertile sandy loam",
    "sunlight": "Full sun",
    "water": "Regular watering",
    "fertilizer": "Nitrogen and potassium fertilizer",
    "planting": "Raised beds with support trellis",

    "scores": {
        "humid-forest": 7,
        "savanna": 7,
        "coastal": 7,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Powdery Mildew",
            "level": "Medium",
            "note": "Fungal disease affecting leaves"
        },
        {
            "label": "Fruit Fly",
            "level": "Medium",
            "note": "Damages young fruits"
        }
    ],

    "bestSeason": ["Rainy", "Dry"],
    "tags": ["Vegetable", "Fast Growing"]
},


{
    "id": "okra",
    "name": "Okra",
    "emoji": "🌱",
    "growthDays": 60,
    "soil": "Well-drained loam",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Organic manure and NPK",
    "planting": "Seeds planted in rows",

    "scores": {
        "humid-forest": 8,
        "savanna": 9,
        "coastal": 7,
        "semi-arid": 6
    },

    "risks": [
        {
            "label": "Aphids",
            "level": "Medium",
            "note": "Attack leaves and stems"
        },
        {
            "label": "Pod Borer",
            "level": "Medium",
            "note": "Damages pods"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Vegetable", "Staple"]
},


{
    "id": "sweet-potato",
    "name": "Sweet Potato",
    "emoji": "🍠",
    "growthDays": 120,
    "soil": "Sandy loam soil",
    "sunlight": "Full sun",
    "water": "Drought tolerant after growth",
    "fertilizer": "Potassium-rich fertilizer",
    "planting": "Vine cuttings on ridges",

    "scores": {
        "humid-forest": 8,
        "savanna": 8,
        "coastal": 7,
        "semi-arid": 6
    },

    "risks": [
        {
            "label": "Sweet Potato Weevil",
            "level": "High",
            "note": "Damages roots"
        },
        {
            "label": "Leaf Spot",
            "level": "Medium",
            "note": "Affects foliage"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Root Crop", "Staple"]
},


{
    "id": "ginger",
    "name": "Ginger",
    "emoji": "🫚",
    "growthDays": 270,
    "soil": "Rich loose loam",
    "sunlight": "Partial shade",
    "water": "High moisture requirement",
    "fertilizer": "Compost and potassium fertilizer",
    "planting": "Rhizome pieces planted in rows",

    "scores": {
        "humid-forest": 9,
        "savanna": 5,
        "coastal": 7,
        "semi-arid": 2
    },

    "risks": [
        {
            "label": "Rhizome Rot",
            "level": "High",
            "note": "Caused by excess moisture"
        },
        {
            "label": "Leaf Spot",
            "level": "Medium",
            "note": "Fungal leaf disease"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Spice", "Cash Crop"]
},


{
    "id": "cabbage",
    "name": "Cabbage",
    "emoji": "🥬",
    "growthDays": 90,
    "soil": "Fertile loam",
    "sunlight": "Full sun",
    "water": "Regular irrigation",
    "fertilizer": "Nitrogen-rich fertilizer",
    "planting": "Nursery seedlings transplanted",

    "scores": {
        "humid-forest": 6,
        "savanna": 8,
        "coastal": 6,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Cabbage Worm",
            "level": "High",
            "note": "Feeds on leaves"
        },
        {
            "label": "Black Rot",
            "level": "Medium",
            "note": "Bacterial leaf disease"
        }
    ],

    "bestSeason": ["Dry"],
    "tags": ["Vegetable", "Market Crop"]
},


{
    "id": "avocado",
    "name": "Avocado",
    "emoji": "🥑",
    "growthDays": 1460,
    "soil": "Deep well-drained loam",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Nitrogen and potassium fertilizer",
    "planting": "Wide spacing between trees",

    "scores": {
        "humid-forest": 7,
        "savanna": 5,
        "coastal": 8,
        "semi-arid": 3
    },

    "risks": [
        {
            "label": "Root Rot",
            "level": "High",
            "note": "Caused by poor drainage"
        },
        {
            "label": "Fruit Spot",
            "level": "Medium",
            "note": "Fungal disease on fruits"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Tree Crop"]
},


{
    "id": "orange",
    "name": "Orange",
    "emoji": "🍊",
    "growthDays": 1095,
    "soil": "Sandy loam soil",
    "sunlight": "Full sun",
    "water": "Regular watering",
    "fertilizer": "NPK and organic manure",
    "planting": "Orchard spacing",

    "scores": {
        "humid-forest": 7,
        "savanna": 7,
        "coastal": 8,
        "semi-arid": 4
    },

    "risks": [
        {
            "label": "Citrus Canker",
            "level": "High",
            "note": "Bacterial disease affecting leaves and fruits"
        },
        {
            "label": "Fruit Fly",
            "level": "Medium",
            "note": "Damages fruits"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Tree Crop"]
},


{
    "id": "lettuce",
    "name": "Lettuce",
    "emoji": "🥬",
    "growthDays": 45,
    "soil": "Rich moist loam",
    "sunlight": "Partial shade",
    "water": "Frequent watering",
    "fertilizer": "Nitrogen fertilizer",
    "planting": "Seed beds or containers",

    "scores": {
        "humid-forest": 6,
        "savanna": 5,
        "coastal": 7,
        "semi-arid": 4
    },

    "risks": [
        {
            "label": "Aphids",
            "level": "Medium",
            "note": "Attack leaves"
        },
        {
            "label": "Leaf Rot",
            "level": "Medium",
            "note": "Can happen in wet conditions"
        }
    ],

    "bestSeason": ["Dry"],
    "tags": ["Vegetable", "Fast Growing"]
},


{
    "id": "turmeric",
    "name": "Turmeric",
    "emoji": "🟡",
    "growthDays": 270,
    "soil": "Rich loose loam",
    "sunlight": "Partial shade",
    "water": "High moisture requirement",
    "fertilizer": "Organic manure and NPK",
    "planting": "Rhizomes planted in rows",

    "scores": {
        "humid-forest": 9,
        "savanna": 5,
        "coastal": 7,
        "semi-arid": 2
    },

    "risks": [
        {
            "label": "Rhizome Rot",
            "level": "High",
            "note": "Fungal disease in wet soils"
        },
        {
            "label": "Leaf Spot",
            "level": "Medium",
            "note": "Reduces leaf health"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Spice", "Cash Crop"]
},


{
    "id": "sugarcane",
    "name": "Sugarcane",
    "emoji": "🎋",
    "growthDays": 365,
    "soil": "Deep fertile loam",
    "sunlight": "Full sun",
    "water": "High water requirement",
    "fertilizer": "Nitrogen fertilizer",
    "planting": "Stem cuttings in rows",

    "scores": {
        "humid-forest": 7,
        "savanna": 8,
        "coastal": 7,
        "semi-arid": 4
    },

    "risks": [
        {
            "label": "Stem Borer",
            "level": "High",
            "note": "Damages cane stems"
        },
        {
            "label": "Red Rot",
            "level": "Medium",
            "note": "Fungal disease"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Cash Crop", "Industrial"]
},


{
    "id": "rubber",
    "name": "Rubber",
    "emoji": "🌳",
    "growthDays": 2190,
    "soil": "Deep fertile loam",
    "sunlight": "Full sun",
    "water": "High rainfall and humidity",
    "fertilizer": "NPK fertilizer",
    "planting": "Wide spacing plantation",

    "scores": {
        "humid-forest": 10,
        "savanna": 2,
        "coastal": 8,
        "semi-arid": 1
    },

    "risks": [
        {
            "label": "Leaf Fall Disease",
            "level": "High",
            "note": "Fungal disease affecting leaves"
        },
        {
            "label": "Stem Damage",
            "level": "Medium",
            "note": "Affects latex production"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Cash Crop", "Long Term"]
},


{
    "id": "sesame",
    "name": "Sesame",
    "emoji": "🌱",
    "growthDays": 100,
    "soil": "Sandy loam soil",
    "sunlight": "Full sun",
    "water": "Low to moderate rainfall",
    "fertilizer": "Nitrogen and phosphorus fertilizer",
    "planting": "Direct seed planting",

    "scores": {
        "humid-forest": 4,
        "savanna": 9,
        "coastal": 5,
        "semi-arid": 8
    },

    "risks": [
        {
            "label": "Webworm",
            "level": "Medium",
            "note": "Damages leaves"
        },
        {
            "label": "Leaf Spot",
            "level": "Medium",
            "note": "Fungal infection"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Cash Crop", "Oil Seed"]
},


{
    "id": "egusi",
    "name": "Egusi",
    "emoji": "🎃",
    "growthDays": 120,
    "soil": "Sandy loam soil",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Organic manure",
    "planting": "Seeds planted on mounds",

    "scores": {
        "humid-forest": 8,
        "savanna": 7,
        "coastal": 7,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Powdery Mildew",
            "level": "Medium",
            "note": "Fungal leaf disease"
        },
        {
            "label": "Fruit Rot",
            "level": "Medium",
            "note": "Occurs with excess moisture"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Staple", "Seed Crop"]
},


{
    "id": "kola-nut",
    "name": "Kola Nut",
    "emoji": "🌰",
    "growthDays": 2190,
    "soil": "Deep humid forest soil",
    "sunlight": "Partial shade",
    "water": "High rainfall",
    "fertilizer": "Organic manure and NPK",
    "planting": "Under forest-like shade",

    "scores": {
        "humid-forest": 9,
        "savanna": 3,
        "coastal": 8,
        "semi-arid": 1
    },

    "risks": [
        {
            "label": "Pod Rot",
            "level": "Medium",
            "note": "Fungal infection during wet seasons"
        },
        {
            "label": "Insect Damage",
            "level": "Medium",
            "note": "Affects nuts"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Cash Crop", "Tree Crop"]
},


{
    "id": "fonio",
    "name": "Fonio",
    "emoji": "🌾",
    "growthDays": 90,
    "soil": "Poor sandy soils",
    "sunlight": "Full sun",
    "water": "Low rainfall requirement",
    "fertilizer": "Minimal fertilizer needed",
    "planting": "Broadcast seeding",

    "scores": {
        "humid-forest": 2,
        "savanna": 9,
        "coastal": 3,
        "semi-arid": 8
    },

    "risks": [
        {
            "label": "Bird Damage",
            "level": "Medium",
            "note": "Birds attack mature grains"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Staple", "Drought Resistant"]
},


{
    "id": "spinach",
    "name": "Spinach",
    "emoji": "🥬",
    "growthDays": 45,
    "soil": "Fertile well-drained loam",
    "sunlight": "Full sun to partial shade",
    "water": "Regular watering",
    "fertilizer": "Compost or nitrogen-rich fertilizer",
    "planting": "Direct seeding or transplanting",

    "scores": {
        "humid-forest": 8,
        "savanna": 7,
        "coastal": 8,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Leaf Miners",
            "level": "Medium",
            "note": "Create tunnels in leaves"
        },
        {
            "label": "Downy Mildew",
            "level": "Medium",
            "note": "Common during cool, humid weather"
        }
    ],

    "bestSeason": ["Rainy", "Dry"],
    "tags": ["Leafy Vegetable", "Fast Growing"]
},


{
    "id": "fluted-pumpkin",
    "name": "Fluted Pumpkin (Ugu)",
    "emoji": "🎃",
    "growthDays": 120,
    "soil": "Rich loamy soil",
    "sunlight": "Full sun",
    "water": "Moderate to high moisture",
    "fertilizer": "Organic manure and compost",
    "planting": "Seeds planted on mounds or ridges",

    "scores": {
        "humid-forest": 10,
        "savanna": 7,
        "coastal": 9,
        "semi-arid": 3
    },

    "risks": [
        {
            "label": "Leaf Spot",
            "level": "Medium",
            "note": "Fungal disease affecting leaves"
        },
        {
            "label": "Aphids",
            "level": "Medium",
            "note": "Can spread plant viruses"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Leafy Vegetable", "Indigenous Crop"]
},


{
    "id": "amaranth",
    "name": "Amaranth (Green)",
    "emoji": "🌿",
    "growthDays": 35,
    "soil": "Well-drained fertile soil",
    "sunlight": "Full sun",
    "water": "Moderate watering",
    "fertilizer": "Organic manure",
    "planting": "Broadcast seeding or rows",

    "scores": {
        "humid-forest": 9,
        "savanna": 8,
        "coastal": 8,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Leaf Caterpillars",
            "level": "Low",
            "note": "Can feed on young leaves"
        },
        {
            "label": "Leaf Spot",
            "level": "Low",
            "note": "Occurs in humid conditions"
        }
    ],

    "bestSeason": ["Rainy", "Dry"],
    "tags": ["Leafy Vegetable", "Fast Growing"]
},


{
    "id": "garden-egg",
    "name": "Garden Egg",
    "emoji": "🍆",
    "growthDays": 120,
    "soil": "Fertile loam soil",
    "sunlight": "Full sun",
    "water": "Moderate watering",
    "fertilizer": "NPK fertilizer and compost",
    "planting": "Transplanted seedlings",

    "scores": {
        "humid-forest": 8,
        "savanna": 8,
        "coastal": 7,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Fruit Borer",
            "level": "High",
            "note": "Damages developing fruits"
        },
        {
            "label": "Bacterial Wilt",
            "level": "Medium",
            "note": "Can kill mature plants"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Vegetable", "Market Crop"]
},


{
    "id": "soybean",
    "name": "Soybean",
    "emoji": "🫘",
    "growthDays": 110,
    "soil": "Well-drained loam",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Phosphorus fertilizer",
    "planting": "Direct seeding in rows",

    "scores": {
        "humid-forest": 6,
        "savanna": 9,
        "coastal": 5,
        "semi-arid": 6
    },

    "risks": [
        {
            "label": "Soybean Rust",
            "level": "High",
            "note": "Fungal disease reducing yield"
        },
        {
            "label": "Pod Borer",
            "level": "Medium",
            "note": "Feeds on developing pods"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Legume", "Protein Crop"]
},


{
    "id": "cowpea",
    "name": "Cowpea",
    "emoji": "🫘",
    "growthDays": 75,
    "soil": "Well-drained sandy loam",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Phosphorus-rich fertilizer",
    "planting": "Direct seeding in rows",

    "scores": {
        "humid-forest": 6,
        "savanna": 10,
        "coastal": 5,
        "semi-arid": 8
    },

    "risks": [
        {
            "label": "Maruca Pod Borer",
            "level": "High",
            "note": "Damages flowers and pods"
        },
        {
            "label": "Aphids",
            "level": "Medium",
            "note": "Can transmit plant viruses"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Legume", "Staple", "Protein Crop"]
},


{
    "id": "cocoyam",
    "name": "Cocoyam",
    "emoji": "🥔",
    "growthDays": 240,
    "soil": "Moist fertile loam",
    "sunlight": "Partial shade",
    "water": "High moisture requirement",
    "fertilizer": "Organic manure",
    "planting": "Corms planted on ridges",

    "scores": {
        "humid-forest": 10,
        "savanna": 5,
        "coastal": 9,
        "semi-arid": 2
    },

    "risks": [
        {
            "label": "Taro Leaf Blight",
            "level": "High",
            "note": "Fungal disease affecting leaves"
        },
        {
            "label": "Root Rot",
            "level": "Medium",
            "note": "Occurs in poorly drained soils"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Root Crop", "Staple"]
},


{
    "id": "banana",
    "name": "Banana",
    "emoji": "🍌",
    "growthDays": 365,
    "soil": "Rich well-drained loam",
    "sunlight": "Full sun",
    "water": "Regular rainfall",
    "fertilizer": "Potassium-rich fertilizer",
    "planting": "Suckers planted with wide spacing",

    "scores": {
        "humid-forest": 9,
        "savanna": 6,
        "coastal": 8,
        "semi-arid": 3
    },

    "risks": [
        {
            "label": "Panama Disease",
            "level": "High",
            "note": "Soil-borne fungal disease"
        },
        {
            "label": "Banana Weevil",
            "level": "Medium",
            "note": "Damages the corm and roots"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Tree Crop"]
},


{
    "id": "papaya",
    "name": "Papaya",
    "emoji": "🍈",
    "growthDays": 300,
    "soil": "Well-drained sandy loam",
    "sunlight": "Full sun",
    "water": "Moderate watering",
    "fertilizer": "Organic manure and NPK",
    "planting": "Seedlings with wide spacing",

    "scores": {
        "humid-forest": 8,
        "savanna": 7,
        "coastal": 8,
        "semi-arid": 4
    },

    "risks": [
        {
            "label": "Papaya Ringspot Virus",
            "level": "High",
            "note": "Reduces fruit production"
        },
        {
            "label": "Fruit Fly",
            "level": "Medium",
            "note": "Damages ripening fruits"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Fast Bearing"]
},


{
    "id": "guava",
    "name": "Guava",
    "emoji": "🍐",
    "growthDays": 730,
    "soil": "Well-drained loamy soil",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Organic manure",
    "planting": "Wide orchard spacing",

    "scores": {
        "humid-forest": 7,
        "savanna": 8,
        "coastal": 7,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Fruit Fly",
            "level": "High",
            "note": "Affects fruit quality"
        },
        {
            "label": "Anthracnose",
            "level": "Medium",
            "note": "Fungal disease on fruits"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Tree Crop"]
},



{
    "id": "moringa",
    "name": "Moringa",
    "emoji": "🌿",
    "growthDays": 240,
    "soil": "Well-drained sandy loam",
    "sunlight": "Full sun",
    "water": "Low to moderate watering",
    "fertilizer": "Organic manure",
    "planting": "Seeds or stem cuttings",

    "scores": {
        "humid-forest": 8,
        "savanna": 10,
        "coastal": 7,
        "semi-arid": 9
    },

    "risks": [
        {
            "label": "Termites",
            "level": "Low",
            "note": "Can attack young trees"
        },
        {
            "label": "Root Rot",
            "level": "Low",
            "note": "Occurs in poorly drained soils"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Medicinal", "Tree Crop", "Drought Resistant"]
},


{
    "id": "bitter-leaf",
    "name": "Bitter Leaf",
    "emoji": "🌿",
    "growthDays": 120,
    "soil": "Fertile loam",
    "sunlight": "Full sun",
    "water": "Moderate watering",
    "fertilizer": "Organic manure",
    "planting": "Stem cuttings",

    "scores": {
        "humid-forest": 9,
        "savanna": 8,
        "coastal": 8,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Leaf Spot",
            "level": "Low",
            "note": "Can occur during prolonged rainfall"
        }
    ],

    "bestSeason": ["Rainy", "Dry"],
    "tags": ["Leafy Vegetable", "Medicinal"]
},


{
    "id": "scent-leaf",
    "name": "Scent Leaf",
    "emoji": "🌿",
    "growthDays": 90,
    "soil": "Rich well-drained soil",
    "sunlight": "Full sun",
    "water": "Moderate watering",
    "fertilizer": "Organic compost",
    "planting": "Stem cuttings or seeds",

    "scores": {
        "humid-forest": 9,
        "savanna": 8,
        "coastal": 9,
        "semi-arid": 5
    },

    "risks": [
        {
            "label": "Leaf Spot",
            "level": "Low",
            "note": "Fungal infection during wet weather"
        }
    ],

    "bestSeason": ["Rainy", "Dry"],
    "tags": ["Herb", "Medicinal"]
},


{
    "id": "jute-mallow",
    "name": "Jute Mallow (Ewedu)",
    "emoji": "🥬",
    "growthDays": 60,
    "soil": "Fertile loam",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Organic manure",
    "planting": "Direct seeding",

    "scores": {
        "humid-forest": 8,
        "savanna": 9,
        "coastal": 8,
        "semi-arid": 6
    },

    "risks": [
        {
            "label": "Leaf Beetles",
            "level": "Low",
            "note": "Feed on young leaves"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Leafy Vegetable", "Fast Growing"]
},


{
    "id": "hibiscus",
    "name": "Roselle (Zobo)",
    "emoji": "🌺",
    "growthDays": 180,
    "soil": "Well-drained sandy loam",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Organic manure",
    "planting": "Direct seeding",

    "scores": {
        "humid-forest": 7,
        "savanna": 9,
        "coastal": 7,
        "semi-arid": 7
    },

    "risks": [
        {
            "label": "Leaf Spot",
            "level": "Medium",
            "note": "Common in humid conditions"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Beverage Crop", "Medicinal"]
},


{
    "id": "coconut",
    "name": "Coconut",
    "emoji": "🥥",
    "growthDays": 2190,
    "soil": "Sandy coastal soil",
    "sunlight": "Full sun",
    "water": "High rainfall",
    "fertilizer": "Potassium-rich fertilizer",
    "planting": "Wide spacing",

    "scores": {
        "humid-forest": 7,
        "savanna": 3,
        "coastal": 10,
        "semi-arid": 1
    },

    "risks": [
        {
            "label": "Rhinoceros Beetle",
            "level": "High",
            "note": "Damages young palms"
        },
        {
            "label": "Bud Rot",
            "level": "Medium",
            "note": "Can kill young trees"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Tree Crop", "Cash Crop"]
},



{
    "id": "irish-potato",
    "name": "Irish Potato",
    "emoji": "🥔",
    "growthDays": 100,
    "soil": "Loose fertile loam",
    "sunlight": "Full sun",
    "water": "Regular watering",
    "fertilizer": "Balanced NPK fertilizer",
    "planting": "Seed tubers on ridges",

    "scores": {
        "humid-forest": 5,
        "savanna": 8,
        "coastal": 4,
        "semi-arid": 4
    },

    "risks": [
        {
            "label": "Late Blight",
            "level": "High",
            "note": "Fungal disease during cool, wet weather"
        }
    ],

    "bestSeason": ["Dry"],
    "tags": ["Root Crop", "Staple"]
},


{
    "id": "tiger-nut",
    "name": "Tiger Nut",
    "emoji": "🌰",
    "growthDays": 120,
    "soil": "Sandy loam",
    "sunlight": "Full sun",
    "water": "Moderate watering",
    "fertilizer": "Organic manure",
    "planting": "Tubers planted in rows",

    "scores": {
        "humid-forest": 5,
        "savanna": 8,
        "coastal": 5,
        "semi-arid": 7
    },

    "risks": [
        {
            "label": "Root Rot",
            "level": "Low",
            "note": "Occurs in waterlogged soil"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Nut Crop", "Cash Crop"]
},


{
    "id": "lime",
    "name": "Lime",
    "emoji": "🟢",
    "growthDays": 1095,
    "soil": "Well-drained loam",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Organic manure",
    "planting": "Orchard spacing",

    "scores": {
        "humid-forest": 7,
        "savanna": 7,
        "coastal": 8,
        "semi-arid": 4
    },

    "risks": [
        {
            "label": "Citrus Canker",
            "level": "Medium",
            "note": "Bacterial disease"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Tree Crop"]
},


{
    "id": "lemon",
    "name": "Lemon",
    "emoji": "🍋",
    "growthDays": 1095,
    "soil": "Well-drained loam",
    "sunlight": "Full sun",
    "water": "Moderate watering",
    "fertilizer": "Organic manure",
    "planting": "Orchard spacing",

    "scores": {
        "humid-forest": 7,
        "savanna": 7,
        "coastal": 8,
        "semi-arid": 4
    },

    "risks": [
        {
            "label": "Citrus Greening",
            "level": "High",
            "note": "Can severely reduce yield"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Tree Crop"]
},


{
    "id": "bambara-groundnut",
    "name": "Bambara Groundnut",
    "emoji": "🫘",
    "growthDays": 120,
    "soil": "Sandy loam",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Minimal fertilizer required",
    "planting": "Direct seeding",

    "scores": {
        "humid-forest": 5,
        "savanna": 10,
        "coastal": 4,
        "semi-arid": 8
    },

    "risks": [
        {
            "label": "Leaf Spot",
            "level": "Low",
            "note": "Usually manageable"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Legume", "Protein Crop"]
},


{
    "id": "african-star-apple",
    "name": "African Star Apple (Udara)",
    "emoji": "🍎",
    "growthDays": 1825,
    "soil": "Deep fertile loam",
    "sunlight": "Full sun",
    "water": "High rainfall",
    "fertilizer": "Organic manure",
    "planting": "Tree seedlings",

    "scores": {
        "humid-forest": 9,
        "savanna": 4,
        "coastal": 8,
        "semi-arid": 1
    },

    "risks": [
        {
            "label": "Fruit Rot",
            "level": "Medium",
            "note": "Occurs during prolonged rainfall"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Indigenous Tree"]
},


{
    "id": "african-pear",
    "name": "African Pear (Ube)",
    "emoji": "🍐",
    "growthDays": 1825,
    "soil": "Rich forest soil",
    "sunlight": "Full sun",
    "water": "High rainfall",
    "fertilizer": "Organic manure",
    "planting": "Tree seedlings",

    "scores": {
        "humid-forest": 10,
        "savanna": 3,
        "coastal": 9,
        "semi-arid": 1
    },

    "risks": [
        {
            "label": "Fruit Rot",
            "level": "Medium",
            "note": "Common in humid weather"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Indigenous Tree"]
},


{
    "id": "breadfruit",
    "name": "Breadfruit",
    "emoji": "🍈",
    "growthDays": 1825,
    "soil": "Deep well-drained loam",
    "sunlight": "Full sun",
    "water": "High rainfall",
    "fertilizer": "Organic manure",
    "planting": "Tree seedlings",

    "scores": {
        "humid-forest": 9,
        "savanna": 4,
        "coastal": 8,
        "semi-arid": 1
    },

    "risks": [
        {
            "label": "Fruit Rot",
            "level": "Low",
            "note": "Occurs during wet seasons"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Fruit", "Tree Crop"]
},


{
    "id": "black-pepper",
    "name": "Black Pepper",
    "emoji": "🫑",
    "growthDays": 1095,
    "soil": "Rich well-drained loam",
    "sunlight": "Partial shade",
    "water": "High humidity",
    "fertilizer": "Organic compost",
    "planting": "Vines trained on support trees",

    "scores": {
        "humid-forest": 8,
        "savanna": 2,
        "coastal": 7,
        "semi-arid": 1
    },

    "risks": [
        {
            "label": "Foot Rot",
            "level": "High",
            "note": "Common in poorly drained soils"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Spice", "Cash Crop"]
},


{
    "id": "okra-red",
    "name": "Red Okra",
    "emoji": "🌺",
    "growthDays": 60,
    "soil": "Fertile loam",
    "sunlight": "Full sun",
    "water": "Moderate rainfall",
    "fertilizer": "Organic manure",
    "planting": "Direct seeding",

    "scores": {
        "humid-forest": 8,
        "savanna": 9,
        "coastal": 7,
        "semi-arid": 6
    },

    "risks": [
        {
            "label": "Aphids",
            "level": "Medium",
            "note": "Attack leaves and pods"
        }
    ],

    "bestSeason": ["Rainy"],
    "tags": ["Vegetable", "Indigenous Variety"]
},

            # add more crops here

        ]


        for item in crops:

            crop = Crop.objects.create(
                name=item["name"],
                emoji=item["emoji"],

                soil_type=item["soil"],
                growth_duration_days=item["growthDays"],

                sunlight_requirement=item["sunlight"],
                water_requirement=item["water"],

                fertilizer=item.get("fertilizer", ""),
                planting=item.get("planting", ""),

                care_notes=item.get("risks", []),

                tags=item.get("tags", []),
                best_season=item.get("bestSeason", []),
            )


            for zone_name, score in item["scores"].items():

                zone = zones.get(zone_name.lower())

                if zone:

                    risks = item.get("risks", [])

                    CropZone.objects.create(
                        crop=crop,
                        zone=zone,

                        suitability_score=score,

                        risk_level=(
                            risks[0]["level"]
                            if risks else "Low"
                        ),

                        yield_expectation="Good",

                        care_notes=(
                            risks[0]["note"]
                            if risks else ""
                        ),

                        disease_risks=[
                            r["label"]
                            for r in risks
                        ]
                    )


            self.stdout.write(
                self.style.SUCCESS(
                    f"{crop.name} added"
                )
            )


        self.stdout.write(
            self.style.SUCCESS(
                "West Africa crop database seeded successfully"
            )
        )