import React, { useState, useEffect, useMemo } from "react";
import { Check, ExternalLink, MapPin, Compass, Droplet, Zap, ShoppingCart, Plane, BedDouble, Car, Plus, Trash2 } from "lucide-react";

/* ---------------- GEAR DATA ---------------- */

const CATEGORIES = [
  {
    id: "mandatory",
    title: "Mandatory Gear",
    sub: "Checked Thursday at gear check — no exceptions",
    accent: "#B5502E",
    items: [
      {
        name: "Emergency Bivy",
        note: "SOL Escape Lite — breathable, community standard for 200-milers",
        links: [
          { label: "SOL Escape Lite — REI", url: "https://www.rei.com/product/891011/sol-escape-lite-bivy" },
          { label: "SOL Escape Lite — Amazon", url: "https://www.amazon.com/S-Survive-Outdoors-Longer-Escape/dp/B00EZEXCBG" },
          { label: "Upgrade: Escape Bivy XL w/ Hood — REI", url: "https://www.rei.com/product/247865/sol-escape-bivy-xl-with-hood" },
        ],
      },
      {
        name: "Headlamp",
        note: "Petzl Nao RL is the top ultrarunning pick — 1,500 lumens, rechargeable",
        links: [
          { label: "Petzl Nao RL — REI", url: "https://www.rei.com/product/204657/petzl-nao-rl-headlamp" },
          { label: "Black Diamond Spot 400-R — REI", url: "https://www.rei.com/product/202760/black-diamond-spot-400-r-headlamp" },
          { label: "Black Diamond Spot 400 — REI", url: "https://www.rei.com/product/202774/black-diamond-spot-400-headlamp" },
        ],
      },
      {
        name: "Whistle",
        note: "Fox 40 — required, no personal device substitute",
        links: [
          { label: "Fox 40 Mini (Black) — Amazon", url: "https://www.amazon.com/Fox-40-Official-Whistle-Black/dp/B000P7M2DG" },
          { label: "Fox 40 Mini w/ Lanyard — Amazon", url: "https://www.amazon.com/Fox-40-Original-Whistle-Lanyard/dp/B000F0E4CK" },
          { label: "Fox 40 Mini Finger Grip — Amazon", url: "https://www.amazon.com/Fox-40-Mini-Finger-Whistle/dp/B00020QKPM" },
        ],
      },
      {
        name: "Wag Bags",
        note: "RESTOP 2 — zero-odor, drawstring seal. Buy a multi-pack",
        links: [
          { label: "RESTOP 2 Wilderness Kit (5-pk) — Amazon", url: "https://www.amazon.com/RESTOP-RS2W-2-Wilderness-KIT/dp/B07D8C1SPJ" },
          { label: "RESTOP 2 single — Amazon", url: "https://www.amazon.com/RESTOP-Portable-Toilet-Liquid-Included/dp/B093JC7PV7" },
          { label: "Cleanwaste WAG Bag (12-pk) — Amazon", url: "https://www.amazon.com/Cleanwaste-Go-Anywhere-Toilet-Kits/dp/B002J8VWW6" },
        ],
      },
      {
        name: "Jacket with Hood",
        note: "Patagonia Houdini — packs to nothing, wind/rain resistant",
        links: [
          { label: "Patagonia Houdini (Men's) — REI", url: "https://www.rei.com/product/143470/patagonia-houdini-jacket-mens" },
          { label: "Outdoor Research Helium (Men's) — REI", url: "https://www.rei.com/product/236453/outdoor-research-helium-rain-jacket-mens" },
          { label: "Arc'teryx Norvan (Men's) — REI", url: "https://www.rei.com/product/886737/arcteryx-norvan-jacket-mens" },
        ],
      },
      {
        name: "Gloves",
        note: "Black Diamond Midweight — warm, durable, touchscreen-compatible",
        links: [
          { label: "BD Midweight — REI", url: "https://www.rei.com/product/769516/black-diamond-midweight-gloves" },
          { label: "BD Midweight Screentap — REI", url: "https://www.rei.com/product/238008/black-diamond-midweight-screentap-gloves" },
          { label: "BD Midweight Softshell — REI", url: "https://www.rei.com/product/238009/black-diamond-midweight-softshell-gloves" },
        ],
      },
      {
        name: "Hat or Buff",
        note: "Merino or CoolNet Buff — doubles as neck gaiter",
        links: [
          { label: "Buff CoolNet UV — REI", url: "https://www.rei.com/product/146017/buff-coolnet-uv-multifunctional-neckwear" },
          { label: "Buff Merino Move — REI", url: "https://www.rei.com/product/212642/buff-merino-move-multifunctional-neckwear" },
          { label: "Buff Merino Lightweight — REI", url: "https://www.rei.com/product/789718/buff-merino-lightweight-multifunctional-neckwear" },
        ],
      },
      {
        name: "Pants/Tights (full leg coverage)",
        note: "Full-leg base layer bottom for La Sal cold",
        links: [
          { label: "Patagonia Capilene Midweight Bottoms — REI", url: "https://www.rei.com/product/155316/patagonia-capilene-midweight-base-layer-bottoms-mens" },
          { label: "Smartwool Classic Thermal Merino Bottoms — REI", url: "https://www.rei.com/product/834631/smartwool-merino-250-base-layer-bottoms-mens" },
          { label: "Patagonia Capilene Thermal Weight Bottoms — REI", url: "https://www.rei.com/product/884927/patagonia-capilene-thermal-weight-long-underwear-bottoms-mens" },
        ],
      },
      {
        name: "Long Sleeve Insulating Layer",
        note: "Merino or Capilene base layer top",
        links: [
          { label: "Patagonia Capilene Midweight Crew — REI", url: "https://www.rei.com/product/155315/patagonia-capilene-midweight-crew-base-layer-top-mens" },
          { label: "Patagonia Capilene Midweight Crew Neck — REI", url: "https://www.rei.com/product/884919/patagonia-capilene-midweight-crew-neck-long-underwear-top-mens" },
          { label: "Smartwool Classic Thermal Merino Crew — REI", url: "https://www.rei.com/product/227337/smartwool-classic-thermal-merino-crew-base-layer-top-mens" },
        ],
      },
      {
        name: "500 Extra Calories (emergency food)",
        note: "Dense, no-cook, doesn't melt",
        links: [
          { label: "Clif Nut Butter Bar variety pack — Amazon", url: "https://www.amazon.com/CLIF-Nut-Butter-Filled-Organic/dp/B07D7ZYFQD" },
          { label: "Clif Bar energy bars — Amazon", url: "https://www.amazon.com/CLIF-BAR-Energy-Crunchy-Protein/dp/B0061WGN98" },
          { label: "Spring Energy real-food gels — myspringenergy.com", url: "https://myspringenergy.com/collections/all" },
        ],
      },
    ],
  },
  {
    id: "recommended",
    title: "Recommended Gear",
    sub: "Carry at all times — not checked but you'll want it",
    accent: "#1F6F6B",
    items: [
      {
        name: "Running Vest / Pack",
        note: "Salomon Adv Skin 12 — gold standard for 200-milers",
        links: [
          { label: "Salomon Adv Skin 12 (Men's) — REI", url: "https://www.rei.com/product/171390/salomon-adv-skin-12-set-hydration-vest" },
          { label: "Salomon Adv Skin 12 (Women's) — REI", url: "https://www.rei.com/product/244097/salomon-adv-skin-12-hydration-vest-womens" },
          { label: "Ultimate Direction Race Vest 6.0 — REI", url: "https://www.rei.com/product/206018/ultimate-direction-race-vest-60-hydration-vest" },
        ],
      },
      {
        name: "Gaiters",
        note: "Dirty Girl Gaiters — ultrarunning standard for sand/grit on slickrock",
        links: [
          { label: "Dirty Girl Gaiters — official site", url: "https://dirtygirlgaiters.com/" },
          { label: "Kahtoola INSTAgaiter Low — REI", url: "https://www.rei.com/product/137230/kahtoola-instagaiter-low-gaiters" },
          { label: "Altra Trail Gaiters — REI", url: "https://www.rei.com/product/150528/altra-trail-gaiters" },
        ],
      },
      {
        name: "Water Filter",
        note: "Sawyer Squeeze — most durable, essentially unlimited filter life",
        links: [
          { label: "Sawyer Squeeze — REI", url: "https://www.rei.com/product/103050/sawyer-squeeze-water-filter-system" },
          { label: "Sawyer Squeeze + Cnoc 2L bladder — REI", url: "https://www.rei.com/product/247832/sawyer-squeeze-water-filtration-system-with-cnoc-premium-2-liter-bladder" },
          { label: "Katadyn BeFree 1.0L (faster flow) — REI", url: "https://www.rei.com/product/116364/katadyn-befree-collapsible-water-filter-bottle-338-fl-oz" },
        ],
      },
      {
        name: "Extra Battery Pack",
        note: "Nitecore NB10000 Gen4 — lightest high-capacity option, IPX7 rated",
        links: [
          { label: "Nitecore NB10000 Gen4 — Nitecore.com", url: "https://www.nitecore.com/product/nb10000gen4" },
          { label: "Nitecore NB10000 Gen4 — Zpacks", url: "https://zpacks.com/products/nitecore-nb10000-gen-4" },
          { label: "Anker Nano 10,000mAh — Amazon", url: "https://www.amazon.com/Anker-Portable-Charger-Compatible-MacBook/dp/B0C9CSG3B7" },
        ],
      },
      {
        name: "Sun Hat",
        note: "Lightweight, UPF-rated running hat",
        links: [
          { label: "REI Co-op On The Trail Cap — REI", url: "https://www.rei.com/product/148159/rei-co-op-on-the-trail-cap" },
          { label: "ciele GOCap Classic Athletics — REI", url: "https://www.rei.com/product/243519/ciele-athletics-gocap-classic-athletics-hat" },
          { label: "ciele x REI GOCap — REI", url: "https://www.rei.com/product/236703/ciele-athletics-ciele-x-rei-co-op-gocap-hat" },
        ],
      },
      {
        name: "Puffy Jacket with Hood",
        note: "Patagonia Micro Puff — packs tiny, warm even damp, critical above 10,000ft",
        links: [
          { label: "Micro Puff Hoody (Men's) — REI", url: "https://www.rei.com/product/834610/patagonia-micro-puff-hoody-jacket-mens" },
          { label: "Micro Puff Hooded (Women's) — REI", url: "https://www.rei.com/product/770797/patagonia-micro-puff-hooded-jacket-womens" },
          { label: "Budget alt: Nano Puff Hoody — REI", url: "https://www.rei.com/product/249150/patagonia-nano-puff-insulated-hoody-mens" },
        ],
      },
      {
        name: "First Aid Kit",
        note: "Adventure Medical Kits Ultralight .5",
        links: [
          { label: "AMK Ultralight .5 — Amazon", url: "https://www.amazon.com/Adventure-Medical-Kits-Ultralight-Watertight/dp/B000G80KQ0" },
          { label: "AMK Ultralight .5 — REI", url: "https://www.rei.com/product/247862/adventure-medical-kits-ultralightwatertight-5-medical-kit" },
          { label: "AMK Ultralight .5 — official site", url: "https://adventuremedicalkits.com/products/ultralight-watertight-medical-kit-5" },
        ],
      },
    ],
  },
  {
    id: "poles",
    title: "Trekking Poles",
    sub: "Not mandatory, but nearly everyone uses them for Pole Canyon, Geyser Pass, Shay Mountain",
    accent: "#8C6B52",
    items: [
      {
        name: "Trekking Poles",
        note: "Black Diamond Distance Carbon Z — folding, ultralight, ultrarunning favorite",
        links: [
          { label: "Distance Carbon Z — REI", url: "https://www.rei.com/product/202395/black-diamond-distance-carbon-z-poles-pair" },
          { label: "Distance Carbon Z FKT (glove-strap) — REI", url: "https://www.rei.com/product/C04057/black-diamond-distance-carbon-z-fkt-trekking-poles-pair" },
          { label: "Budget alt: Distance Z (aluminum) — REI", url: "https://www.rei.com/product/202396/black-diamond-distance-z-trekking-poles-pair" },
        ],
      },
    ],
  },
  {
    id: "dropbag",
    title: "Drop Bag Essentials",
    sub: "For the 5 sleep stations: Indian Creek, Bridger Jack, Shay Mtn, Road 46, Geyser Pass",
    accent: "#B5502E",
    items: [
      {
        name: "Sleeping Bag / Quilt",
        note: "Packable, warm option for 6-hour sleep windows",
        links: [
          { label: "Therm-a-Rest Space Cowboy 45°F — REI", url: "https://www.rei.com/product/246301/therm-a-rest-space-cowboy-45f7c-sleeping-bag" },
          { label: "NEMO Forte 35 — REI", url: "https://www.rei.com/product/162949/nemo-forte-35-sleeping-bag-mens" },
          { label: "REI Co-op Trailmade 20 — REI", url: "https://www.rei.com/product/217592/rei-co-op-trailmade-20-sleeping-bag" },
        ],
      },
      {
        name: "Earplugs",
        note: "For loud aid stations during sleep windows",
        links: [
          { label: "Loop Quiet — Amazon", url: "https://www.amazon.com/Loop-Quiet-Noise-Reduction-Earplugs/dp/B08MFDT65P" },
          { label: "Mack's Pillow Soft Silicone — Amazon", url: "https://www.amazon.com/Macks-Pillow-Soft-Silicone-Earplugs/dp/B00SYEHC64" },
          { label: "3M E-A-R Classic Foam — Amazon", url: "https://www.amazon.com/3M-Classic-Earplugs-310-1001-Uncorded/dp/B00O8NDAXE" },
        ],
      },
      {
        name: "Extra Shoes",
        note: "Bring 2 pairs minimum, rotate at sleep stations",
        links: [
          { label: "HOKA Speedgoat 6 (Men's) — REI", url: "https://www.rei.com/product/229247/hoka-speedgoat-6-trail-running-shoes-mens" },
          { label: "Altra Lone Peak 9 (Men's) — REI", url: "https://www.rei.com/product/241742/altra-lone-peak-9-trail-running-shoes-mens" },
          { label: "Topo Ultraventure 4 (Men's) — REI", url: "https://www.rei.com/product/242384/topo-athletic-ultraventure-4-trail-running-shoes-mens" },
        ],
      },
      {
        name: "Foot Care Kit",
        note: "Anti-friction cream + tape — the ultra-standard blister prevention combo",
        links: [
          { label: "Trail Toes anti-friction cream — Amazon", url: "https://www.amazon.com/Trail-Toes-Phenomenal-Ultra-Extreme-Anti-Friction/dp/B00GW70JW4" },
          { label: "Leukotape P — Amazon", url: "https://www.amazon.com/Leukotape-Sports-BSN-Medical-Stretch/dp/B002YMB600" },
          { label: "Squirrel's Nut Butter anti-chafe — Amazon", url: "https://www.amazon.com/Squirrels-Nut-Butter-Anti-Chafe-Tin/dp/B0CDDJ3PFS" },
        ],
      },
    ],
  },
];

