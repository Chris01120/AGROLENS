export const CROP_PEST_RULES = {
  tomato: {
    fungal: {
      humidity: 75,
      tempRange: [18, 30],
      seasonBoost: ["rainy"],
    },
    insect: {
      tempAbove: 27,
      drySpells: true,
    },
  },

  maize: {
    fungal: {
      humidity: 80,
      tempRange: [20, 32],
    },
    insect: {
      tempAbove: 28,
    },
  },

  cocoa: {
    fungal: {
      humidity: 85,
      constantMoisture: true,
    },
  },
};