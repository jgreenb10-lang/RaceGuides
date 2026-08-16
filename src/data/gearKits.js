/* ---------------- SHARED GEAR KITS ----------------
   Three kits rather than 51. The gear that matters is decided by the sport and
   the distance, not by which city you're racing in:

     ultra        — the 100-milers and stage races
     ironman-full — 140.6, which adds special needs bags and a night finish
     ironman-703  — 70.3, a daylight race with no special needs bags

   Per-race mandatory kit still belongs to the race itself: an ultra's data file
   can add a `mandatoryGear` list, and it renders above the shared kit.

   Product links point at the same retailers used on the Moab 240 page. Prices
   and stock change constantly — the links are a starting point, not a
   recommendation to buy any particular item.
*/

/* Items reused across kits, so a link only has to be right in one place. */
const HEADLAMP = {
  name: "Headlamp + spare batteries",
  note: "Petzl Nao RL is the ultrarunning benchmark; the BD Spot 400-R is the cheaper workhorse",
  links: [
    { label: "Petzl Nao RL — REI", url: "https://www.rei.com/product/204657/petzl-nao-rl-headlamp" },
    { label: "BD Spot 400-R — REI", url: "https://www.rei.com/product/202760/black-diamond-spot-400-r-headlamp" },
  ],
};

const ANTI_CHAFE = {
  name: "Anti-chafe balm",
  note: "Squirrel's Nut Butter and Trail Toes are the two that survive a wet day",
  links: [
    { label: "Squirrel's Nut Butter — Amazon", url: "https://www.amazon.com/Squirrels-Nut-Butter-Anti-Chafe-Salve/dp/B00PPGZ2R6" },
    { label: "Trail Toes — Amazon", url: "https://www.amazon.com/Trail-Toes-Anti-Chafing-Blister-Prevention/dp/B00K1SB4TC" },
  ],
};

const SUNSCREEN = {
  name: "Sunscreen, sweat-resistant",
  links: [{ label: "REI sun protection", url: "https://www.rei.com/c/sunscreen" }],
};

const ELECTROLYTES = {
  name: "Electrolyte capsules",
  note: "SaltStick is the standard — see the Nutrition tab to work out how many you need",
  links: [
    { label: "SaltStick Caps — Amazon", url: "https://www.amazon.com/SaltStick-Caps-Electrolyte-Replacement-Capsules/dp/B002EL4A0C" },
    { label: "SaltStick — REI", url: "https://www.rei.com/product/145252/saltstick-caps-electrolyte-capsules-100-pack" },
  ],
};

const GLIDE = {
  name: "Body Glide for neck and underarms",
  links: [{ label: "Body Glide — REI", url: "https://www.rei.com/product/632072/body-glide-original-anti-chafe-balm" }],
};

