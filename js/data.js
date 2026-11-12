/* ============================================================
   SERIC — demo catalogue data.
   All names, copy and artwork are original to this project.
   ============================================================ */

const CATEGORIES = [
  { id: "dresses", name: "Dresses",          cols: ["#EAD9C4", "#B08D57"] },
  { id: "blouses", name: "Blouses & Camis", cols: ["#F1E9DC", "#C9B49A"] },
  { id: "scarves", name: "Scarves & Ties",  cols: ["#D98E6B", "#8C4A3B"] },
  { id: "sleep",   name: "Sleep & Lounge",  cols: ["#D8D4E8", "#8B84A8"] },
  { id: "home",    name: "Home & Gifts",    cols: ["#BFC9AE", "#7D8B6A"] },
];

const PRODUCTS = [
  {
    id: "aurore-slip-dress", name: "Aurore Silk Slip Dress", cat: "dresses", price: 189, tag: "New",
    colors: ["Champagne", "Ivory"],
    cols: [["#EAD9C4", "#B08D57"], ["#F3EFE6", "#D8C7A8"]],
    sizes: ["XS", "S", "M", "L", "XL"],
    desc: "A bias-cut slip that pools like water. Adjustable straps, a low cowl neck and a floor-skimming hem, cut from 22-momme mulberry silk."
  },
  {
    id: "eclat-midi-dress", name: "Éclat Silk Midi Dress", cat: "dresses", price: 209,
    colors: ["Noir", "Ink Blue"],
    cols: [["#2E2A33", "#5A5566"], ["#26324B", "#4A5B7E"]],
    sizes: ["XS", "S", "M", "L", "XL"],
    desc: "A column-cut midi with a covered placket and a hem that moves like ink on paper. Our most-requested evening silhouette."
  },
  {
    id: "celleste-blouse", name: "Céleste Silk Blouse", cat: "blouses", price: 149, tag: "New",
    colors: ["Ivory", "Lilac"],
    cols: [["#F3EFE6", "#D9CDB6"], ["#E9E4F0", "#B9B2CC"]],
    sizes: ["XS", "S", "M", "L", "XL"],
    desc: "A relaxed column blouse with a self-tie collar and covered buttons. Woven on a jacquard loom for a soft, dry hand."
  },
  {
    id: "rivage-cami", name: "Rivage Silk Cami", cat: "blouses", price: 119,
    colors: ["Sage", "Oat"],
    cols: [["#BFC9AE", "#8C9A74"], ["#E8DFCE", "#C2B29A"]],
    sizes: ["XS", "S", "M", "L", "XL"],
    desc: "The everyday camisole: a straight hem you can tuck or leave loose, wide straps, and a drape that settles beautifully."
  },
  {
    id: "ondine-satin-cami", name: "Ondine Satin Cami", cat: "blouses", price: 99,
    colors: ["Blush", "Honey"],
    cols: [["#E8C9B8", "#C08D74"], ["#E7C97E", "#B08D57"]],
    sizes: ["XS", "S", "M", "L"],
    desc: "A liquid-satin camisole with a deep front and a low back. Wear it under a blazer or alone — it works both ways."
  },
  {
    id: "sereno-silk-scarf", name: "Sereno Silk Scarf", cat: "scarves", price: 89, tag: "New",
    colors: ["Terracotta", "Sunset"],
    cols: [["#D98E6B", "#8C4A3B"], ["#E3A85C", "#B4543C"]],
    sizes: ["One Size"],
    desc: "A 90 cm square in pure silk twill, finished with hand-rolled hems. It holds a knot without the stiffness of printed scarves."
  },
  {
    id: "lumen-bandana", name: "Lumen Silk Bandana", cat: "scarves", price: 79,
    colors: ["Ink", "Forest"],
    cols: [["#2E2A33", "#6B6378"], ["#2F4438", "#5C705B"]],
    sizes: ["One Size"],
    desc: "A compact bandana in double-faced twill — hair, wrist or neck. A small square that travels well."
  },
  {
    id: "verve-scarf", name: "Verve Scarf", cat: "scarves", price: 95,
    colors: ["Pistachio", "Clay"],
    cols: [["#BFC9AE", "#D8B49A"], ["#C0846A", "#7A4A3B"]],
    sizes: ["One Size"],
    desc: "Our signature long scarf, woven with a fine diagonal grain that catches light on the move."
  },
  {
    id: "brume-sleep-set", name: "Brume Sleep Set", cat: "sleep", price: 169, tag: "New",
    colors: ["Lavender", "Moon"],
    cols: [["#D8D4E8", "#8B84A8"], ["#E8E4DA", "#B8B2A4"]],
    sizes: ["S/M", "L/XL"],
    desc: "A loose shirt and a wide trouser in 19-momme charmeuse. The set our studio keeps on the couch."
  },
  {
    id: "solstice-robe", name: "Solstice Silk Robe", cat: "sleep", price: 219,
    colors: ["Oat", "Umber"],
    cols: [["#E8DFCE", "#C2B29A"], ["#8A6E5A", "#5A4438"]],
    sizes: ["S/M", "L/XL", "XL/XXL"],
    desc: "A belt-and-half robe in heavy twill — enough body to stay closed, enough drape to feel like nothing."
  },
  {
    id: "meridien-cushion", name: "Méridien Silk Cushion", cat: "home", price: 75,
    colors: ["Pistachio", "Terracotta"],
    cols: [["#BFC9AE", "#8C9A74"], ["#D98E6B", "#A85C40"]],
    sizes: ["Standard"],
    desc: "A 45 cm cushion in silk twill over a feather insert. A small room upgrade that outlives trends."
  },
  {
    id: "halo-pillowcase", name: "Halo Silk Pillowcase", cat: "home", price: 59,
    colors: ["White", "Champagne"],
    cols: [["#F5F2EA", "#D8CFC0"], ["#EAD9C4", "#C9AE85"]],
    sizes: ["Standard"],
    desc: "A 19-momme charmeuse pillowcase with a 12 cm envelope closure. The simplest entry into daily silk."
  }
];