/* ---------------- NUTRITION DATA ---------------- */
/* carbs/sodium are per single serving as sold. category: "carb" (counts toward carb pacing)
   or "electrolyte" (0 carbs, fills sodium gap only). All macros verified against manufacturer
   nutrition labels at time of writing. */

const PRODUCTS = [
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

function buildSchedule(selected, carbTarget, sodiumTarget, raceHours) {
  const carbItems = selected.filter((p) => p.carbs > 0);
  const elecItems = selected.filter((p) => p.carbs === 0);
  const totalMin = raceHours * 60;
  const events = [];

  let carbSodiumRate = 0;

  if (carbItems.length > 0) {
    const avgCarb = carbItems.reduce((s, p) => s + p.carbs, 0) / carbItems.length;
    const avgSodium = carbItems.reduce((s, p) => s + p.sodium, 0) / carbItems.length;
    const intervalMin = (60 * avgCarb) / carbTarget;
    carbSodiumRate = (avgSodium / avgCarb) * carbTarget;

    let t = intervalMin;
    let idx = 0;
    while (t <= totalMin) {
      events.push({ time: t, product: carbItems[idx % carbItems.length] });
      idx++;
      t += intervalMin;
    }

    const deficit = sodiumTarget - carbSodiumRate;
    if (deficit > 5 && elecItems.length > 0) {
      const avgElecSodium = elecItems.reduce((s, p) => s + p.sodium, 0) / elecItems.length;
      const intervalMin2 = (60 * avgElecSodium) / deficit;
      let t2 = intervalMin2;
      let idx2 = 0;
      while (t2 <= totalMin) {
        events.push({ time: t2, product: elecItems[idx2 % elecItems.length] });
        idx2++;
        t2 += intervalMin2;
      }
    }
  } else if (elecItems.length > 0) {
    const avgSodium = elecItems.reduce((s, p) => s + p.sodium, 0) / elecItems.length;
    const intervalMin = (60 * avgSodium) / sodiumTarget;
    let t = intervalMin;
    let idx = 0;
    while (t <= totalMin) {
      events.push({ time: t, product: elecItems[idx % elecItems.length] });
      idx++;
      t += intervalMin;
    }
  }

  events.sort((a, b) => a.time - b.time);
  return { events, carbSodiumRate };
}

function formatClock(startDate, minutesFromStart) {
  const d = new Date(startDate.getTime() + minutesFromStart * 60000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayLabel = days[d.getDay()];
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${dayLabel} ${h}:${m.toString().padStart(2, "0")}${ampm}`;
}

function formatElapsed(minutes) {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return `${h}h${m.toString().padStart(2, "0")}m`;
}

function groupByHour(events, raceHours) {
  const hours = [];
  for (let h = 0; h < raceHours; h++) {
    const inHour = events.filter((e) => e.time >= h * 60 && e.time < (h + 1) * 60);
    const counts = {};
    inHour.forEach((e) => {
      counts[e.product.name] = (counts[e.product.name] || 0) + 1;
    });
    hours.push({ hour: h + 1, items: counts });
  }
  return hours;
}

function buildHourlyTemplate(selected, carbTarget, sodiumTarget) {
  const carbItems = selected.filter((p) => p.carbs > 0);
  const elecItems = selected.filter((p) => p.carbs === 0);
  const marks = [];
  const notes = [];
  let carbSodiumRate = 0;

  if (carbItems.length > 0) {
    const avgCarb = carbItems.reduce((s, p) => s + p.carbs, 0) / carbItems.length;
    const avgSodium = carbItems.reduce((s, p) => s + p.sodium, 0) / carbItems.length;
    const interval = (60 * avgCarb) / carbTarget;
    carbSodiumRate = (avgSodium / avgCarb) * carbTarget;

    if (interval <= 60) {
      let t = 0, idx = 0;
      while (t < 60) {
        marks.push({ minute: Math.round(t), product: carbItems[idx % carbItems.length] });
        idx++;
        t += interval;
      }
    } else {
      notes.push(`${carbItems.map((p) => p.name).join(" / ")}: every ${Math.round(interval)} min — not every hour`);
    }

    const deficit = sodiumTarget - carbSodiumRate;
    if (deficit > 5 && elecItems.length > 0) {
      const avgElecSodium = elecItems.reduce((s, p) => s + p.sodium, 0) / elecItems.length;
      const interval2 = (60 * avgElecSodium) / deficit;
      if (interval2 <= 60) {
        let t = 0, idx = 0;
        while (t < 60) {
          marks.push({ minute: Math.round(t), product: elecItems[idx % elecItems.length] });
          idx++;
          t += interval2;
        }
      } else {
        notes.push(`${elecItems.map((p) => p.name).join(" / ")}: every ${Math.round(interval2)} min — not every hour`);
      }
    }
  } else if (elecItems.length > 0) {
    const avgSodium = elecItems.reduce((s, p) => s + p.sodium, 0) / elecItems.length;
    const interval = (60 * avgSodium) / sodiumTarget;
    if (interval <= 60) {
      let t = 0, idx = 0;
      while (t < 60) {
        marks.push({ minute: Math.round(t), product: elecItems[idx % elecItems.length] });
        idx++;
        t += interval;
      }
    } else {
      notes.push(`${elecItems.map((p) => p.name).join(" / ")}: every ${Math.round(interval)} min — not every hour`);
    }
  }

  marks.sort((a, b) => a.minute - b.minute);
  return { marks, notes, carbSodiumRate };
}

const RACE_START = new Date("2026-10-09T06:00:00-06:00");

/* ---------------- COURSE / AID STATION / RULES DATA ---------------- */

const AID_STATIONS = [
  { name: "Start", mile: 0, type: "—", dropBag: true, crew: "Yes", pacer: "No", cutoffDay: "Fri", cutoffTime: "6:00 AM (start)", cutoffHours: 0 },
  { name: "Hidden Valley", mile: 8.3, type: "Full Aid", dropBag: false, crew: "No", pacer: "No", cutoffDay: "—", cutoffTime: "no cutoff", cutoffHours: null },
  { name: "Amasa Back", mile: 16.8, type: "Full Aid", dropBag: true, crew: "Yes (shuttle only)", pacer: "No", cutoffDay: "Fri", cutoffTime: "1:00 PM", cutoffHours: 7 },
  { name: "Base Camp", mile: 29.1, type: "Full Aid", dropBag: false, crew: "No", pacer: "No", cutoffDay: "Fri", cutoffTime: "6:30 PM", cutoffHours: 12.5 },
  { name: "Lockhart H2O", mile: 33.5, type: "Water Only", dropBag: false, crew: "No", pacer: "No", cutoffDay: "—", cutoffTime: "no cutoff", cutoffHours: null },
  { name: "The Oasis", mile: 53.5, type: "Full Aid", dropBag: false, crew: "No", pacer: "No", cutoffDay: "Sat", cutoffTime: "4:30 AM", cutoffHours: 22.5 },
  { name: "Indian Creek", mile: 67.8, type: "Full Aid + Sleep", dropBag: true, crew: "No (pacer drop-off only, no parking)", pacer: "Pacing starts here", cutoffDay: "Sat", cutoffTime: "10:30 AM", cutoffHours: 28.5 },
  { name: "The Island", mile: 81.6, type: "Full Aid", dropBag: true, crew: "No", pacer: "Pickup/drop-off", cutoffDay: "Sat", cutoffTime: "4:30 PM", cutoffHours: 34.5 },
  { name: "Bridger Jack", mile: 96.5, type: "Full Aid + Sleep", dropBag: true, crew: "No", pacer: "Pickup/drop-off", cutoffDay: "Sat", cutoffTime: "11:59 PM", cutoffHours: 41.983 },
  { name: "Shay Mountain", mile: 114.2, type: "Full Aid + Sleep", dropBag: true, crew: "Green Group only", pacer: "Pickup/drop-off", cutoffDay: "Sun", cutoffTime: "9:00 AM", cutoffHours: 51 },
  { name: "Monticello Lake", mile: 126.4, type: "Full Aid", dropBag: true, crew: "Yellow Group only", pacer: "Pickup/drop-off", cutoffDay: "Sun", cutoffTime: "3:00 PM", cutoffHours: 57 },
  { name: "Dry Valley", mile: 143.8, type: "Full Aid", dropBag: true, crew: "Yes", pacer: "Pickup/drop-off", cutoffDay: "Sun", cutoffTime: "10:30 PM", cutoffHours: 64.5 },
  { name: "The Needles", mile: 157.7, type: "Full Aid", dropBag: true, crew: "No", pacer: "Pickup/drop-off", cutoffDay: "Mon", cutoffTime: "5:00 AM", cutoffHours: 71 },
  { name: "Road 46", mile: 171.1, type: "Full Aid + Sleep", dropBag: true, crew: "Yes", pacer: "Pickup/drop-off", cutoffDay: "Mon", cutoffTime: "10:30 AM", cutoffHours: 76.5 },
  { name: "Pole Canyon", mile: 188.4, type: "Full Aid", dropBag: true, crew: "No", pacer: "Pickup/drop-off", cutoffDay: "Mon", cutoffTime: "6:30 PM", cutoffHours: 84.5 },
  { name: "Geyser Pass", mile: 202.7, type: "Full Aid + Sleep", dropBag: true, crew: "Yes", pacer: "Pickup/drop-off", cutoffDay: "Tue", cutoffTime: "3:30 AM", cutoffHours: 93.5 },
  { name: "Porcupine Rim", mile: 223.6, type: "Full Aid", dropBag: true, crew: "No", pacer: "Pickup/drop-off", cutoffDay: "Tue", cutoffTime: "1:30 PM", cutoffHours: 103.5 },
  { name: "Finish", mile: 241.8, type: "—", dropBag: true, crew: "Yes", pacer: "—", cutoffDay: "Tue", cutoffTime: "10:00 PM (112hr cutoff)", cutoffHours: 112 },
];

const SEGMENTS = [
  { from: "Start", to: "Hidden Valley", miles: 8.3, gain: 1234, loss: 582, hours: null, desc: "Bike path through town, then singletrack for sunrise over Moab Valley." },
  { from: "Hidden Valley", to: "Amasa Back", miles: 8.5, gain: 1601, loss: 2053, hours: 7, desc: "Steep scramble up to Behind the Rocks, technical slickrock descent — watch for markers." },
  { from: "Amasa Back", to: "Base Camp", miles: 12.3, gain: 2155, loss: 2108, hours: 5.5, desc: "Classic Moab slickrock and red rock; follow paint dashes across Amasa Back mesa." },
  { from: "Base Camp", to: "Lockhart H2O", miles: 4.4, gain: 387, loss: 319, hours: null, desc: "Sandy climb up from Base Camp toward the Colorado River views." },
  { from: "Lockhart H2O", to: "The Oasis", miles: 20, gain: 1770, loss: 1355, hours: 10, desc: "Exposed Lockhart Basin Road; sweeping rock-stack views, no water for 20 miles." },
  { from: "The Oasis", to: "Indian Creek", miles: 14.3, gain: 1727, loss: 1307, hours: 6, desc: "More Lockhart Basin exposure through Canyon Rims Recreation Area — carry all your water." },
  { from: "Indian Creek", to: "The Island", miles: 13.8, gain: 940, loss: 329, hours: 6, desc: "Fast, flat, sandy stretch past the Six Shooters — likely run at night." },
  { from: "The Island", to: "Bridger Jack", miles: 14.9, gain: 2239, loss: 715, hours: 7.5, desc: "Scenic climb along Bridger Jack Mesa above Lavender and Dry Fork Canyons." },
  { from: "Bridger Jack", to: "Shay Mountain", miles: 17.7, gain: 4228, loss: 2389, hours: 9, desc: "Real mountain climbing begins — first water sources, steep/rocky trail up to 8,194ft." },
  { from: "Shay Mountain", to: "Monticello Lake", miles: 12.2, gain: 2270, loss: 2444, hours: 6, desc: "Climb to over 10,500ft on Robertson Pasture Trail, then down Spring Creek Trail." },
  { from: "Monticello Lake", to: "Dry Valley", miles: 17.4, gain: 801, loss: 3121, hours: 7.5, desc: "Long double-track descent out of the mountains toward Dry Valley." },
  { from: "Dry Valley", to: "The Needles", miles: 13.9, gain: 559, loss: 884, hours: 6.5, desc: "All road — gravel then paved Needles Overlook Road, a break from technical terrain." },
  { from: "The Needles", to: "Road 46", miles: 13.4, gain: 879, loss: 931, hours: 5.5, desc: "More road via Hatch Wash Road; cross HWY 191 carefully — fast traffic." },
  { from: "Road 46", to: "Pole Canyon", miles: 17.3, gain: 3446, loss: 679, hours: 8, desc: "Gradual, exposed climb into the La Sal foothills on South Mountain." },
  { from: "Pole Canyon", to: "Geyser Pass", miles: 14.3, gain: 4916, loss: 3845, hours: 9, desc: "Toughest segment on paper — over 9,000-10,000ft nearly the whole way, fall colors." },
  { from: "Geyser Pass", to: "Porcupine Rim", miles: 20.9, gain: 1593, loss: 3991, hours: 10, desc: "Past Oowah Lake, then a fast downhill gravel run into Sand Flats Recreation Area." },
  { from: "Porcupine Rim", to: "Finish", miles: 18.2, gain: 951, loss: 4258, hours: 8.5, desc: "Classic Porcupine Rim technical singletrack, net downhill to the Colorado River and finish." },
];

const RULES_SUMMARY = [
  {
    title: "DNF triggers",
    items: [
      "Finishing after the 112-hour cutoff",
      "Missing any aid station cutoff time (not leaving before it)",
      "Returning to crew after a station's cutoff",
      "Choosing to quit before the finish",
      "Medical team pulling you for a physical or mental issue",
    ],
  },
  {
    title: "DQ triggers (rarer, more serious)",
    items: [
      "Cutting the course or skipping any section",
      "Taking outside aid between aid stations",
      "Meeting crew anywhere except a crew-access station, within cutoff",
      "Interacting with crew before checking in or after checking out of a station",
      "Requiring an IV, EMS, or SAR — automatic DQ",
      "Refusing SAR/EMS advice — automatic DQ",
    ],
  },
  {
    title: "Sanitation (zero tolerance)",
    items: [
      "Wag bags required for all human waste on course — no burying",
      "Used wag bags carried to the next aid station for disposal",
      "No litter of any kind — carry out everything you carry in",
    ],
  },
  {
    title: "Time penalties",
    items: [
      "Given for unsportsmanlike conduct by you, your crew, or your pacer",
      "A penalty removes eligibility for top-3 placement even if your finish time would qualify",
    ],
  },
];

const CREW_RULES = [
  "Crew contact allowed only at crew-access aid stations, and only before that station's cutoff",
  "One crew vehicle per runner, max 20' long x 8.5' wide — no RVs over that size, no trailers ever",
  "Crew must leave once their runner leaves the station — no camping at aid stations",
  "Crew supplies their own food/water — aid station supplies are for runners and volunteers only",
  "Crew vehicle needs a visible parking pass (issued at Thursday check-in, one per runner)",
  "Amasa Back: crew shuttle only from AArchway Inn, 1:00–9:00 PM, no direct crew parking",
  "Indian Creek: pacer drop-off only — no crew parking or crewing allowed at all",
  "Shay Mountain / Monticello Lake: crew randomly split into Green (Shay) or Yellow (Monticello) groups 4 weeks out — you can only park/crew at your assigned station, though pacer pickup/drop-off works at either",
];

const PACER_RULES = [
  "Pacing starts at Indian Creek (mile 67.8) — not before",
  "Pacers may only join/leave the course at crew-access aid stations",
  "One pacer at a time, must wear a pacer bib from check-in or an aid station",
  "Pacers carry the same mandatory gear as runners, plus their own GPX navigation",
  "Pacers may not carry (mule) a runner's gear, food, or water",
  "A pacer sharing food/water in a non-emergency disqualifies the runner",
];

const CREW_ACCESS_STATIONS = AID_STATIONS.filter(
  (a) => a.crew && a.crew !== "No" && a.name !== "Start" && a.name !== "Finish"
);

const PACER_ACCESS_STATIONS = AID_STATIONS.filter(
  (a) => a.pacer && a.pacer !== "No" && a.pacer !== "—"
);

const CREW_WHAT_TO_BRING = [
  "Your own food and water — aid station supplies are reserved for runners and volunteers",
  "Camp chairs, shade/warm layers — waits can run long, especially overnight",
  "Headlamp or flashlight — most crew access happens after dark at some point",
  "Phone charger / power bank and offline maps — cell service is spotty on backcountry roads",
  "Cash — for the shuttle pickup areas and any incidentals in Moab",
  "A printed or downloaded copy of the Runner Manual — don't rely on signal at aid stations",
  "Trash bags — you pack out everything you bring in, no exceptions",
  "Tire repair kit or spare tire — many aid station roads are rough gravel/4x4",
  "Sunscreen, plenty of water for yourself, layers for both 90°F days and 20°F nights",
];

const CREW_SPECIAL_NOTES = [
  { station: "Amasa Back (mi 16.8)", note: "No direct crew parking — free shuttle from AArchway Inn runs 1:00–9:00 PM." },
  { station: "Indian Creek (mi 67.8)", note: "Pacer drop-off only. No crew parking or crewing allowed anywhere along the road." },
  { station: "Shay Mountain (mi 114.2) / Monticello Lake (mi 126.4)", note: "Crews are randomly split into Green (Shay) or Yellow (Monticello) groups ~4 weeks before the race. You can only park and crew at your assigned station — but pacer pickup/drop-off works at either." },
];

const CREW_DO_DONT = [
  "Use live tracking to time your arrival within ~30 minutes of your runner — parking is very limited",
  "Leave the aid station as soon as your runner leaves it",
  "Park only in legal/designated spots — never on vegetation, never blocking traffic or emergency access",
  "Follow all direction from the Aid Station Captain without argument",
  "Be genuinely kind to volunteers — nearly every problem that happens on this race traces back to crew behavior",
  "Remember: crewing is not required to finish. Many runners do this entirely unsupported.",
];

const CREW_VAN_OPTIONS = [
  {
    name: "2022 Thor Motor Coach Scope 18T",
    location: "Grand Junction, CO (~1.5 hr to Moab)",
    size: "17'11\" long — fits a standard parking spot",
    note: "Class B campervan on a standard van chassis. Sleeps 4, propane furnace, solar, generator. Well within the 20' x 8.5' limit.",
    link: "https://www.outdoorsy.com/rv-rental/grand-junction_co/2022_thor-motor-coach_18t_425084-listing",
    linkLabel: "View on Outdoorsy",
  },
  {
    name: "Classic Volkswagen Eurovan Camper",
    location: "Based directly in Moab, UT",
    size: "17' x 5'5\" x 7' — smallest option on this list",
    note: "Local company (Moab's only campervan rental outfit) — no long drive to pick up or return. Comes stocked with cooking/camping gear, sleeps up to 4.",
    link: "https://www.moabcampervan.com/vans",
    linkLabel: "View on MoabCamperVan.com",
  },
  {
    name: "Escape Campervans (Mavericks or Big Sur)",
    location: "Salt Lake City, UT (~4 hr to Moab)",
    size: "Standard Ford van chassis — both models comply with the length/width limit",
    note: "Well-known national fleet, unlimited mileage, 24/7 roadside assistance. Furthest pickup point of the three, but a reliable backup if Moab/Grand Junction options are booked.",
    link: "https://escapecampervans.com/locations/salt-lake-city-utah/",
    linkLabel: "View Escape Campervans SLC",
  },
];

const PACER_WHAT_TO_BRING = [
  "Same mandatory gear list as runners (jacket w/ hood, gloves, hat/buff, full leg coverage, insulating layer, headlamp, whistle, wag bags, cell phone)",
  "Your own GPX navigation — the race does not track pacers",
  "Your own nutrition and hydration — you can eat at aid stations only while actively pacing",
  "Warm layers for night sections — temps swing from 90°F to below freezing",
  "A pacer bib (issued at runner check-in or at an aid station)",
  "ID and emergency contact info in case you get separated from your runner",
];

const TABS = [
  { id: "overview", label: "Overview", accent: "#B5502E" },
  { id: "aid", label: "Aid Stations", accent: "#8C6B52" },
  { id: "segments", label: "Segments", accent: "#8C6B52" },
  { id: "pace", label: "Pace Calculator", accent: "#B5502E" },
  { id: "rules", label: "Rules & Crew", accent: "#8C6B52" },
  { id: "crewguide", label: "Crew Guide", accent: "#8C6B52" },
  { id: "pacerguide", label: "Pacer Guide", accent: "#1F6F6B" },
  { id: "gear", label: "Gear", accent: "#B5502E" },
  { id: "nutrition", label: "Nutrition", accent: "#1F6F6B" },
  { id: "flights", label: "Flights", accent: "#1F6F6B" },
  { id: "hotel", label: "Hotel", accent: "#B5502E" },
];

/* ---------------- TRAVEL ---------------- */

const BASE_HOTEL = {
  name: "Fairfield Inn & Suites by Marriott Moab",
  address: "1863 N Highway 191, Moab, UT 84532",
  url: "https://www.marriott.com/en-us/hotels/cnyfi-fairfield-inn-and-suites-moab/overview/",
  phone: "(435) 259-5350",
};

/* Drive distances measured from the Fairfield Inn on the north end of Moab.
   Airline routes change season to season — always confirm before booking. */
const AIRPORTS = [
  {
    code: "CNY",
    name: "Canyonlands Regional",
    city: "Moab, UT",
    miles: 14,
    drive: "~20 min",
    fromChicago: "1 stop — connect in Denver (United Express)",
    note: "By far the closest — it is basically in town. Small regional planes, few daily flights, and weather cancellations strand people. Great if it works, but leave a buffer day.",
  },
  {
    code: "GJT",
    name: "Grand Junction Regional",
    city: "Grand Junction, CO",
    miles: 113,
    drive: "~1 hr 50 min",
    fromChicago: "1 stop — connect in Denver, Dallas, or Phoenix",
    note: "The sweet spot for most crew. Real airport with rental cars, and a straightforward drive down US-191 into Moab.",
  },
  {
    code: "MTJ",
    name: "Montrose Regional",
    city: "Montrose, CO",
    miles: 127,
    drive: "~2 hr 15 min",
    fromChicago: "1 stop — connect in Denver or Dallas",
    note: "Similar drive to Grand Junction. Service is thinner outside ski season, so fares can be high.",
  },
  {
    code: "PVU",
    name: "Provo Municipal",
    city: "Provo, UT",
    miles: 193,
    drive: "~3 hr 5 min",
    fromChicago: "Usually 1 stop — limited low-cost service",
    note: "Occasionally cheap, but schedules are sparse and it saves only ~40 min of driving versus Salt Lake.",
  },
  {
    code: "SLC",
    name: "Salt Lake City International",
    city: "Salt Lake City, UT",
    miles: 234,
    drive: "~3 hr 40 min",
    fromChicago: "Nonstop from O'Hare and Midway (~3 hr 45 min)",
    note: "Best mix of price, nonstop options, and rental car availability. The drive is easy interstate most of the way. This is the default pick for crew flying in from Chicago.",
  },
  {
    code: "DEN",
    name: "Denver International",
    city: "Denver, CO",
    miles: 354,
    drive: "~5 hr 30 min",
    fromChicago: "Nonstop from O'Hare and Midway (~2 hr 40 min)",
    note: "Cheapest fares and the most flights, but it is a long haul across the Rockies. Only worth it if the fare difference is big or you want to break up the drive.",
  },
];

/* John's itinerary — public so crew and family can plan around his arrival.
   Deliberately first-name-only, with no surname, seat numbers, or confirmation
   number: enough for the people meeting him, not enough to be useful to a
   stranger who stumbles onto the site. Anything more sensitive goes in the
   localStorage-backed "Your Flights" fields, which are never published. */
const RUNNER_ITINERARY = {
  traveler: "John",
  label: "Outbound to Moab",
  airline: "United",
  legs: [
    {
      flightNo: "UA 2324",
      from: "ORD",
      fromCity: "Chicago, IL",
      to: "DEN",
      toCity: "Denver, CO",
      date: "Tue Oct 7",
      depart: "1:30 PM",
      arrive: "3:17 PM",
      duration: "2h 47m",
      operator: "United Airlines",
    },
    {
      flightNo: "UA 4770",
      from: "DEN",
      fromCity: "Denver, CO",
      to: "GJT",
      toCity: "Grand Junction, CO",
      date: "Tue Oct 7",
      depart: "4:20 PM",
      arrive: "5:31 PM",
      duration: "1h 11m",
      operator: "SkyWest dba United Express",
    },
  ],
};

/* Minutes between two date+time pairs from <input type="date"> / <input type="time">.
   Returns null when either side is incomplete. */
function minutesBetween(date1, time1, date2, time2) {
  if (!date1 || !time1 || !date2 || !time2) return null;
  const a = new Date(`${date1}T${time1}`);
  const b = new Date(`${date2}T${time2}`);
  if (isNaN(a) || isNaN(b)) return null;
  const mins = Math.round((b - a) / 60000);
  return mins >= 0 ? mins : null;
}

function formatDuration(mins) {
  if (mins === null || !isFinite(mins)) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function makeLeg() {
  return {
    id: `g${Date.now()}${Math.random().toString(36).slice(2, 6)}`,
    airline: "",
    flightNo: "",
    from: "",
    to: "",
    departDate: "",
    departTime: "",
    arriveDate: "",
    arriveTime: "",
    seat: "",
  };
}

/* Earlier saved trips stored a single `airport` field instead of legs. */
function normalizeTrip(t) {
  if (t && Array.isArray(t.legs)) return t;
  return {
    id: t.id || `f${Date.now()}`,
    traveler: t.traveler || "",
    direction: t.direction || "Arriving",
    confirmation: t.confirmation || "",
    notes: t.notes || "",
    legs: [
      {
        ...makeLeg(),
        airline: t.airline || "",
        flightNo: t.flightNo || "",
        to: t.airport || "",
        departDate: t.date || "",
        departTime: t.time || "",
      },
    ],
  };
}

const CUTOFF_STATIONS = AID_STATIONS.filter((a) => a.cutoffHours !== null);
const RACE_DISTANCE = 241.8;

function formatPace(minPerMile) {
  if (!isFinite(minPerMile) || minPerMile <= 0) return "—";
  const m = Math.floor(minPerMile);
  const s = Math.round((minPerMile - m) * 60);
  return `${m}:${s.toString().padStart(2, "0")}/mi`;
}

function formatHoursDuration(hours) {
  if (!isFinite(hours)) return "—";
  const sign = hours < 0 ? "-" : "";
  const abs = Math.abs(hours);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return `${sign}${h}h${m.toString().padStart(2, "0")}m`;
}

const CREW_TASKS = [
  { id: "t1", category: "Before Race (Thursday)", task: "Pack and label drop bags with runner's name, bib number, aid station" },
  { id: "t2", category: "Before Race (Thursday)", task: "Charge headlamps, phones, power banks — all of them, fully" },
  { id: "t3", category: "Before Race (Thursday)", task: "Download offline maps / GPX for crew driving routes" },
  { id: "t4", category: "Before Race (Thursday)", task: "Pick up Crew Vehicle Access Pass at runner check-in" },
  { id: "t5", category: "Before Race (Thursday)", task: "Gas up crew vehicle, check tire repair kit / spare tire" },
  { id: "t6", category: "Before Race (Thursday)", task: "Pack cooler with crew's own food and water" },
  { id: "t7", category: "Before Race (Thursday)", task: "Pack runner's spare shoes + socks for each planned station stop" },
  { id: "t8", category: "Before Race (Thursday)", task: "Pack and organize runner's nutrition by station/segment" },
  { id: "t9", category: "Race Morning (Friday)", task: "Drop runner at start, confirm SPOT tracker is picked up and on" },
  { id: "t10", category: "Race Morning (Friday)", task: "Confirm live tracking link works on everyone's phone" },
  { id: "t11", category: "Race Morning (Friday)", task: "Load vehicle: warm layers, backup nutrition, first aid kit" },
  { id: "t12", category: "At Every Aid Station", task: "Have next-segment nutrition/gels laid out and ready" },
  { id: "t13", category: "At Every Aid Station", task: "Have fresh socks + shoes ready, check for wet feet or blister risk" },
  { id: "t14", category: "At Every Aid Station", task: "Refill water bottles / hydration bladder" },
  { id: "t15", category: "At Every Aid Station", task: "Check runner's feet for hot spots, apply tape/cream if needed" },
  { id: "t16", category: "At Every Aid Station", task: "Have warm layers ready if temps are dropping (or shed layers if hot)" },
  { id: "t17", category: "At Every Aid Station", task: "Have hot food/drink on hand if runner wants something besides aid station fare" },
  { id: "t18", category: "At Every Aid Station", task: "Log split time and text update to other crew/pacers" },
  { id: "t19", category: "Sleep Stations", task: "Set up pacer's sleep gear (crew, not aid station, provides this)" },
  { id: "t20", category: "Sleep Stations", task: "Set a wake-up alarm to respect the 6-hour tent limit" },
  { id: "t21", category: "Ongoing", task: "Monitor live tracking continuously, time arrivals within ~30 min" },
  { id: "t22", category: "Ongoing", task: "Coordinate handoffs with other crew members and pacers" },
  { id: "t23", category: "Ongoing", task: "Pack out all trash — nothing gets left at any station" },
  { id: "t24", category: "Ongoing", task: "Navigate to next crew-access station, watching for no-crew zones" },
];

/* ---------------- MAIN COMPONENT ---------------- */

const STORAGE_KEY = "moab240-gear-checked";
const NUTRITION_KEY = "moab240-nutrition-selection";
const CREW_TASKS_KEY = "moab240-crew-tasks";
const FLIGHTS_KEY = "moab240-flights";
const LODGING_KEY = "moab240-lodging";

/* Saves to this browser only — each person keeps their own checklist. */
const storage = {
  get(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.error("Storage error", e);
    }
  },
};

export default function GearChecklist() {
  const [tab, setTab] = useState("overview");
  const [checked, setChecked] = useState({});
  const [loaded, setLoaded] = useState(false);

  const [selectedIds, setSelectedIds] = useState(["maurten", "tailwind", "saltstick"]);
  const [carbTarget, setCarbTarget] = useState(75);
  const [sodiumTarget, setSodiumTarget] = useState(450);
  const [raceHours, setRaceHours] = useState(65);
  const [nutritionLoaded, setNutritionLoaded] = useState(false);

  const [crewTasks, setCrewTasks] = useState({});
  const [crewTasksLoaded, setCrewTasksLoaded] = useState(false);

  const [flights, setFlights] = useState([]);
  const [lodging, setLodging] = useState([]);
  const [travelLoaded, setTravelLoaded] = useState(false);

  const [curElapsedH, setCurElapsedH] = useState(0);
  const [curElapsedM, setCurElapsedM] = useState(0);
  const [curMile, setCurMile] = useState(0);

  useEffect(() => {
    try {
      const res = storage.get(STORAGE_KEY);
      if (res) setChecked(JSON.parse(res));
    } catch (e) {}
    try {
      const res2 = storage.get(NUTRITION_KEY);
      if (res2) {
        const parsed = JSON.parse(res2);
        if (parsed.selectedIds) setSelectedIds(parsed.selectedIds);
        if (parsed.carbTarget) setCarbTarget(parsed.carbTarget);
        if (parsed.sodiumTarget) setSodiumTarget(parsed.sodiumTarget);
        if (parsed.raceHours) setRaceHours(parsed.raceHours);
      }
    } catch (e) {}
    try {
      const res3 = storage.get(CREW_TASKS_KEY);
      if (res3) setCrewTasks(JSON.parse(res3));
    } catch (e) {}
    try {
      const res4 = storage.get(FLIGHTS_KEY);
      if (res4) setFlights(JSON.parse(res4).map(normalizeTrip));
    } catch (e) {}
    try {
      const res5 = storage.get(LODGING_KEY);
      if (res5) setLodging(JSON.parse(res5));
    } catch (e) {}
    setLoaded(true);
    setNutritionLoaded(true);
    setCrewTasksLoaded(true);
    setTravelLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    storage.set(STORAGE_KEY, JSON.stringify(checked));
  }, [checked, loaded]);

  useEffect(() => {
    if (!nutritionLoaded) return;
    storage.set(
      NUTRITION_KEY,
      JSON.stringify({ selectedIds, carbTarget, sodiumTarget, raceHours })
    );
  }, [selectedIds, carbTarget, sodiumTarget, raceHours, nutritionLoaded]);

  useEffect(() => {
    if (!crewTasksLoaded) return;
    storage.set(CREW_TASKS_KEY, JSON.stringify(crewTasks));
  }, [crewTasks, crewTasksLoaded]);

  useEffect(() => {
    if (!travelLoaded) return;
    storage.set(FLIGHTS_KEY, JSON.stringify(flights));
  }, [flights, travelLoaded]);

  useEffect(() => {
    if (!travelLoaded) return;
    storage.set(LODGING_KEY, JSON.stringify(lodging));
  }, [lodging, travelLoaded]);

  const addFlight = () =>
    setFlights((prev) => [
      ...prev,
      {
        id: `f${Date.now()}`,
        traveler: "",
        direction: "Arriving",
        confirmation: "",
        notes: "",
        legs: [makeLeg()],
      },
    ]);

  const updateFlight = (id, field, value) =>
    setFlights((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)));

  const removeFlight = (id) => setFlights((prev) => prev.filter((f) => f.id !== id));

  const addLeg = (tripId) =>
    setFlights((prev) =>
      prev.map((f) => {
        if (f.id !== tripId) return f;
        const last = f.legs[f.legs.length - 1];
        // A connection starts where the previous leg landed, on the same day.
        const next = makeLeg();
        if (last) {
          next.airline = last.airline;
          next.from = last.to;
          next.departDate = last.arriveDate || last.departDate;
        }
        return { ...f, legs: [...f.legs, next] };
      })
    );

  const updateLeg = (tripId, legId, field, value) =>
    setFlights((prev) =>
      prev.map((f) =>
        f.id === tripId
          ? {
              ...f,
              legs: f.legs.map((g) => (g.id === legId ? { ...g, [field]: value } : g)),
            }
          : f
      )
    );

  const removeLeg = (tripId, legId) =>
    setFlights((prev) =>
      prev.map((f) =>
        f.id === tripId && f.legs.length > 1
          ? { ...f, legs: f.legs.filter((g) => g.id !== legId) }
          : f
      )
    );

  const addLodging = () =>
    setLodging((prev) => [
      ...prev,
      {
        id: `l${Date.now()}`,
        guest: "",
        property: BASE_HOTEL.name,
        checkIn: "",
        checkOut: "",
        roomType: "",
        confirmation: "",
        notes: "",
      },
    ]);

  const updateLodging = (id, field, value) =>
    setLodging((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));

  const removeLodging = (id) => setLodging((prev) => prev.filter((l) => l.id !== id));

  const setCrewTaskAssignee = (id, name) => {
    setCrewTasks((prev) => ({ ...prev, [id]: { ...prev[id], assignedTo: name } }));
  };

  const toggleCrewTaskDone = (id) => {
    setCrewTasks((prev) => ({
      ...prev,
      [id]: { ...prev[id], done: !(prev[id] && prev[id].done) },
    }));
  };

  const toggle = (key) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleProduct = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const totalItems = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const pct = totalItems ? Math.round((checkedCount / totalItems) * 100) : 0;

  const selectedProducts = useMemo(
    () => PRODUCTS.filter((p) => selectedIds.includes(p.id)),
    [selectedIds]
  );

  const { events, carbSodiumRate } = useMemo(
    () => buildSchedule(selectedProducts, carbTarget, sodiumTarget, raceHours),
    [selectedProducts, carbTarget, sodiumTarget, raceHours]
  );

  const quantities = useMemo(() => {
    const counts = {};
    events.forEach((e) => {
      counts[e.product.id] = (counts[e.product.id] || 0) + 1;
    });
    return counts;
  }, [events]);

  const totalCarbs = events.reduce((s, e) => s + e.product.carbs, 0);
  const totalSodium = events.reduce((s, e) => s + e.product.sodium, 0);
  const sodiumInRange = carbSodiumRate >= 300 && carbSodiumRate <= 600;
  const hourTemplate = useMemo(
    () => buildHourlyTemplate(selectedProducts, carbTarget, sodiumTarget),
    [selectedProducts, carbTarget, sodiumTarget]
  );

  const targetSchedule = useMemo(
    () =>
      CUTOFF_STATIONS.map((a) => {
        const targetArrivalHours = raceHours * (a.cutoffHours / 112);
        const buffer = a.cutoffHours - targetArrivalHours;
        return { ...a, targetArrivalHours, buffer };
      }),
    [raceHours]
  );

  const avgTargetPace = (raceHours * 60) / RACE_DISTANCE;

  const currentElapsedHours = curElapsedH + curElapsedM / 60;
  const liveStats = useMemo(() => {
    if (curMile <= 0 || currentElapsedHours <= 0) return null;
    const currentPace = (currentElapsedHours * 60) / curMile;
    const projectedFinishHours = currentPace * RACE_DISTANCE / 60;
    const nextStation = CUTOFF_STATIONS.find((a) => a.mile > curMile);
    let nextStationInfo = null;
    if (nextStation) {
      const milesToGo = nextStation.mile - curMile;
      const timeToGo = nextStation.cutoffHours - currentElapsedHours;
      const requiredPace = (timeToGo * 60) / milesToGo;
      nextStationInfo = { station: nextStation, milesToGo, timeToGo, requiredPace };
    }
    return { currentPace, projectedFinishHours, nextStationInfo };
  }, [curMile, currentElapsedHours]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF6EF", color: "#2B1B12" }}>
      <div className="max-w-2xl mx-auto px-5 py-8">
        <header className="mb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold" style={{ color: "#B5502E" }}>
            <Compass size={14} />
            <span>Moab 240 · Oct 9, 2026</span>
          </div>
          <h1 className="text-3xl font-bold mt-2 leading-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Moab 240 Runner Toolkit
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b5644" }}>
            Everything for race day in one place — course, aid stations, rules, gear, and fueling.
          </p>

          <div className="flex gap-1.5 mt-5 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: "touch" }}>
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex-shrink-0 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                style={{
                  backgroundColor: tab === t.id ? t.accent : "#FFFFFF",
                  color: tab === t.id ? "#FFFFFF" : t.accent,
                  border: `1px solid ${t.accent}`,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </header>

        {tab === "overview" && (
          <>
            <section className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#B5502E" }}>Key Dates</h2>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span style={{ color: "#6b5644" }}>Runner check-in</span><span className="font-semibold">Thu Oct 8, 1:00–3:30 PM</span></div>
                <div className="flex justify-between"><span style={{ color: "#6b5644" }}>Mandatory runner meeting</span><span className="font-semibold">Thu Oct 8, 4:00–5:00 PM</span></div>
                <div className="flex justify-between"><span style={{ color: "#6b5644" }}>Drop bag drop-off deadline</span><span className="font-semibold">Thu Oct 8, 5:00 PM</span></div>
                <div className="flex justify-between"><span style={{ color: "#6b5644" }}>SPOT tracker pickup</span><span className="font-semibold">Fri Oct 9, 4:30–5:30 AM</span></div>
                <div className="flex justify-between"><span style={{ color: "#6b5644" }}>Race start</span><span className="font-semibold">Fri Oct 9, 6:00 AM</span></div>
                <div className="flex justify-between"><span style={{ color: "#6b5644" }}>Cutoff (112 hrs)</span><span className="font-semibold">Tue Oct 13, 10:00 PM</span></div>
              </div>
            </section>

            <section className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#B5502E" }}>Course at a Glance</h2>
              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div><div className="text-xs" style={{ color: "#6b5644" }}>Distance</div><div className="font-bold text-lg">241.8 mi</div></div>
                <div><div className="text-xs" style={{ color: "#6b5644" }}>Elevation gain</div><div className="font-bold text-lg">~31,564 ft</div></div>
                <div><div className="text-xs" style={{ color: "#6b5644" }}>Full aid stations</div><div className="font-bold text-lg">15 + 1 water-only</div></div>
                <div><div className="text-xs" style={{ color: "#6b5644" }}>Sleep stations</div><div className="font-bold text-lg">5 (6-hr limit)</div></div>
              </div>
              <p className="text-xs" style={{ color: "#6b5644" }}>
                Single loop starting and finishing at Sun Outdoors Arches Gateway, 1773 N HWY 191, Moab UT.
                Route runs through Lockhart Basin, the Abajo and La Sal Mountains, and Canyonlands/Arches
                backcountry. Temps have ranged 7°F to 95°F historically — pack for both extremes.
              </p>
            </section>

            <section className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#B5502E" }}>Awards & Finish Types</h2>
              <ul className="text-xs space-y-1.5" style={{ color: "#6b5644" }}>
                <li>• <b style={{ color: "#2B1B12" }}>Official finish:</b> under 112 hrs — belt buckle + finisher print</li>
                <li>• <b style={{ color: "#2B1B12" }}>Unofficial finish:</b> left last aid station on time but arrived after cutoff — print + glass, no buckle</li>
                <li>• <b style={{ color: "#2B1B12" }}>DNF:</b> no buckle, no official time — see Rules & Crew tab</li>
              </ul>
            </section>

            <section className="rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#B5502E" }}>Official Links</h2>
              <div className="flex flex-wrap gap-2">
                <a href="https://www.destinationtrailrun.com/moab" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: "#FAF6EF", color: "#B5502E", border: "1px solid #E5D9C7" }}>Destination Trail — Moab 240<ExternalLink size={11} /></a>
                <a href="https://www.facebook.com/groups/moab240" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: "#FAF6EF", color: "#B5502E", border: "1px solid #E5D9C7" }}>Facebook Running Group<ExternalLink size={11} /></a>
              </div>
            </section>
          </>
        )}

        {tab === "aid" && (
          <section className="mb-8">
            <div className="mb-3 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
              <h2 className="text-lg font-bold" style={{ color: "#8C6B52" }}>Aid Station Chart</h2>
              <p className="text-xs mt-0.5" style={{ color: "#6b5644" }}>Cutoff times, drop bags, crew and pacer access at every station</p>
            </div>
            <div className="rounded-lg overflow-x-auto" style={{ border: "1px solid #E5D9C7" }}>
              <table className="text-xs" style={{ minWidth: 640 }}>
                <thead>
                  <tr style={{ backgroundColor: "#8C6B52", color: "#fff" }}>
                    <th className="text-left py-2 px-2">Station</th>
                    <th className="text-left py-2 px-2">Mile</th>
                    <th className="text-left py-2 px-2">Type</th>
                    <th className="text-left py-2 px-2">Drop Bag</th>
                    <th className="text-left py-2 px-2">Crew</th>
                    <th className="text-left py-2 px-2">Pacer</th>
                    <th className="text-left py-2 px-2">Cutoff</th>
                  </tr>
                </thead>
                <tbody>
                  {AID_STATIONS.map((a, i) => (
                    <tr key={a.name} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAF6EF" }}>
                      <td className="py-1.5 px-2 font-semibold whitespace-nowrap">{a.name}</td>
                      <td className="py-1.5 px-2 font-mono">{a.mile}</td>
                      <td className="py-1.5 px-2 whitespace-nowrap">{a.type}</td>
                      <td className="py-1.5 px-2">{a.dropBag ? "Yes" : "No"}</td>
                      <td className="py-1.5 px-2 whitespace-nowrap">{a.crew}</td>
                      <td className="py-1.5 px-2 whitespace-nowrap">{a.pacer}</td>
                      <td className="py-1.5 px-2 whitespace-nowrap font-mono">{a.cutoffDay} {a.cutoffTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3" style={{ color: "#6b5644" }}>
              Scroll table sideways to see all columns. Full details, driving directions, and coordinates
              are in the official Runner Manual.
            </p>
          </section>
        )}

        {tab === "segments" && (
          <section className="mb-8">
            <div className="mb-3 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
              <h2 className="text-lg font-bold" style={{ color: "#8C6B52" }}>Segment-by-Segment</h2>
              <p className="text-xs mt-0.5" style={{ color: "#6b5644" }}>Mileage, gain/loss, and what each stretch is like</p>
            </div>
            <div className="space-y-2">
              {SEGMENTS.map((s, i) => (
                <div key={i} className="rounded-lg p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{s.from} → {s.to}</span>
                    <span className="text-xs font-mono" style={{ color: "#6b5644" }}>{s.miles} mi</span>
                  </div>
                  <div className="flex gap-3 text-xs mb-1.5" style={{ color: "#6b5644" }}>
                    <span>▲ {s.gain.toLocaleString()} ft</span>
                    <span>▼ {s.loss.toLocaleString()} ft</span>
                    {s.hours && <span>~{s.hours} hrs guideline</span>}
                  </div>
                  <p className="text-xs" style={{ color: "#6b5644" }}>{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: "#6b5644" }}>
              Guideline hours are from the official pacing chart (total 112hr cutoff pace) — not a target,
              just a reference point.
            </p>
          </section>
        )}

        {tab === "pace" && (
          <>
            <section className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#B5502E" }}>Target Finish Time</h2>
              <p className="text-xs mb-3" style={{ color: "#6b5644" }}>
                Same slider as your Nutrition plan — set your goal finish time and this scales a required
                arrival time at every cutoff-controlled aid station, matched to the official pacing curve
                (harder sections get proportionally more time, easy sections less).
              </p>
              <label className="text-xs font-semibold" style={{ color: "#2B1B12" }}>
                Target finish (hours): {raceHours} — average pace needed: {formatPace(avgTargetPace)}
                <input
                  type="range" min="40" max="110" step="1"
                  value={raceHours}
                  onChange={(e) => setRaceHours(Number(e.target.value))}
                  className="w-full mt-1"
                />
              </label>
            </section>

            <section className="mb-6">
              <div className="mb-3 pb-2" style={{ borderBottom: "2px solid #B5502E" }}>
                <h2 className="text-lg font-bold" style={{ color: "#B5502E" }}>Cutoff Buffer at Your Target Pace</h2>
                <p className="text-xs mt-0.5" style={{ color: "#6b5644" }}>
                  Positive buffer = cushion before the cutoff. Tight or negative buffer means that section
                  needs to be faster than your overall average.
                </p>
              </div>
              <div className="rounded-lg overflow-x-auto" style={{ border: "1px solid #E5D9C7" }}>
                <table className="text-xs" style={{ minWidth: 560 }}>
                  <thead>
                    <tr style={{ backgroundColor: "#B5502E", color: "#fff" }}>
                      <th className="text-left py-2 px-2">Station</th>
                      <th className="text-left py-2 px-2">Mile</th>
                      <th className="text-left py-2 px-2">Official Cutoff</th>
                      <th className="text-left py-2 px-2">Your Target Arrival</th>
                      <th className="text-left py-2 px-2">Buffer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {targetSchedule.map((a, i) => (
                      <tr key={a.name} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAF6EF" }}>
                        <td className="py-1.5 px-2 font-semibold whitespace-nowrap">{a.name}</td>
                        <td className="py-1.5 px-2 font-mono">{a.mile}</td>
                        <td className="py-1.5 px-2 font-mono whitespace-nowrap">{formatHoursDuration(a.cutoffHours)}</td>
                        <td className="py-1.5 px-2 font-mono whitespace-nowrap">{formatHoursDuration(a.targetArrivalHours)}</td>
                        <td
                          className="py-1.5 px-2 font-mono font-semibold whitespace-nowrap"
                          style={{ color: a.buffer < 3 ? "#B5502E" : "#1F6F6B" }}
                        >
                          +{formatHoursDuration(a.buffer)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#1F6F6B" }}>Live Pace Check (Race Day)</h2>
              <p className="text-xs mb-3" style={{ color: "#6b5644" }}>
                Enter where you are right now to see your current pace, projected finish, and what you need
                to hit the next cutoff.
              </p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <label className="text-xs font-semibold" style={{ color: "#2B1B12" }}>
                  Elapsed hrs
                  <input
                    type="number" min="0" max="112" value={curElapsedH}
                    onChange={(e) => setCurElapsedH(Number(e.target.value))}
                    className="w-full mt-1 text-sm px-2 py-1.5 rounded-md"
                    style={{ border: "1px solid #E5D9C7" }}
                  />
                </label>
                <label className="text-xs font-semibold" style={{ color: "#2B1B12" }}>
                  Elapsed min
                  <input
                    type="number" min="0" max="59" value={curElapsedM}
                    onChange={(e) => setCurElapsedM(Number(e.target.value))}
                    className="w-full mt-1 text-sm px-2 py-1.5 rounded-md"
                    style={{ border: "1px solid #E5D9C7" }}
                  />
                </label>
                <label className="text-xs font-semibold" style={{ color: "#2B1B12" }}>
                  Current mile
                  <input
                    type="number" min="0" max="241.8" step="0.1" value={curMile}
                    onChange={(e) => setCurMile(Number(e.target.value))}
                    className="w-full mt-1 text-sm px-2 py-1.5 rounded-md"
                    style={{ border: "1px solid #E5D9C7" }}
                  />
                </label>
              </div>

              {!liveStats && (
                <p className="text-xs" style={{ color: "#6b5644" }}>Enter elapsed time and current mile to see your stats.</p>
              )}

              {liveStats && (
                <div className="space-y-2">
                  <div className="rounded-lg p-3" style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7" }}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: "#6b5644" }}>Current average pace</span>
                      <span className="font-bold">{formatPace(liveStats.currentPace)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "#6b5644" }}>Projected finish time</span>
                      <span className="font-bold" style={{ color: liveStats.projectedFinishHours <= 112 ? "#1F6F6B" : "#B5502E" }}>
                        {formatHoursDuration(liveStats.projectedFinishHours)}
                        {liveStats.projectedFinishHours > 112 ? " — over cutoff" : ""}
                      </span>
                    </div>
                  </div>

                  {liveStats.nextStationInfo && (
                    <div className="rounded-lg p-3" style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7" }}>
                      <div className="font-semibold text-sm mb-1">
                        Next cutoff: {liveStats.nextStationInfo.station.name} (mile {liveStats.nextStationInfo.station.mile})
                      </div>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: "#6b5644" }}>Miles to go</span>
                        <span className="font-mono">{liveStats.nextStationInfo.milesToGo.toFixed(1)} mi</span>
                      </div>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: "#6b5644" }}>Time until cutoff</span>
                        <span className="font-mono">{formatHoursDuration(liveStats.nextStationInfo.timeToGo)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "#6b5644" }}>Pace needed to make it</span>
                        <span
                          className="font-mono font-bold"
                          style={{ color: liveStats.nextStationInfo.requiredPace < 0 ? "#B5502E" : "#1F6F6B" }}
                        >
                          {liveStats.nextStationInfo.requiredPace < 0 ? "already missed" : formatPace(liveStats.nextStationInfo.requiredPace)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            <p className="text-xs" style={{ color: "#6b5644" }}>
              These numbers are moving-pace math and don't account for aid station stops, sleep windows, or
              terrain difficulty beyond the official cutoff curve — use as a planning guide, not a guarantee.
            </p>
          </>
        )}

        {tab === "rules" && (
          <>
            {RULES_SUMMARY.map((r) => (
              <section key={r.title} className="mb-6">
                <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
                  <h2 className="text-base font-bold" style={{ color: "#8C6B52" }}>{r.title}</h2>
                </div>
                <ul className="space-y-1.5 text-sm">
                  {r.items.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span style={{ color: "#8C6B52" }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
                <h2 className="text-base font-bold" style={{ color: "#8C6B52" }}>Crew Rules</h2>
              </div>
              <ul className="space-y-1.5 text-sm">
                {CREW_RULES.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: "#8C6B52" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
                <h2 className="text-base font-bold" style={{ color: "#8C6B52" }}>Pacer Rules</h2>
              </div>
              <ul className="space-y-1.5 text-sm">
                {PACER_RULES.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: "#8C6B52" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <p className="text-xs" style={{ color: "#6b5644" }}>
              This is a condensed reference, not a substitute for the official Runner Manual — read the full
              document for complete rules before race day.
            </p>
          </>
        )}

        {tab === "crewguide" && (
          <>
            <section className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#8C6B52" }}>Your Role as Crew</h2>
              <p className="text-sm" style={{ color: "#6b5644" }}>
                Crew support isn't required — plenty of runners finish unsupported — but good crew can make
                or break a race. Your job is logistics and morale: have the right food and gear ready, keep
                turnarounds fast, and stay out of the way of the race operation. Nearly every crew-related
                disqualification comes down to parking, trash, or contact rules, so the biggest thing you can
                do for your runner is simply follow them carefully.
              </p>
            </section>

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
                <h2 className="text-base font-bold" style={{ color: "#8C6B52" }}>Vehicle Requirements</h2>
              </div>
              <ul className="space-y-1.5 text-sm">
                <li className="flex gap-2"><span style={{ color: "#8C6B52" }}>•</span><span>Max 20' long x 8.5' wide — fits one standard parking space. No RVs bigger than that, no trailers of any length</span></li>
                <li className="flex gap-2"><span style={{ color: "#8C6B52" }}>•</span><span>One crew vehicle per runner, no exceptions</span></li>
                <li className="flex gap-2"><span style={{ color: "#8C6B52" }}>•</span><span>Crew Vehicle Access Pass required in the front window — issued once at Thursday check-in</span></li>
                <li className="flex gap-2"><span style={{ color: "#8C6B52" }}>•</span><span>No 4x4 needed for any crew-accessible station, but bring a tire repair kit or spare — roads are rough</span></li>
              </ul>
            </section>

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
                <h2 className="text-base font-bold" style={{ color: "#8C6B52" }}>Crew Vehicle Rental Options</h2>
                <p className="text-xs mt-0.5" style={{ color: "#6b5644" }}>All three fit within the race's 20' x 8.5' size limit</p>
              </div>
              <div className="space-y-2">
                {CREW_VAN_OPTIONS.map((v, i) => (
                  <div key={i} className="rounded-lg p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{v.name}</span>
                    </div>
                    <div className="text-xs mb-1" style={{ color: "#6b5644" }}>{v.location} · {v.size}</div>
                    <p className="text-xs mb-2" style={{ color: "#6b5644" }}>{v.note}</p>
                    <a
                      href={v.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "#FAF6EF", color: "#8C6B52", border: "1px solid #E5D9C7" }}
                    >
                      {v.linkLabel}<ExternalLink size={11} />
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
                <h2 className="text-base font-bold" style={{ color: "#8C6B52" }}>Aid Station Access for Crew</h2>
              </div>
              <div className="rounded-lg overflow-x-auto" style={{ border: "1px solid #E5D9C7" }}>
                <table className="text-xs" style={{ minWidth: 520 }}>
                  <thead>
                    <tr style={{ backgroundColor: "#8C6B52", color: "#fff" }}>
                      <th className="text-left py-2 px-2">Station</th>
                      <th className="text-left py-2 px-2">Mile</th>
                      <th className="text-left py-2 px-2">Crew Access</th>
                      <th className="text-left py-2 px-2">Cutoff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CREW_ACCESS_STATIONS.map((a, i) => (
                      <tr key={a.name} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAF6EF" }}>
                        <td className="py-1.5 px-2 font-semibold whitespace-nowrap">{a.name}</td>
                        <td className="py-1.5 px-2 font-mono">{a.mile}</td>
                        <td className="py-1.5 px-2 whitespace-nowrap">{a.crew}</td>
                        <td className="py-1.5 px-2 whitespace-nowrap font-mono">{a.cutoffDay} {a.cutoffTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
                <h2 className="text-base font-bold" style={{ color: "#8C6B52" }}>Special Station Notes</h2>
              </div>
              <div className="space-y-2">
                {CREW_SPECIAL_NOTES.map((n, i) => (
                  <div key={i} className="rounded-lg p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
                    <div className="font-semibold text-sm mb-1">{n.station}</div>
                    <div className="text-xs" style={{ color: "#6b5644" }}>{n.note}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
                <h2 className="text-base font-bold" style={{ color: "#8C6B52" }}>What to Bring</h2>
              </div>
              <ul className="space-y-1.5 text-sm">
                {CREW_WHAT_TO_BRING.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: "#8C6B52" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
                <h2 className="text-base font-bold" style={{ color: "#8C6B52" }}>Do's and Don'ts</h2>
              </div>
              <ul className="space-y-1.5 text-sm">
                {CREW_DO_DONT.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: "#8C6B52" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #8C6B52" }}>
                <h2 className="text-base font-bold" style={{ color: "#8C6B52" }}>Task Assignments</h2>
                <p className="text-xs mt-0.5" style={{ color: "#6b5644" }}>
                  Type a name next to each task so everyone knows who's handling what — from packing food to having shoes and socks ready.
                </p>
              </div>
              {Array.from(new Set(CREW_TASKS.map((t) => t.category))).map((cat) => (
                <div key={cat} className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "#B5502E" }}>{cat}</div>
                  <div className="space-y-2">
                    {CREW_TASKS.filter((t) => t.category === cat).map((t) => {
                      const state = crewTasks[t.id] || {};
                      const isDone = !!state.done;
                      return (
                        <div
                          key={t.id}
                          className="rounded-lg p-3"
                          style={{
                            backgroundColor: isDone ? "#F0EAE0" : "#FFFFFF",
                            border: "1px solid #E5D9C7",
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleCrewTaskDone(t.id)}
                              className="mt-0.5 flex-shrink-0 flex items-center justify-center rounded-md"
                              style={{
                                width: 20, height: 20,
                                border: `2px solid ${isDone ? "#8C6B52" : "#C9B79C"}`,
                                backgroundColor: isDone ? "#8C6B52" : "transparent",
                              }}
                            >
                              {isDone && <Check size={13} color="#fff" strokeWidth={3} />}
                            </button>
                            <span
                              className="flex-1 text-sm"
                              style={{
                                textDecoration: isDone ? "line-through" : "none",
                                color: isDone ? "#8a7a68" : "#2B1B12",
                              }}
                            >
                              {t.task}
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Assign to..."
                            value={state.assignedTo || ""}
                            onChange={(e) => setCrewTaskAssignee(t.id, e.target.value)}
                            className="w-full mt-2 ml-8 text-xs px-2.5 py-1.5 rounded-md"
                            style={{ border: "1px solid #E5D9C7", backgroundColor: "#FAF6EF", width: "calc(100% - 2rem)" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>

            <p className="text-xs" style={{ color: "#6b5644" }}>
              At sleep stations, tents and cots are for registered runners only — if your runner has a pacer
              who needs to sleep, you're responsible for supplying their sleep gear.
            </p>
          </>
        )}

        {tab === "pacerguide" && (
          <>
            <section className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
              <h2 className="text-lg font-bold mb-2" style={{ color: "#1F6F6B" }}>Your Role as a Pacer</h2>
              <p className="text-sm" style={{ color: "#6b5644" }}>
                Pacers exist for safety and company — not to give aid or a competitive advantage. You'll join
                after the runner has already covered 67+ miles and is likely sleep-deprived; your job is to
                keep them moving, watch for signs they need medical attention, and help with navigation if
                markers are missing. You are not allowed to carry their gear, food, or water — that's a
                disqualification for them, not just a rule violation.
              </p>
            </section>

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #1F6F6B" }}>
                <h2 className="text-base font-bold" style={{ color: "#1F6F6B" }}>When & Where You Can Pace</h2>
              </div>
              <p className="text-sm mb-2" style={{ color: "#6b5644" }}>
                Pacing starts at <b>Indian Creek (mile 67.8)</b> — not before. From there, you can only join or
                leave the course at these stations:
              </p>
              <div className="rounded-lg overflow-x-auto" style={{ border: "1px solid #E5D9C7" }}>
                <table className="text-xs" style={{ minWidth: 480 }}>
                  <thead>
                    <tr style={{ backgroundColor: "#1F6F6B", color: "#fff" }}>
                      <th className="text-left py-2 px-2">Station</th>
                      <th className="text-left py-2 px-2">Mile</th>
                      <th className="text-left py-2 px-2">Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PACER_ACCESS_STATIONS.map((a, i) => (
                      <tr key={a.name} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAF6EF" }}>
                        <td className="py-1.5 px-2 font-semibold whitespace-nowrap">{a.name}</td>
                        <td className="py-1.5 px-2 font-mono">{a.mile}</td>
                        <td className="py-1.5 px-2 whitespace-nowrap">{a.pacer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #1F6F6B" }}>
                <h2 className="text-base font-bold" style={{ color: "#1F6F6B" }}>Pacer Rules</h2>
              </div>
              <ul className="space-y-1.5 text-sm">
                {PACER_RULES.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: "#1F6F6B" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
                <li className="flex gap-2"><span style={{ color: "#1F6F6B" }}>•</span><span>Unable to keep up? You must stop at the next crew-access aid station — you can't be dropped off mid-segment</span></li>
                <li className="flex gap-2"><span style={{ color: "#1F6F6B" }}>•</span><span>Not actively pacing = you're classified as crew, and crew conduct rules apply to you</span></li>
              </ul>
            </section>

            <section className="mb-6">
              <div className="mb-2 pb-2" style={{ borderBottom: "2px solid #1F6F6B" }}>
                <h2 className="text-base font-bold" style={{ color: "#1F6F6B" }}>What to Bring</h2>
              </div>
              <ul className="space-y-1.5 text-sm">
                {PACER_WHAT_TO_BRING.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: "#1F6F6B" }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs mt-2" style={{ color: "#6b5644" }}>
                Full mandatory gear specifics (exact products) are on the Gear tab — pacers need the same
                jacket, gloves, insulating layer, and headlamp requirements as runners.
              </p>
            </section>

            <section className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFF5F0", border: "1px solid #E5D9C7" }}>
              <h2 className="text-base font-bold mb-2" style={{ color: "#B5502E" }}>In a True Emergency</h2>
              <p className="text-sm" style={{ color: "#6b5644" }}>
                A pacer may share food or water if there's a genuine emergency — but doing so still
                disqualifies the runner. It's allowed for safety, not to preserve their finish.
              </p>
            </section>
          </>
        )}

        {tab === "gear" && (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-xs mb-1 font-medium" style={{ color: "#6b5644" }}>
                <span>{checkedCount} of {totalItems} packed</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 rounded-full w-full overflow-hidden" style={{ backgroundColor: "#EAE0D1" }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%`, backgroundColor: "#B5502E" }}
                />
              </div>
            </div>

            {CATEGORIES.map((cat) => (
              <section key={cat.id} className="mb-8">
                <div className="mb-3 pb-2" style={{ borderBottom: `2px solid ${cat.accent}` }}>
                  <h2 className="text-lg font-bold" style={{ color: cat.accent }}>{cat.title}</h2>
                  <p className="text-xs mt-0.5" style={{ color: "#6b5644" }}>{cat.sub}</p>
                </div>

                <div className="space-y-3">
                  {cat.items.map((item) => {
                    const key = `${cat.id}-${item.name}`;
                    const isChecked = !!checked[key];
                    return (
                      <div
                        key={key}
                        className="rounded-lg p-3.5"
                        style={{
                          backgroundColor: isChecked ? "#F0EAE0" : "#FFFFFF",
                          border: "1px solid #E5D9C7",
                        }}
                      >
                        <button onClick={() => toggle(key)} className="flex items-start gap-3 w-full text-left">
                          <span
                            className="mt-0.5 flex-shrink-0 flex items-center justify-center rounded-md"
                            style={{
                              width: 20,
                              height: 20,
                              border: `2px solid ${isChecked ? cat.accent : "#C9B79C"}`,
                              backgroundColor: isChecked ? cat.accent : "transparent",
                            }}
                          >
                            {isChecked && <Check size={13} color="#fff" strokeWidth={3} />}
                          </span>
                          <span className="flex-1">
                            <span
                              className="block font-semibold text-sm"
                              style={{
                                textDecoration: isChecked ? "line-through" : "none",
                                color: isChecked ? "#8a7a68" : "#2B1B12",
                              }}
                            >
                              {item.name}
                            </span>
                            <span className="block text-xs mt-0.5" style={{ color: "#6b5644" }}>
                              {item.note}
                            </span>
                          </span>
                        </button>

                        <div className="flex flex-wrap gap-2 mt-2.5 ml-8">
                          {item.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                              style={{ backgroundColor: "#FAF6EF", color: "#B5502E", border: "1px solid #E5D9C7" }}
                            >
                              {link.label}
                              <ExternalLink size={11} />
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </>
        )}

        {tab === "nutrition" && (
          <>
            <div className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
              <div className="flex items-center gap-2 mb-2">
                <Droplet size={14} color="#1F6F6B" />
                <span className="text-sm font-bold" style={{ color: "#1F6F6B" }}>Targets</span>
              </div>
              <p className="text-xs mb-3" style={{ color: "#6b5644" }}>
                Defaults are set to your race targets: 60–90g carbs/hr, 300–600mg sodium/hr, 500–750ml fluid/hr.
                Your LMNT-heavy protocol tested out around 1,000mg sodium/hr, which is well above this range —
                that's the likely driver behind the bloating and wooziness in the back half of long runs.
              </p>
              <div className="grid grid-cols-1 gap-3">
                <label className="text-xs font-semibold" style={{ color: "#2B1B12" }}>
                  Carb target (g/hr): {carbTarget}
                  <input
                    type="range" min="40" max="100" step="5"
                    value={carbTarget}
                    onChange={(e) => setCarbTarget(Number(e.target.value))}
                    className="w-full mt-1"
                  />
                </label>
                <label className="text-xs font-semibold" style={{ color: "#2B1B12" }}>
                  Sodium target (mg/hr): {sodiumTarget}
                  <input
                    type="range" min="150" max="800" step="25"
                    value={sodiumTarget}
                    onChange={(e) => setSodiumTarget(Number(e.target.value))}
                    className="w-full mt-1"
                  />
                </label>
                <label className="text-xs font-semibold" style={{ color: "#2B1B12" }}>
                  Expected race duration (hours): {raceHours}
                  <input
                    type="range" min="40" max="110" step="1"
                    value={raceHours}
                    onChange={(e) => setRaceHours(Number(e.target.value))}
                    className="w-full mt-1"
                  />
                </label>
              </div>
              <p className="text-xs mt-3" style={{ color: "#6b5644" }}>
                Fluid target (500–750ml/hr) isn't scheduled below — sip continuously and use aid station
                water/electrolyte drink to hit it, on top of whatever you select here.
              </p>
            </div>

            <section className="mb-6">
              <div className="mb-3 pb-2" style={{ borderBottom: "2px solid #1F6F6B" }}>
                <h2 className="text-lg font-bold" style={{ color: "#1F6F6B" }}>Pick Your Gels & Electrolytes</h2>
                <p className="text-xs mt-0.5" style={{ color: "#6b5644" }}>
                  Select what you'll carry — the plan below updates automatically
                </p>
              </div>
              <div className="space-y-3">
                {PRODUCTS.map((p) => {
                  const isSel = selectedIds.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      className="rounded-lg p-3.5"
                      style={{
                        backgroundColor: isSel ? "#EAF4F3" : "#FFFFFF",
                        border: `1px solid ${isSel ? "#1F6F6B" : "#E5D9C7"}`,
                      }}
                    >
                      <button onClick={() => toggleProduct(p.id)} className="flex items-start gap-3 w-full text-left">
                        <span
                          className="mt-0.5 flex-shrink-0 flex items-center justify-center rounded-md"
                          style={{
                            width: 20, height: 20,
                            border: `2px solid ${isSel ? "#1F6F6B" : "#C9B79C"}`,
                            backgroundColor: isSel ? "#1F6F6B" : "transparent",
                          }}
                        >
                          {isSel && <Check size={13} color="#fff" strokeWidth={3} />}
                        </span>
                        <span className="flex-1">
                          <span className="flex items-center justify-between">
                            <span className="font-semibold text-sm">{p.name}</span>
                            <span className="text-xs font-mono" style={{ color: "#6b5644" }}>
                              {p.carbs}g C · {p.sodium}mg Na
                            </span>
                          </span>
                          <span className="block text-xs mt-0.5" style={{ color: "#6b5644" }}>{p.note}</span>
                        </span>
                      </button>
                      <div className="flex flex-wrap gap-2 mt-2.5 ml-8">
                        {p.links.map((link) => (
                          <a
                            key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{ backgroundColor: "#FAF6EF", color: "#1F6F6B", border: "1px solid #E5D9C7" }}
                          >
                            {link.label}<ExternalLink size={11} />
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {selectedProducts.length === 0 && (
              <p className="text-sm text-center py-6" style={{ color: "#6b5644" }}>
                Select at least one product above to generate your race-day timing plan.
              </p>
            )}

            {selectedProducts.length > 0 && (
              <>
                <section className="mb-6 rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingCart size={14} color="#B5502E" />
                    <span className="text-sm font-bold" style={{ color: "#B5502E" }}>Shopping List for {raceHours}hr Race</span>
                  </div>
                  <div className="space-y-1.5">
                    {Object.entries(quantities).map(([id, count]) => {
                      const p = PRODUCTS.find((x) => x.id === id);
                      return (
                        <div key={id} className="flex justify-between text-xs">
                          <span>{p.name}</span>
                          <span className="font-mono font-semibold">{count} servings</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 pt-3 text-xs space-y-1" style={{ borderTop: "1px solid #E5D9C7", color: "#6b5644" }}>
                    <div>Actual average carb rate: <b>{(totalCarbs / raceHours).toFixed(0)}g/hr</b></div>
                    <div>
                      Actual average sodium rate: <b>{(totalSodium / raceHours).toFixed(0)}mg/hr</b>{" "}
                      {sodiumInRange ? (
                        <span style={{ color: "#1F6F6B" }}>✓ in target range</span>
                      ) : (
                        <span style={{ color: "#B5502E" }}>
                          {carbSodiumRate < sodiumTarget && selectedProducts.every(p=>p.category==="carb")
                            ? "— add SaltStick to close the sodium gap"
                            : "— outside target range, adjust selection or targets"}
                        </span>
                      )}
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <div className="mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: "2px solid #1F6F6B" }}>
                    <Zap size={16} color="#1F6F6B" />
                    <h2 className="text-lg font-bold" style={{ color: "#1F6F6B" }}>Race-Day Timing Plan</h2>
                  </div>
                  <p className="text-xs mb-3" style={{ color: "#6b5644" }}>
                    Start: Friday 6:00 AM MT. {events.length} intake events over {raceHours} hours.
                  </p>
                  <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #E5D9C7" }}>
                    <table className="w-full text-xs">
                      <thead>
                        <tr style={{ backgroundColor: "#1F6F6B", color: "#fff" }}>
                          <th className="text-left py-2 px-2">Elapsed</th>
                          <th className="text-left py-2 px-2">Clock</th>
                          <th className="text-left py-2 px-2">Take</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((e, i) => (
                          <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAF6EF" }}>
                            <td className="py-1.5 px-2 font-mono" style={{ color: "#6b5644" }}>{formatElapsed(e.time)}</td>
                            <td className="py-1.5 px-2 font-mono" style={{ color: "#6b5644" }}>{formatClock(RACE_START, e.time)}</td>
                            <td className="py-1.5 px-2 font-semibold">{e.product.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            )}
          </>
        )}

        {tab === "flights" && (
          <>
            <section className="mb-6">
              <div className="mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: "2px solid #1F6F6B" }}>
                <Plane size={16} color="#1F6F6B" />
                <h2 className="text-lg font-bold" style={{ color: "#1F6F6B" }}>{RUNNER_ITINERARY.traveler}’s Itinerary</h2>
              </div>
              <div className="rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
                <div className="flex items-baseline justify-between gap-2 mb-3">
                  <span className="text-sm font-bold">{RUNNER_ITINERARY.label}</span>
                  <span className="text-xs font-semibold" style={{ color: "#1F6F6B" }}>
                    {RUNNER_ITINERARY.airline} · {RUNNER_ITINERARY.legs.length} legs
                  </span>
                </div>

                {RUNNER_ITINERARY.legs.map((leg, i) => (
                  <div key={leg.flightNo}>
                    {i > 0 && (
                      <div className="flex items-center gap-2 my-2 pl-2 text-xs" style={{ color: "#8C6B52" }}>
                        <div className="w-px self-stretch" style={{ backgroundColor: "#E5D9C7", minHeight: 18 }} />
                        <span>
                          Connect in {RUNNER_ITINERARY.legs[i - 1].toCity} —{" "}
                          <b>
                            {formatDuration(
                              (() => {
                                const parse = (t) => {
                                  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/);
                                  if (!m) return null;
                                  let h = parseInt(m[1], 10) % 12;
                                  if (m[3] === "PM") h += 12;
                                  return h * 60 + parseInt(m[2], 10);
                                };
                                const a = parse(RUNNER_ITINERARY.legs[i - 1].arrive);
                                const b = parse(leg.depart);
                                return a !== null && b !== null ? b - a : null;
                              })()
                            ) || "—"}
                          </b>{" "}
                          layover
                        </span>
                      </div>
                    )}
                    <div className="rounded-lg p-3" style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7" }}>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-sm font-bold">{leg.flightNo}</span>
                        <span className="text-xs" style={{ color: "#6b5644" }}>{leg.duration}</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="text-lg font-bold leading-tight">{leg.depart}</div>
                          <div className="text-xs font-semibold">{leg.from}</div>
                          <div className="text-xs" style={{ color: "#6b5644" }}>{leg.fromCity}</div>
                        </div>
                        <div className="flex-1 text-center">
                          <div className="text-xs whitespace-nowrap" style={{ color: "#6b5644" }}>{leg.duration}</div>
                          <div className="my-1" style={{ borderTop: "1px dashed #C9B79E" }} />
                          <div className="text-xs" style={{ color: "#a3927d" }}>{leg.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold leading-tight">{leg.arrive}</div>
                          <div className="text-xs font-semibold">{leg.to}</div>
                          <div className="text-xs" style={{ color: "#6b5644" }}>{leg.toCity}</div>
                        </div>
                      </div>
                      <div className="text-xs mt-2 pt-2" style={{ color: "#a3927d", borderTop: "1px solid #E5D9C7" }}>
                        Operated by {leg.operator}
                      </div>
                    </div>
                  </div>
                ))}

                {(() => {
                  const last = RUNNER_ITINERARY.legs[RUNNER_ITINERARY.legs.length - 1];
                  const ap = AIRPORTS.find((a) => a.code === last.to);
                  if (!ap) return null;
                  return (
                    <div className="mt-3 pt-3 text-xs flex items-start gap-1.5" style={{ color: "#6b5644", borderTop: "1px solid #E5D9C7" }}>
                      <Car size={12} className="mt-0.5 flex-shrink-0" />
                      <span>
                        Lands {last.arrive} {last.date} at {ap.code}. From there it is{" "}
                        <b style={{ color: "#2B1B12" }}>{ap.miles} mi / {ap.drive}</b> to the hotel —
                        into Moab around 7:30 PM — a day before Thursday check-in, two before the Friday start.
                      </span>
                    </div>
                  );
                })()}
              </div>
            </section>

            <section className="mb-6">
              <div className="mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: "2px solid #1F6F6B" }}>
                <Plane size={16} color="#1F6F6B" />
                <h2 className="text-lg font-bold" style={{ color: "#1F6F6B" }}>Your Flights</h2>
              </div>
              <p className="text-xs mb-3" style={{ color: "#6b5644" }}>
                Add a trip, then add a leg for each connection. Saved in this browser only —
                nothing is uploaded, so your confirmation number stays private to you.
              </p>

              {flights.length === 0 && (
                <div className="rounded-lg p-4 text-xs text-center" style={{ backgroundColor: "#FFFFFF", border: "1px dashed #E5D9C7", color: "#6b5644" }}>
                  No trips added yet. Hit “Add trip” below to start.
                </div>
              )}

              <div className="space-y-3">
                {flights.map((f) => (
                  <div key={f.id} className="rounded-lg p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        value={f.traveler}
                        onChange={(e) => updateFlight(f.id, "traveler", e.target.value)}
                        placeholder="Traveler name"
                        className="flex-1 min-w-0 text-sm font-semibold px-2 py-1 rounded"
                        style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7", color: "#2B1B12" }}
                      />
                      <select
                        value={f.direction}
                        onChange={(e) => updateFlight(f.id, "direction", e.target.value)}
                        className="text-xs px-2 py-1 rounded font-semibold"
                        style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7", color: "#1F6F6B" }}
                      >
                        <option>Arriving</option>
                        <option>Departing</option>
                      </select>
                      <button
                        onClick={() => removeFlight(f.id)}
                        aria-label="Remove trip"
                        className="p-1 rounded flex-shrink-0"
                        style={{ color: "#B5502E" }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <label className="block mb-3">
                      <span className="text-xs" style={{ color: "#6b5644" }}>Confirmation #</span>
                      <input
                        value={f.confirmation}
                        onChange={(e) => updateFlight(f.id, "confirmation", e.target.value)}
                        className="w-full text-sm px-2 py-1 rounded mt-0.5 font-mono"
                        style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7", color: "#2B1B12" }}
                      />
                    </label>

                    {f.legs.map((g, i) => {
                      const prev = i > 0 ? f.legs[i - 1] : null;
                      const layover = prev
                        ? formatDuration(
                            minutesBetween(prev.arriveDate, prev.arriveTime, g.departDate, g.departTime)
                          )
                        : null;
                      const legMins = minutesBetween(g.departDate, g.departTime, g.arriveDate, g.arriveTime);
                      return (
                        <div key={g.id}>
                          {prev && (
                            <div className="flex items-center gap-2 my-2 text-xs" style={{ color: "#8C6B52" }}>
                              <div className="flex-1" style={{ borderTop: "1px dashed #E5D9C7" }} />
                              <span>
                                {layover ? `${layover} layover` : "Layover"}
                                {prev.to ? ` in ${prev.to}` : ""}
                              </span>
                              <div className="flex-1" style={{ borderTop: "1px dashed #E5D9C7" }} />
                            </div>
                          )}
                          <div className="rounded-lg p-2.5" style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7" }}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold" style={{ color: "#1F6F6B" }}>
                                {f.legs.length > 1 ? `Leg ${i + 1} of ${f.legs.length}` : "Flight"}
                                {legMins !== null ? ` · ${formatDuration(legMins)}` : ""}
                              </span>
                              {f.legs.length > 1 && (
                                <button
                                  onClick={() => removeLeg(f.id, g.id)}
                                  aria-label={`Remove leg ${i + 1}`}
                                  className="p-0.5 rounded"
                                  style={{ color: "#B5502E" }}
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { field: "airline", label: "Airline", type: "text", ph: "United" },
                                { field: "flightNo", label: "Flight #", type: "text", ph: "UA 2324" },
                                { field: "from", label: "From", type: "text", ph: "ORD" },
                                { field: "to", label: "To", type: "text", ph: "DEN" },
                                { field: "departDate", label: "Departs", type: "date" },
                                { field: "departTime", label: "Depart time", type: "time" },
                                { field: "arriveDate", label: "Arrives", type: "date" },
                                { field: "arriveTime", label: "Arrive time", type: "time" },
                                { field: "seat", label: "Seat", type: "text", ph: "12A" },
                              ].map((cfg) => (
                                <label key={cfg.field} className="block">
                                  <span className="text-xs" style={{ color: "#6b5644" }}>{cfg.label}</span>
                                  <input
                                    type={cfg.type}
                                    value={g[cfg.field]}
                                    placeholder={cfg.ph || ""}
                                    onChange={(e) => updateLeg(f.id, g.id, cfg.field, e.target.value)}
                                    className={`w-full text-sm px-2 py-1 rounded mt-0.5 ${cfg.field === "from" || cfg.field === "to" ? "uppercase" : ""}`}
                                    style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7", color: "#2B1B12" }}
                                  />
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <button
                      onClick={() => addLeg(f.id)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg"
                      style={{ backgroundColor: "#FAF6EF", color: "#1F6F6B", border: "1px solid #E5D9C7" }}
                    >
                      <Plus size={12} /> Add connecting flight
                    </button>

                    <label className="block mt-2">
                      <span className="text-xs" style={{ color: "#6b5644" }}>Notes (rental car, who they’re riding with, etc.)</span>
                      <input
                        value={f.notes}
                        onChange={(e) => updateFlight(f.id, "notes", e.target.value)}
                        className="w-full text-sm px-2 py-1 rounded mt-0.5"
                        style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7", color: "#2B1B12" }}
                      />
                    </label>

                    {(() => {
                      const last = f.legs[f.legs.length - 1];
                      const ap = last && AIRPORTS.find((a) => a.code === (last.to || "").toUpperCase());
                      if (!ap) return null;
                      return (
                        <div className="mt-2 text-xs flex items-center gap-1" style={{ color: "#6b5644" }}>
                          <Car size={12} />
                          Lands at {ap.code} — {ap.miles} mi to the hotel, {ap.drive} drive
                        </div>
                      );
                    })()}
                  </div>
                ))}
              </div>

              <button
                onClick={addFlight}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg"
                style={{ backgroundColor: "#1F6F6B", color: "#FFFFFF" }}
              >
                <Plus size={14} /> Add trip
              </button>
            </section>

            <section className="mb-6">
              <div className="mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: "2px solid #1F6F6B" }}>
                <Compass size={16} color="#1F6F6B" />
                <h2 className="text-lg font-bold" style={{ color: "#1F6F6B" }}>Flying In From Chicago</h2>
              </div>
              <p className="text-xs mb-3" style={{ color: "#6b5644" }}>
                Six airports get you to Moab. Distances are driving miles to {BASE_HOTEL.name},
                sorted closest first. There are no nonstops from Chicago to Moab itself.
              </p>

              <div className="rounded-lg overflow-x-auto mb-3" style={{ border: "1px solid #E5D9C7" }}>
                <table className="text-xs" style={{ minWidth: 560 }}>
                  <thead>
                    <tr style={{ backgroundColor: "#1F6F6B", color: "#fff" }}>
                      <th className="text-left py-2 px-2">Airport</th>
                      <th className="text-left py-2 px-2">City</th>
                      <th className="text-left py-2 px-2">To Hotel</th>
                      <th className="text-left py-2 px-2">Drive</th>
                      <th className="text-left py-2 px-2">From Chicago</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AIRPORTS.map((a, i) => (
                      <tr key={a.code} style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAF6EF" }}>
                        <td className="py-1.5 px-2 font-semibold whitespace-nowrap">{a.code} — {a.name}</td>
                        <td className="py-1.5 px-2 whitespace-nowrap">{a.city}</td>
                        <td className="py-1.5 px-2 font-mono whitespace-nowrap">{a.miles} mi</td>
                        <td className="py-1.5 px-2 whitespace-nowrap">{a.drive}</td>
                        <td className="py-1.5 px-2">{a.fromChicago}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-2">
                {AIRPORTS.map((a) => (
                  <div key={a.code} className="rounded-lg p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="text-sm font-bold" style={{ color: "#1F6F6B" }}>{a.code} — {a.name}</span>
                      <span className="text-xs font-mono whitespace-nowrap" style={{ color: "#6b5644" }}>{a.miles} mi · {a.drive}</span>
                    </div>
                    <p className="text-xs" style={{ color: "#6b5644" }}>{a.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-lg p-3 text-xs" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7", color: "#6b5644" }}>
                <b style={{ color: "#2B1B12" }}>Short version:</b> fly Chicago → Salt Lake City nonstop,
                rent a car, drive 3 hr 40 min. Fly into Grand Junction if you would rather trade a connection
                for a shorter drive, or into Canyonlands if you want to skip the drive entirely and can absorb
                a cancellation. Book a rental car early — Moab sells out during race week, and crew will be
                driving long dirt roads between aid stations.
              </div>
              <p className="text-xs mt-2" style={{ color: "#a3927d" }}>
                Routes and schedules change seasonally — confirm current service with the airline before booking.
              </p>
            </section>
          </>
        )}

        {tab === "hotel" && (
          <>
            <section className="mb-6">
              <div className="mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: "2px solid #B5502E" }}>
                <BedDouble size={16} color="#B5502E" />
                <h2 className="text-lg font-bold" style={{ color: "#B5502E" }}>Base Hotel</h2>
              </div>
              <section className="rounded-lg p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
                <h3 className="text-base font-bold mb-1">{BASE_HOTEL.name}</h3>
                <div className="text-xs space-y-1 mb-3" style={{ color: "#6b5644" }}>
                  <div className="flex items-start gap-1"><MapPin size={12} className="mt-0.5 flex-shrink-0" /><span>{BASE_HOTEL.address}</span></div>
                  <div>{BASE_HOTEL.phone}</div>
                </div>
                <p className="text-xs mb-3" style={{ color: "#6b5644" }}>
                  On the north end of town along US-191, about 1 mile from the race start at Sun Outdoors
                  Arches Gateway and 14 miles from Canyonlands Regional Airport. Free breakfast and an
                  indoor pool — both useful for crew running on no sleep.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href={BASE_HOTEL.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: "#FAF6EF", color: "#B5502E", border: "1px solid #E5D9C7" }}>
                    Book on Marriott.com<ExternalLink size={11} />
                  </a>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BASE_HOTEL.name + " " + BASE_HOTEL.address)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: "#FAF6EF", color: "#B5502E", border: "1px solid #E5D9C7" }}>
                    Open in Maps<ExternalLink size={11} />
                  </a>
                </div>
              </section>
            </section>

            <section className="mb-6">
              <div className="mb-3 pb-2 flex items-center gap-2" style={{ borderBottom: "2px solid #B5502E" }}>
                <BedDouble size={16} color="#B5502E" />
                <h2 className="text-lg font-bold" style={{ color: "#B5502E" }}>Your Reservations</h2>
              </div>
              <p className="text-xs mb-3" style={{ color: "#6b5644" }}>
                Track who is staying where and for how long. Book early — Moab fills up during race week.
              </p>

              {lodging.length === 0 && (
                <div className="rounded-lg p-4 text-xs text-center" style={{ backgroundColor: "#FFFFFF", border: "1px dashed #E5D9C7", color: "#6b5644" }}>
                  No reservations added yet. Hit “Add reservation” below to start.
                </div>
              )}

              <div className="space-y-3">
                {lodging.map((l) => (
                  <div key={l.id} className="rounded-lg p-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5D9C7" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        value={l.guest}
                        onChange={(e) => updateLodging(l.id, "guest", e.target.value)}
                        placeholder="Guest name"
                        className="flex-1 text-sm font-semibold px-2 py-1 rounded"
                        style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7", color: "#2B1B12" }}
                      />
                      <button
                        onClick={() => removeLodging(l.id)}
                        aria-label="Remove reservation"
                        className="p-1 rounded"
                        style={{ color: "#B5502E" }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <label className="block mb-2">
                      <span className="text-xs" style={{ color: "#6b5644" }}>Property</span>
                      <input
                        value={l.property}
                        onChange={(e) => updateLodging(l.id, "property", e.target.value)}
                        className="w-full text-sm px-2 py-1 rounded mt-0.5"
                        style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7", color: "#2B1B12" }}
                      />
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { field: "checkIn", label: "Check-in", type: "date" },
                        { field: "checkOut", label: "Check-out", type: "date" },
                        { field: "roomType", label: "Room type", type: "text" },
                        { field: "confirmation", label: "Confirmation #", type: "text" },
                      ].map((cfg) => (
                        <label key={cfg.field} className="block">
                          <span className="text-xs" style={{ color: "#6b5644" }}>{cfg.label}</span>
                          <input
                            type={cfg.type}
                            value={l[cfg.field]}
                            onChange={(e) => updateLodging(l.id, cfg.field, e.target.value)}
                            className={`w-full text-sm px-2 py-1 rounded mt-0.5 ${cfg.field === "confirmation" ? "font-mono" : ""}`}
                            style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7", color: "#2B1B12" }}
                          />
                        </label>
                      ))}
                    </div>
                    <label className="block mt-2">
                      <span className="text-xs" style={{ color: "#6b5644" }}>Notes</span>
                      <input
                        value={l.notes}
                        onChange={(e) => updateLodging(l.id, "notes", e.target.value)}
                        className="w-full text-sm px-2 py-1 rounded mt-0.5"
                        style={{ backgroundColor: "#FAF6EF", border: "1px solid #E5D9C7", color: "#2B1B12" }}
                      />
                    </label>
                    {l.checkIn && l.checkOut && (
                      <div className="mt-2 text-xs" style={{ color: "#6b5644" }}>
                        {(() => {
                          const nights = Math.round(
                            (new Date(l.checkOut) - new Date(l.checkIn)) / 86400000
                          );
                          return isFinite(nights) && nights > 0
                            ? `${nights} night${nights === 1 ? "" : "s"}`
                            : null;
                        })()}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addLodging}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg"
                style={{ backgroundColor: "#B5502E", color: "#FFFFFF" }}
              >
                <Plus size={14} /> Add reservation
              </button>
            </section>
          </>
        )}

        <footer className="mt-10 pt-4 text-xs text-center" style={{ color: "#a3927d", borderTop: "1px solid #E5D9C7" }}>
          <div className="flex items-center justify-center gap-1">
            <MapPin size={12} />
            <span>Sun Outdoors Arches Gateway · Moab, UT</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
