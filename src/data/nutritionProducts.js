/* ---------------- SHARED NUTRITION PRODUCTS ----------------
   One catalogue used by every race on the site — the Moab 240 page, the ultra
   template, and the IRONMAN template. Carbs and sodium are per single serving
   as sold, taken from each product's own label.

   category: "carb" counts toward carb pacing; "electrolyte" is sodium only. */

export const PRODUCTS = [
  {
    id: "maurten",
    name: "Maurten Gel 100",
    serving: "1 sachet",
    carbs: 25,
    sodium: 20,
    category: "carb",
    note: "Very low sodium, gentle on stomach — good if you're backing off total sodium load",
    links: [
      { label: "REI", url: "https://www.rei.com/product/C02286/maurten-gel-100" },
      { label: "Amazon", url: "https://www.amazon.com/MAURTEN-Energy-Carbohydrates-Stomach-Friendly-preservatives/dp/B07H319S3V" },
      { label: "thefeed.com", url: "https://thefeed.com/products/maurten-gel-100" },
    ],
  },
  {
    id: "maurten-caf",
    name: "Maurten Gel 100 Caf 100",
    serving: "1 sachet",
    carbs: 25,
    sodium: 20,
    caffeine: 100,
    category: "carb",
    note: "Same as Gel 100 plus 100mg caffeine — save for night sections",
    links: [
      { label: "REI", url: "https://www.rei.com/product/C02287/maurten-gel-100-caf-100" },
      { label: "thefeed.com", url: "https://thefeed.com/products/maurten-gel-100-caf-100" },
    ],
  },
  {
    id: "pf30",
    name: "Precision Fuel PF 30 Gel",
    serving: "1 pouch",
    carbs: 30,
    sodium: 0,
    category: "carb",
    note: "Highest carb-per-gel of this list, zero sodium — pure carb source",
    links: [
      { label: "Amazon", url: "https://www.amazon.com/Precision-Fuel-Energy-Easy-Digest/dp/B09HKYRT9C" },
      { label: "precisionhydration.com", url: "https://www.precisionhydration.com/us/en/products/pf-30-gel/" },
      { label: "thefeed.com", url: "https://thefeed.com/products/precision-fuel-and-hydration-pf30-gel" },
    ],
  },
  {
    id: "honeystinger",
    name: "Honey Stinger Organic Energy Gel",
    serving: "1 packet",
    carbs: 24,
    sodium: 50,
    category: "carb",
    note: "Honey-based, thinner texture, moderate sodium — easy to rotate in for flavor fatigue",
    links: [
      { label: "Amazon", url: "https://www.amazon.com/Honey-Stinger-Organic-Smoothie-Nutrition/dp/B08BKSBMV6" },
      { label: "Running Warehouse", url: "https://www.runningwarehouse.com/Honey_Stinger_Organic_Energy_Gel_/descpage-HSOEG24.html" },
      { label: "thefeed.com", url: "https://thefeed.com/products/honey-stinger-organic-gel" },
    ],
  },
  {
    id: "tailwind",
    name: "Tailwind Endurance Fuel (1 scoop)",
    serving: "1 scoop in water",
    carbs: 25,
    sodium: 310,
    category: "carb",
    note: "Drink mix — carbs AND high sodium in one, plus counts toward your fluid intake",
    links: [
      { label: "Amazon", url: "https://www.amazon.com/Tailwind-Nutrition-Stickpack-Set/dp/B017M6C4I0" },
      { label: "thefeed.com", url: "https://thefeed.com/products/tailwind-endurance-fuel" },
    ],
  },
  {
    id: "saltstick",
    name: "SaltStick FastChews (2 chews)",
    serving: "2 chews",
    carbs: 0,
    sodium: 200,
    category: "electrolyte",
    note: "Pure electrolyte, no carbs — used to top off sodium between gels without adding more sugar",
    links: [
      { label: "Amazon", url: "https://www.amazon.com/SaltStick-Fastchews-Electrolyte-Replacement-Rehydration/dp/B08J1PGVG1" },
      { label: "thefeed.com", url: "https://thefeed.com/products/saltstick-fastchews" },
    ],
  },
  {
    id: "sis-go",
    name: "SIS GO Energy + Electrolyte Gel (Salted Strawberry)",
    serving: "1 gel (60ml)",
    carbs: 22,
    sodium: 118,
    category: "carb",
    note: "Isotonic — no water needed. Moderate carb, solid sodium bump in one gel",
    links: [
      { label: "Amazon", url: "https://www.amazon.com/SIS-Energy-Electrolyte-Gel-Strawberry/dp/B07RM5V43J" },
      { label: "thefeed.com", url: "https://thefeed.com/products/science-in-sport-go-energy-gel" },
    ],
  },
  {
    id: "skratch",
    name: "Skratch Labs Hydration Sport Mix (Lemon Lime)",
    serving: "1 packet in water",
    carbs: 19,
    sodium: 400,
    category: "carb",
    note: "Real-fruit drink mix, high sodium relative to carbs — good option to hit sodium target without stacking too much sugar. Counts toward fluid intake too",
    links: [
      { label: "Amazon (single packet)", url: "https://www.amazon.com/SKRATCH-Labs-Sport-Hydration-Drink/dp/B07F24669Y" },
      { label: "Amazon (20-pack)", url: "https://www.amazon.com/Hydration-Servings-Electrolyte-Developed-Performance/dp/B075NPB5S1" },
      { label: "thefeed.com", url: "https://thefeed.com/products/skratch-labs-hydration-sport-mix" },
    ],
  },
];