const COLLECTIONS = [
  { id: "bridal",   name: "The Bridal Edit",          cat: "dresses",
    desc: "Ivory, champagne and raw-gold silks for the morning of.", cols: [["#F5F1E8", "#D8C9A8"]] },
  { id: "capsule-01", name: "Capsule No. 1 — Quiet Luxe", cat: "blouses",
    desc: "Seven pieces in oat, ivory and ink that layer without ceremony.", cols: [["#F1E9DC", "#8C7A5F"]] },
  { id: "gifts",    name: "Gifts of Silk",            cat: "scarves",
    desc: "Small, gift-ready, wrapped in our uncoated box.", cols: [["#D98E6B", "#F1E9DC"]] },
  { id: "monochrome", name: "Monochrome Ink",         cat: "dresses",
    desc: "Black, ink and deep forest — silks that absorb the room.", cols: [["#231F26", "#4A4453"]] },
  { id: "spring",   name: "The Spring Palette",       cat: "home",
    desc: "Pistachio, blush and lavender across home and lounge.", cols: [["#BFC9AE", "#D8D4E8"]] },
  { id: "basics",   name: "Atelier Basics",           cat: "sleep",
    desc: "The camisole, the set, the robe — the pieces that become habits.", cols: [["#E8DFCE", "#C2B29A"]] },
];

