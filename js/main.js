/* ============================================================
   SERIC — shared chrome, procedural silk artwork, cart, and
   page renderers. Original demo code, no external dependencies.
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || "Shop";

  /* ---------------- deterministic pseudo-random ---------------- */
  function mulberry(seed) {
    let s = seed >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hexMix(x, y, t) {
    const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const A = p(x), B = p(y);
    return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
  }
  function seedOf(str) {
    let s = 0;
    for (const c of str) s = (s * 31 + c.charCodeAt(0)) >>> 0;
    return s;
  }

  /* Procedural "woven silk" artwork: layered wavy strokes over a
     two-tone gradient. No binary image assets anywhere in the repo. */
  let __uid = 0;
  function silkArt(cols, seed, o = {}) {
    const w = o.w || 600, h = o.h || 800;
    const [a, b] = cols;
    const rnd = mulberry(seed || 1);
    const gid = "sg" + (__uid++);
    let bands = "";
    const n = o.bands || 7;
    for (let i = 0; i < n; i++) {
      const base = h * (0.08 + 0.84 * (i / (n - 1))) + (rnd() - 0.5) * 36;
      const amp = 12 + rnd() * 30, ph = rnd() * Math.PI * 2;
      let d = "M -20 " + base.toFixed(1);
      for (let x = 0; x <= w + 40; x += 50) {
        d += " L " + (x - 20) + " " + (base + Math.sin(x / 95 + ph) * amp + (rnd() - 0.5) * 6).toFixed(1);
      }
      bands += '<path d="' + d + '" fill="none" stroke="' + (i % 2 ? b : a) +
        '" stroke-width="' + (34 + rnd() * 46).toFixed(0) +
        '" opacity="' + (0.10 + rnd() * 0.20).toFixed(2) + '" stroke-linecap="round"/>';
    }
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Woven silk artwork">' +
      '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + a + '"/><stop offset="0.55" stop-color="' + hexMix(a, b, 0.5) + '"/><stop offset="1" stop-color="' + b + '"/>' +
      '</linearGradient><filter id="' + gid + 'f"><feGaussianBlur stdDeviation="7"/></filter></defs>' +
      '<rect width="' + w + '" height="' + h + '" fill="url(#' + gid + ')"/>' +
      '<g filter="url(#' + gid + 'f)">' + bands + '</g></svg>';
  }
  function productArt(p, colorIdx = 0, variant = 0, o) {
    return silkArt(p.cols[colorIdx], seedOf(p.id) + colorIdx * 97 + variant * 13, o);
  }

  /* ---------------- shared chrome ---------------- */
  const ICON_BAG = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l-1.2 12.2a1.5 1.5 0 0 1-1.5 1.3H8.7a1.5 1.5 0 0 1-1.5-1.3L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';

  function mountChrome() {
    const page = document.body.dataset.page || "";
    const link = (href, label, key) =>
      '<a href="' + href + '"' + (key === page ? ' class="active" aria-current="page"' : "") + ">" + label + "</a>";

    const header = document.createElement("div");
    header.innerHTML =
      '<div class="announce">Complimentary shipping over $150 &nbsp;·&nbsp; 30-day returns &nbsp;·&nbsp; 22-momme mulberry silk</div>' +
      '<header class="site-header"><div class="container header-grid">' +
        '<nav class="header-nav" aria-label="Primary">' + link("shop.html", "Shop", "shop") + link("collections.html", "Collections", "collections") + "</nav>" +
        '<a class="brand" href="index.html" aria-label="Seric home"><span class="brand-name">SERIC</span><span class="brand-sub">silk atelier</span></a>' +
        '<div class="header-right">' + link("journal.html", "Journal", "journal") + link("about.html", "About", "about") +
          '<button class="icon-btn" data-open-cart aria-label="Open cart">' + ICON_BAG + '<span class="badge" id="cart-count" hidden>0</span></button>' +
        "</div>" +
      "</div></header>";
    document.body.prepend(header);

    const foot = document.createElement("div");
    foot.innerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand"><span class="brand-name">SERIC</span><p>Seric is an original demo silk atelier. Every word, every piece of artwork and every design decision on this site was generated for this project.</p></div>' +
        "<div><h4>Shop</h4><div class=\"footer-links\">" + CATEGORIES.map(c => '<a href="shop.html?cat=' + c.id + '">' + c.name + "</a>").join("") + "</div></div>" +
        '<div><h4>House</h4><div class="footer-links"><a href="collections.html">Collections</a><a href="journal.html">Journal</a><a href="about.html">Our Craft</a><a href="about.html#contact">Contact</a></div></div>' +
        '<div><h4>Care</h4><div class="footer-links"><a href="journal.html?id=care-for-silk">Silk Care</a><a href="journal.html?id=cocoon-to-cloth">How It Is Made</a><a href="about.html#contact">Shipping &amp; Returns</a><a href="about.html#contact">Wholesale</a></div></div>' +
      "</div>" +
      '<div class="footer-base"><span>© 2026 Seric — an original concept study.</span><span>Pattern-inspired demo; not affiliated with any real brand.</span></div>' +
      "</div></footer>";
    document.body.appendChild(foot);

    const drawer = document.createElement("aside");
    drawer.id = "cart-drawer";
    drawer.className = "drawer";
    drawer.setAttribute("aria-hidden", "true");
    drawer.innerHTML =
      '<div class="drawer-head"><h3>Your Cart</h3><button class="drawer-close" data-close-cart aria-label="Close cart">✕</button></div>' +
      '<div class="drawer-body" id="cart-lines"></div>' +
      '<div class="drawer-foot"><div class="subtotal"><span>Subtotal</span><strong id="cart-subtotal">$0</strong></div>' +
      '<button class="btn btn--solid" id="cart-checkout" style="width:100%">Checkout</button>' +
      '<p class="drawer-note">Demo checkout — no payment provider is connected.</p></div>';
    document.body.appendChild(drawer);

    const back = document.createElement("div");
    back.className = "drawer-backdrop";
    back.id = "drawer-backdrop";
    document.body.appendChild(back);

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  /* ---------------- cart ---------------- */
  const CART_KEY = "seric-cart-v1";
  function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
  }
  function saveCart(lines) {
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
    renderCart();
  }
  function addToCart(id, sizeIdx, colorIdx) {
    sizeIdx = sizeIdx | 0; colorIdx = colorIdx | 0;
    const lines = loadCart();
    const hit = lines.find(x => x.id === id && x.size === sizeIdx && x.color === colorIdx);
    if (hit) hit.qty++; else lines.push({ id, size: sizeIdx, color: colorIdx, qty: 1 });
    saveCart(lines);
    openDrawer();
  }
  function renderCart() {
    const lines = $("#cart-lines"), badge = $("#cart-count");
    if (!lines) return;
    const l = loadCart();
    const total = l.reduce((s, x) => s + x.qty, 0);
    badge.textContent = total;
    badge.hidden = total === 0;
    if (!l.length) {
      lines.innerHTML = '<p class="cart-empty">Your cart is empty.<span>The loom, however, is not.</span></p>';
      $("#cart-subtotal").textContent = "$0";
      return;
    }
    lines.innerHTML = l.map((x, i) => {
      const p = PRODUCTS.find(pp => pp.id === x.id);
      if (!p) return "";
      const meta = [p.colors[x.color], p.sizes[x.size]].filter(Boolean).join(" · ");
      return '<div class="cart-line">' +
        '<div class="cart-line-art">' + productArt(p, x.color, 0, { w: 128, h: 170 }) + "</div>" +
        '<div><strong class="cart-line-name">' + p.name + "</strong>" +
        '<span class="cart-line-meta">' + meta + "</span>" +
        '<div class="qty"><button data-qty="-1" data-line="' + i + '" aria-label="Decrease quantity">−</button><span>' + x.qty + '</span><button data-qty="1" data-line="' + i + '" aria-label="Increase quantity">+</button></div></div>' +
        '<div class="cart-line-price">$' + (p.price * x.qty) + "</div></div>";
    }).join("");
    $("#cart-subtotal").textContent = "$" + l.reduce((s, x) => {
      const p = PRODUCTS.find(pp => pp.id === x.id);
      return s + (p ? p.price * x.qty : 0);
    }, 0);
  }
  function openDrawer() {
    renderCart();
    $("#cart-drawer").classList.add("open");
    $("#drawer-backdrop").classList.add("open");
    $("#cart-drawer").setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    $("#cart-drawer").classList.remove("open");
    $("#drawer-backdrop").classList.remove("open");
    $("#cart-drawer").setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---------------- renderers ---------------- */
  function productCard(p) {
    return '<article class="product-card"><div class="product-art">' +
      productArt(p, 0, 0) +
      (p.tag ? '<span class="card-tag">' + p.tag + "</span>" : "") +
      '<a class="art-link" href="product.html?id=' + p.id + '" aria-label="' + p.name + '"></a>' +
      '<button class="card-add" data-add="' + p.id + '">Add to Cart</button>' +
      "</div>" +
      '<div class="product-meta"><span class="product-name">' + p.name + '</span><span class="product-price">$' + p.price + "</span></div>" +
      "</article>";
  }
  function categoryTile(c, i) {
    return '<a class="tile" href="shop.html?cat=' + c.id + '">' + silkArt(c.cols, 400 + i * 37, { w: 600, h: 750 }) +
      '<div class="tile-label"><h3>' + c.name + '</h3><span>Explore</span></div></a>';
  }

  /* ---------------- page initializers ---------------- */
  function initHome() {
    $("#new-arrivals").innerHTML = PRODUCTS.slice(0, 8).map(productCard).join("");
    $("#category-tiles").innerHTML = CATEGORIES.map(categoryTile).join("");
    $("#editorial-art").innerHTML = silkArt(["#C9B49A", "#8A6B3E"], 999, { w: 900, h: 1100, bands: 9 });
  }

  function initShop() {
    const params = new URLSearchParams(location.search);
    let cat = params.get("cat") || "all";
    let sort = "featured";
    const grid = $("#product-grid");
    const filterBtns = $$("#filter-btns .filter-btn");

    function render() {
      let list = PRODUCTS.filter(p => cat === "all" || p.cat === cat);
      if (sort === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
      if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
      if (sort === "name")       list = [...list].sort((a, b) => a.name.localeCompare(b.name));
      grid.innerHTML = list.map(productCard).join("");
      $("#shop-empty").style.display = list.length ? "none" : "block";
      $("#shop-count").textContent = list.length + " pieces";
      filterBtns.forEach(b => b.classList.toggle("active", b.dataset.cat === cat));
    }
    filterBtns.forEach(b => b.addEventListener("click", () => {
      cat = b.dataset.cat;
      try { history.replaceState(null, "", b.dataset.cat === "all" ? "shop.html" : "shop.html?cat=" + b.dataset.cat); } catch (e) {}
      render();
    }));
    $("#sort-select").addEventListener("change", e => { sort = e.target.value; render(); });
    render();
  }

  function initProduct() {
    const id = new URLSearchParams(location.search).get("id") || PRODUCTS[0].id;
    const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
    let ci = 0, vi = 0;
    const add = $("#pdp-add");

    $("#crumb-cat").textContent = catName(p.cat);
    $("#crumb-name").textContent = p.name;
    $("#pdp-cat").textContent = catName(p.cat);
    $("#pdp-name").textContent = p.name;
    $("#pdp-price").textContent = "$" + p.price;
    $("#pdp-desc").textContent = p.desc;
    add.dataset.add = p.id;
    add.dataset.color = "0";
    add.dataset.size = "0";
    document.title = p.name + " — Seric";

    function renderGallery() {
      $("#gallery-main").innerHTML = productArt(p, ci, vi, { w: 720, h: 960 });
      $("#gallery-thumbs").innerHTML = [0, 1, 2].map(v =>
        '<button class="thumb' + (v === vi ? " active" : "") + '" data-thumb="' + v + '" aria-label="View ' + (v + 1) + '">' +
        productArt(p, ci, v, { w: 240, h: 320 }) + "</button>").join("");
    }
    $("#pdp-swatches").innerHTML = p.colors.map((c, i) =>
      '<button class="swatch' + (i === 0 ? " active" : "") + '" data-color="' + i + '" style="background:' + p.cols[i][0] + '" aria-label="' + c + '"></button>').join("");
    $("#pdp-sizes").innerHTML = p.sizes.map((s, i) =>
      '<button class="size-opt' + (i === 0 ? " active" : "") + '" data-size="' + i + '">' + s + "</button>").join("");
    renderGallery();

    $("#pdp-swatches").addEventListener("click", e => {
      const b = e.target.closest("[data-color]"); if (!b) return;
      ci = +b.dataset.color;
      $$("#pdp-swatches .swatch").forEach(s => s.classList.toggle("active", s === b));
      add.dataset.color = String(ci);
      renderGallery();
    });
    $("#pdp-sizes").addEventListener("click", e => {
      const b = e.target.closest("[data-size]"); if (!b) return;
      add.dataset.size = b.dataset.size;
      $$("#pdp-sizes .size-opt").forEach(s => s.classList.toggle("active", s === b));
    });
    $("#gallery-thumbs").addEventListener("click", e => {
      const b = e.target.closest("[data-thumb]"); if (!b) return;
      vi = +b.dataset.thumb;
      renderGallery();
    });
    $$("#pdp-acc .acc-btn").forEach(btn => btn.addEventListener("click", () =>
      btn.closest(".acc-item").classList.toggle("open")));

    const rel = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id);
    const fill = rel.length >= 4 ? rel : rel.concat(PRODUCTS.filter(x => x.cat !== p.cat && x.id !== p.id)).slice(0, 4);
    $("#related").innerHTML = fill.map(productCard).join("");
  }

  function initCollections() {
    $("#collection-grid").innerHTML = COLLECTIONS.map((c, i) =>
      '<a class="tile tile--wide" href="shop.html?cat=' + c.cat + '">' + silkArt(c.cols[0], 700 + i * 53, { w: 900, h: 700 }) +
      '<div class="tile-label"><h3>' + c.name + "</h3><span>" + c.desc + "</span></div></a>").join("");
  }

  function initJournal() {
    const id = new URLSearchParams(location.search).get("id");
    const a = ARTICLES.find(x => x.id === id);
    if (a) {
      $("#journal-section").style.display = "none";
      const v = $("#article-view");
      v.style.display = "block";
      v.innerHTML =
        '<div class="article-hero">' + silkArt(a.art, 800 + a.id.length, { w: 1000, h: 560, bands: 9 }) + "</div>" +
        '<div class="article-body"><span class="eyebrow">' + a.cat + " · Winter 2026 · 6 min read</span>" +
        "<h1>" + a.title + '</h1><p class="article-lede">' + a.excerpt + "</p>" + a.body + "</div>";
      document.title = a.title + " — Seric Journal";
      window.scrollTo(0, 0);
    } else {
      $("#journal-grid").innerHTML = ARTICLES.map((x, i) =>
        '<article class="article-card">' + silkArt(x.art, 500 + i * 91, { w: 800, h: 600 }) +
        '<div class="article-card-body"><span class="eyebrow">' + x.cat + "</span>" +
        "<h3><a href=\"journal.html?id=" + x.id + '">' + x.title + "</a></h3>" +
        "<p>" + x.excerpt + "</p>" +
        '<a class="article-more" href="journal.html?id=' + x.id + '">Read the article</a></div></article>').join("");
    }
  }

  /* ---------------- global delegation ---------------- */
  document.addEventListener("click", e => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      e.preventDefault();
      const p = PRODUCTS.find(x => x.id === addBtn.dataset.add);
      if (!p) return;
      addToCart(p.id, addBtn.dataset.size | 0, addBtn.dataset.color | 0);
      toast("Added to cart — " + p.name);
      return;
    }
    if (e.target.closest("[data-open-cart]")) { openDrawer(); return; }
    if (e.target.closest("[data-close-cart]") || e.target.id === "drawer-backdrop") { closeDrawer(); return; }
    const qb = e.target.closest("[data-qty]");
    if (qb) {
      const lines = loadCart();
      const x = lines[+qb.dataset.line];
      if (!x) return;
      x.qty += +qb.dataset.qty;
      if (x.qty <= 0) lines.splice(+qb.dataset.line, 1);
      saveCart(lines);
      return;
    }
    if (e.target.id === "cart-checkout") {
      toast(loadCart().length ? "Demo checkout — connect a provider to go further." : "Nothing to check out yet.");
      return;
    }
    if (e.target.closest("[data-wishlist]")) { toast("Saved to your list (demo)."); }
  });

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

  /* ---------------- boot ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    mountChrome();
    const page = document.body.dataset.page;
    const init = {
      home: initHome, shop: initShop, product: initProduct,
      collections: initCollections, journal: initJournal
    }[page] || (() => {});
    init();
    renderCart();
    const nf = $("#newsletter-form");
    if (nf) nf.addEventListener("submit", e => {
      e.preventDefault();
      toast("You're on the list — the first letter is a demo.");
      nf.reset();
    });
  });
})();