export const GEAR_KITS = {
  /* ---------------------------------------------------------------- ULTRA */
  ultra: {
    id: "ultra",
    title: "100-Mile Ultra Kit",
    intro:
      "The core kit for a mountain 100. Your race's own mandatory list always wins — " +
      "check the runner manual, because most 100s do a gear check and will not start you without it.",
    groups: [
      {
        id: "mandatory",
        title: "Usually Mandatory",
        accent: "#B5502E",
        note: "Most 100-milers require all of these at gear check",
        items: [
          {
            name: "Emergency bivy",
            note: "SOL Escape Lite — breathable, the community standard",
            links: [
              { label: "SOL Escape Lite — REI", url: "https://www.rei.com/product/891011/sol-escape-lite-bivy" },
              { label: "Amazon", url: "https://www.amazon.com/S-Survive-Outdoors-Longer-Escape/dp/B00EZEXCBG" },
            ],
          },
          HEADLAMP,
          {
            name: "Backup light",
            note: "Second light is required at most 100s — a small handheld counts",
            links: [{ label: "Nitecore — official", url: "https://www.nitecore.com/" }],
          },
          {
            name: "Whistle",
            note: "Fox 40 — a phone does not substitute",
            links: [{ label: "Fox 40 Mini — Amazon", url: "https://www.amazon.com/Fox-40-Official-Whistle-Black/dp/B000P7M2DG" }],
          },
          {
            name: "Waterproof jacket with hood",
            note: "Packs to nothing and is the difference between a cold night and a DNF",
            links: [
              { label: "Patagonia Houdini — REI", url: "https://www.rei.com/product/143470/patagonia-houdini-jacket-mens" },
              { label: "OR Helium — REI", url: "https://www.rei.com/product/236453/outdoor-research-helium-rain-jacket-mens" },
            ],
          },
          {
            name: "Water capacity, 2 L",
            note: "Most 100s specify a minimum — soft flasks plus a bladder covers it",
            links: [
              { label: "Hydration vests — REI", url: "https://www.rei.com/c/hydration-packs" },
              { label: "Salomon soft flasks — REI", url: "https://www.rei.com/product/173302/salomon-soft-flask-500ml" },
            ],
          },
          {
            name: "Cup or soft flask",
            note: "Nearly every ultra is now cupless",
            links: [{ label: "Collapsible cups — REI", url: "https://www.rei.com/c/hydration" }],
          },
        ],
      },
      {
        id: "clothing",
        title: "Clothing & Feet",
        accent: "#8C6B52",
        items: [
          {
            name: "Trail shoes, plus a second pair in a drop bag",
            note: "Feet swell over 100 miles — the spare is often a half size up",
            links: [
              { label: "Trail running shoes — REI", url: "https://www.rei.com/c/trail-running-shoes" },
              { label: "Running Warehouse", url: "https://www.runningwarehouse.com/catpage-TRAILM.html" },
            ],
          },
          {
            name: "Socks, several pairs",
            links: [{ label: "Running socks — REI", url: "https://www.rei.com/c/running-socks" }],
          },
          {
            name: "Gaiters",
            note: "Dirty Girl is the ultra staple for keeping scree out",
            links: [{ label: "Dirty Girl Gaiters", url: "https://dirtygirlgaiters.com/" }],
          },
          {
            name: "Insulating layer",
            note: "A light puffy or fleece for the small hours",
            links: [{ label: "Insulated jackets — REI", url: "https://www.rei.com/c/insulated-jackets" }],
          },
          { name: "Gloves and warm hat", links: [{ label: "REI", url: "https://www.rei.com/c/gloves-and-mittens" }] },
          { name: "Sun hat or visor", links: [{ label: "REI", url: "https://www.rei.com/c/hats" }] },
          ANTI_CHAFE,
          {
            name: "Leukotape for blisters",
            note: "Stays on when everything else has come off",
            links: [{ label: "Leukotape — Amazon", url: "https://www.amazon.com/BSN-Medical-Leukotape-Sports-Tape/dp/B0055JG7XI" }],
          },
        ],
      },
      {
        id: "carried",
        title: "Carried All Day",
        accent: "#1F6F6B",
        items: [
          {
            name: "Trekking poles",
            note: "Worth their weight the moment the climbs get steep",
            links: [{ label: "Trekking poles — REI", url: "https://www.rei.com/c/trekking-poles" }],
          },
          { name: "Phone + battery pack", links: [{ label: "Anker — Amazon", url: "https://www.amazon.com/stores/Anker/page/8B1A5C7C-1FD1-4A1F-A2E3-13B4B8B02D8C" }] },
          SUNSCREEN,
          ELECTROLYTES,
          {
            name: "First aid basics",
            links: [{ label: "AMK ultralight kit", url: "https://adventuremedicalkits.com/" }],
          },
          {
            name: "Wag bag, where required",
            note: "Desert and alpine races enforce this",
            links: [{ label: "RESTOP 2 — Amazon", url: "https://www.amazon.com/RESTOP-RS2W-2-Wilderness-KIT/dp/B07D8C1SPJ" }],
          },
        ],
      },
      {
        id: "dropbag",
        title: "Drop Bags & Crew",
        accent: "#8C6B52",
        items: [
          { name: "Change of shirt and shorts" },
          { name: "Dry socks at every crew stop" },
          { name: "Spare headlamp batteries" },
          { name: "Toothbrush and wipes — a real morale reset" },
          { name: "Sleeping bag at sleep stations, for multi-day races" },
          { name: "Chair and blanket for crew" },
        ],
      },
    ],
  },

  /* -------------------------------------------------------- IRONMAN 140.6 */
  "ironman-full": {
    id: "ironman-full",
    title: "IRONMAN 140.6 Kit",
    intro:
      "A full-distance day: two transitions, two special needs bags, and a finish that may " +
      "come after dark. Bags are handed in the day before, so anything you might want has to " +
      "be decided in advance.",
    groups: [
      {
        id: "swim",
        title: "Swim",
        accent: "#1F6F6B",
        items: [
          {
            name: "Wetsuit — check the Wetsuit tab first",
            note: "5 mm max thickness. Whether it is legal depends on water temperature",
            links: [{ label: "Wetsuits — REI", url: "https://www.rei.com/c/wetsuits" }],
          },
          { name: "Official swim cap (issued at check-in)" },
          { name: "Goggles + a spare pair", links: [{ label: "Goggles — REI", url: "https://www.rei.com/c/swim-goggles" }] },
          { name: "Anti-fog spray" },
          GLIDE,
          { name: "Tri kit to wear under the wetsuit" },
          { name: "Timing chip + ankle strap" },
        ],
      },
      {
        id: "t1",
        title: "T1 — Swim to Bike",
        accent: "#8C6B52",
        items: [
          { name: "Helmet — buckled BEFORE you touch the bike", note: "Unbuckled equals disqualification", links: [{ label: "Helmets — REI", url: "https://www.rei.com/c/bike-helmets" }] },
          { name: "Bike shoes" },
          { name: "Sunglasses" },
          { name: "Race belt with number" },
          { name: "Towel to mark your spot" },
          SUNSCREEN,
        ],
      },
      {
        id: "bike",
        title: "Bike — 112 mi",
        accent: "#B5502E",
        items: [
          { name: "Bike, serviced, with fresh tyres" },
          { name: "Two bottles minimum plus an aero bottle" },
          { name: "Nutrition taped on or in a bento box", note: "Work out the quantity on the Nutrition tab" },
          { name: "Spare tube/tubular, 2x CO2, inflator, tyre levers", links: [{ label: "Bike repair — REI", url: "https://www.rei.com/c/bike-tools-and-maintenance" }] },
          { name: "Multi-tool" },
          { name: "Bike computer, charged" },
          ELECTROLYTES,
        ],
      },
      {
        id: "t2",
        title: "T2 — Bike to Run",
        accent: "#8C6B52",
        items: [
          { name: "Run shoes with elastic laces", links: [{ label: "Running shoes — REI", url: "https://www.rei.com/c/running-shoes" }] },
          { name: "Socks" },
          { name: "Hat or visor" },
          { name: "Run nutrition" },
          ANTI_CHAFE,
        ],
      },
      {
        id: "special",
        title: "Special Needs Bags",
        accent: "#1F6F6B",
        note: "Full-distance only — handed in the day before and collected mid-bike and mid-run",
        items: [
          { name: "Bike special needs: spare tube, extra nutrition, a second bottle" },
          { name: "Run special needs: dry socks, a different flavour of anything" },
          { name: "Headlamp if you expect a finish after dark", note: "The 17-hour cut-off means late finishers run in the dark" },
        ],
      },
      {
        id: "general",
        title: "General",
        accent: "#8C6B52",
        items: [
          { name: "Photo ID and race documents for check-in" },
          { name: "Floor pump for race morning" },
          { name: "Dry clothes bag for the finish" },
          { name: "Post-race recovery food" },
        ],
      },
    ],
  },

  /* --------------------------------------------------------- IRONMAN 70.3 */
  "ironman-703": {
    id: "ironman-703",
    title: "IRONMAN 70.3 Kit",
    intro:
      "Half the distance and a much simpler day: no special needs bags, and you will be " +
      "finished in daylight. Everything you need has to be on you or on the bike from the start.",
    groups: [
      {
        id: "swim",
        title: "Swim — 1.2 mi",
        accent: "#1F6F6B",
        items: [
          {
            name: "Wetsuit — check the Wetsuit tab first",
            note: "Legality depends on water temperature on race morning",
            links: [{ label: "Wetsuits — REI", url: "https://www.rei.com/c/wetsuits" }],
          },
          { name: "Official swim cap (issued at check-in)" },
          { name: "Goggles + a spare pair", links: [{ label: "Goggles — REI", url: "https://www.rei.com/c/swim-goggles" }] },
          { name: "Anti-fog spray" },
          GLIDE,
          { name: "Tri kit" },
          { name: "Timing chip + ankle strap" },
        ],
      },
      {
        id: "t1",
        title: "T1 — Swim to Bike",
        accent: "#8C6B52",
        items: [
          { name: "Helmet — buckled BEFORE you touch the bike", links: [{ label: "Helmets — REI", url: "https://www.rei.com/c/bike-helmets" }] },
          { name: "Bike shoes" },
          { name: "Sunglasses" },
          { name: "Race belt with number" },
          { name: "Towel" },
          SUNSCREEN,
        ],
      },
      {
        id: "bike",
        title: "Bike — 56 mi",
        accent: "#B5502E",
        items: [
          { name: "Bike, serviced, with fresh tyres" },
          { name: "Two bottles", note: "Enough for the whole 56 mi — see the Nutrition tab" },
          { name: "Nutrition on the frame" },
          { name: "Spare tube, CO2, inflator, tyre levers", links: [{ label: "Bike repair — REI", url: "https://www.rei.com/c/bike-tools-and-maintenance" }] },
          { name: "Multi-tool" },
          { name: "Bike computer, charged" },
        ],
      },
      {
        id: "t2",
        title: "T2 — Bike to Run",
        accent: "#8C6B52",
        items: [
          { name: "Run shoes with elastic laces", links: [{ label: "Running shoes — REI", url: "https://www.rei.com/c/running-shoes" }] },
          { name: "Socks" },
          { name: "Hat or visor" },
          { name: "Run nutrition — 2 to 3 gels" },
          ANTI_CHAFE,
          ELECTROLYTES,
        ],
      },
      {
        id: "general",
        title: "General",
        accent: "#1F6F6B",
        items: [
          { name: "Photo ID and race documents for check-in" },
          { name: "Floor pump for race morning" },
          { name: "Dry clothes bag for the finish" },
        ],
      },
    ],
  },
};

export function gearKitFor(race) {
  if (race.tier === "full") return GEAR_KITS["ironman-full"];
  if (race.tier === "703") return GEAR_KITS["ironman-703"];
  return GEAR_KITS.ultra;
}