const ARTICLES = [
  {
    id: "history-of-silk", cat: "Story", title: "A Short History of Silk",
    excerpt: "From a secret kept for millennia to a fabric we wear daily — the long, slow story of silk.",
    art: ["#C9B49A", "#6B543A"],
    body: `
      <p>Legend says silk was discovered when a cocoon fell into a cup of tea, and a thread began to unwind. The history is more ordinary and more impressive: for thousands of years, sericulture — the farming of the mulberry silkworm — was one of the most closely guarded industrial secrets in the world.</p>
      <p>For centuries the raw silk trade ran in one direction: finished cloth leaving a single small region, and everyone else had to beg, steal, or grow their own. The moment that secret spread, silk became a global textile, and it has never fully stopped moving.</p>
      <p>Modern silk is still a biological fabric: a protein, spun by an insect, reeled from the cocoon by hand or by patient machines, then degummed, spun, and woven. None of that can be faked. What can be faked is care — and that is what this house is built around.</p>
      <p>At Seric, every bolt begins at one farm. We buy reeled silk in small, traceable lots, weave it on looms older than the house, and finish every edge by hand. The result is not faster silk. It is slower silk, made to be kept.</p>`
  },
  {
    id: "care-for-silk", cat: "Care", title: "How to Care for Silk",
    excerpt: "Silk is strong and delicate in the same way: it forgives very little, and rewards a little.",
    art: ["#BFC9AE", "#5C705B"],
    body: `
      <p>Silk is a protein fibre. It is stronger than cotton by weight, softer than almost anything you can buy, and — like every protein — it is picky. Follow the rules below and a Seric piece will outlast your interest in it.</p>
      <h2>Washing</h2>
      <p>Wash in cold water, by hand, with a dedicated silk detergent or a mild, soap-free cleanser. Submerge, press gently, and do not rub or wring. Rinse in cold water until it runs clear, then press out the excess inside a towel.</p>
      <h2>Drying and storage</h2>
      <p>Drip-dry flat, out of direct sun — UV is the enemy of silk's lustre. Store flat or on wide, padded hangers. A cedar block in the drawer does more than any spray.</p>
      <h2>Ironing and travel</h2>
      <p>If you must iron, do it on the reverse side, on the lowest setting, with a cloth between iron and fabric. When you travel, silk wrinkles; it just does not hold them. Hang the piece and let it rest.</p>
      <h2>The short version</h2>
      <p>Cold. Gentle. No sun. No perfume. Flat. That is the whole ritual.</p>`
  },
  {
    id: "cocoon-to-cloth", cat: "Craft", title: "From Cocoon to Cloth",
    excerpt: "What happens between the mulberry tree and the loom — a tour of the parts most people skip.",
    art: ["#D8C9A8", "#8A6B3E"],
    body: `
      <p>Every metre of finished silk begins with a mulberry leaf. The silkworm eats, grows, and spins a cocoon of a single continuous filament — up to a kilometre long, all of it from one thread.</p>
      <h2>Reeling</h2>
      <p>Cocoon reeling is the part of silk that most people assume is fast. It is not: cocoons are warmed in steam water to soften the gum that holds the filament, and then the thread is coaxed out, one at a time, across a basin.</p>
      <h2>Degumming</h2>
      <p>Raw silk is covered in sericin, a natural glue. It is washed out in warm alkaline baths, and what remains is the silk fibre itself — noticeably lighter and far more lustrous than the raw thread.</p>
      <h2>The loom</h2>
      <p>We spin the degummed filament into yarn of 22-momme weight — a number that matters, because it is the standard our whole house is built to. Then it goes to the loom, where it is woven in small runs, on looms that make no sound.</p>`
  },
  {
    id: "natural-dyes", cat: "Craft", title: "Natural Dyes, Slow Color",
    excerpt: "Why we dye in small kettles with madder, indigo and pomegranate — and why it takes time.",
    art: ["#C0846A", "#4A2E26"],
    body: `
      <p>Synthetic dyes are consistent, cheap, and fast. We use some of them. But our core palette — the colors you see on the shelf — is dyed the slow way, in small kettles, with plants.</p>
      <h2>The palette</h2>
      <p>Madder root gives us the range of terracottas and clays. Indigo gives the inks. Pomegranate rind and walnut husk give golds and umbers. The result is a palette that is not identical batch to batch, in the way that a good thing should not be.</p>
      <h2>Why bother</h2>
      <p>Because color made this way carries the fabric's history in it. A madder dyed this season looks slightly different from one dyed last season, in the way that a hand-finished hem does. That difference is not a flaw; it is the point.</p>
      <p>We also dye small, because a small kettle is the only kettle you can actually see.</p>`
  }
];
