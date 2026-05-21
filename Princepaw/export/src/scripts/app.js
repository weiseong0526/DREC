/* Prince Paw — shared site logic
   - language toggle (EN/CN) via html[lang]
   - cart store (localStorage) + drawer + fly animation + toast
   - scroll reveals
   - active nav state
*/
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const STORAGE_LANG = "pp:lang";
  const STORAGE_CART = "pp:cart";

  /* =========================================================
     1. LANG
     ========================================================= */
  const initLang = () => {
    const saved = localStorage.getItem(STORAGE_LANG) || "en";
    document.documentElement.lang = saved;

    const update = (lang) => {
      document.documentElement.lang = lang;
      localStorage.setItem(STORAGE_LANG, lang);
      $$(".pp-lang button").forEach((b) => {
        b.classList.toggle("is-on", b.dataset.lang === lang);
      });
      document.dispatchEvent(new CustomEvent("pp:lang", { detail: { lang } }));
    };

    $$(".pp-lang button").forEach((b) => {
      b.classList.toggle("is-on", b.dataset.lang === saved);
      b.addEventListener("click", () => update(b.dataset.lang));
    });
  };

  /* =========================================================
     2. CART
     ========================================================= */
  const loadCart = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_CART) || "[]"); }
    catch { return []; }
  };
  const saveCart = (cart) => localStorage.setItem(STORAGE_CART, JSON.stringify(cart));

  const cartCount = (cart) => cart.reduce((n, l) => n + l.qty, 0);
  const cartTotal = (cart) => cart.reduce((s, l) => s + l.qty * l.price, 0);

  const updateBadge = () => {
    const cart = loadCart();
    const n = cartCount(cart);
    $$(".pp-cart-badge").forEach((el) => {
      el.textContent = n;
      el.style.display = n ? "flex" : "none";
    });
  };

  const findProduct = (id) => (window.PP_DATA?.products || []).find((p) => p.id === id);

  const renderDrawer = () => {
    const drawer = $(".pp-drawer");
    if (!drawer) return;
    const body = $(".pp-drawer__body", drawer);
    const foot = $(".pp-drawer__foot", drawer);
    const cart = loadCart();
    const lang = document.documentElement.lang || "en";

    if (cart.length === 0) {
      body.innerHTML = `
        <div class="pp-drawer__empty">
          <i data-lucide="shopping-bag"></i>
          <p data-en>Your bag is empty.</p>
          <p data-cn>购物袋还是空的。</p>
          <p style="font-size:13px;color:var(--fg-3);max-width:260px;">
            <span data-en>Find your pet's match in our skin quiz.</span>
            <span data-cn>用我们的护肤测试，找到合适的产品。</span>
          </p>
          <a href="quiz.html" class="pp-btn pp-btn--ghost pp-btn--small">
            <span data-en>Take the quiz</span>
            <span data-cn>开始测试</span>
          </a>
        </div>`;
      foot.style.display = "none";
    } else {
      body.innerHTML = cart.map((l) => {
        const p = findProduct(l.productId) || {};
        return `
          <div class="pp-line" data-line="${l.lineId}">
            <div class="pp-line__img"><img src="${p.img || ''}" alt=""></div>
            <div>
              <div class="pp-line__name">
                <span data-en>${p.name?.en || l.name}</span>
                <span data-cn>${p.name?.cn || l.name}</span>
              </div>
              <div class="pp-line__sub">${l.variantLabel || ""}</div>
              <div class="pp-line__qty">
                <button data-act="dec" aria-label="−">−</button>
                <span>${l.qty}</span>
                <button data-act="inc" aria-label="+">+</button>
              </div>
            </div>
            <div class="pp-line__right">
              <div class="pp-line__price">MYR ${(l.price * l.qty).toFixed(0)}</div>
              <button class="pp-line__remove" data-act="rm">
                <span data-en>Remove</span><span data-cn>移除</span>
              </button>
            </div>
          </div>`;
      }).join("");
      foot.style.display = "";
      foot.innerHTML = `
        <div class="pp-drawer__row">
          <span data-en>Subtotal</span><span data-cn>小计</span>
          <strong>MYR ${cartTotal(cart).toFixed(0)}</strong>
        </div>
        <p class="pp-drawer__note">
          <span data-en>Shipping & taxes calculated at checkout.</span>
          <span data-cn>运费与税费将于结账时计算。</span>
        </p>
        <button class="pp-btn pp-btn--primary pp-btn--block">
          <span data-en>Checkout — MYR ${cartTotal(cart).toFixed(0)}</span>
          <span data-cn>结账 — MYR ${cartTotal(cart).toFixed(0)}</span>
        </button>`;
    }

    // re-render lucide
    if (window.lucide) lucide.createIcons();
    updateBadge();
  };

  const openCart = () => {
    $(".pp-drawer")?.classList.add("is-open");
    $(".pp-scrim")?.classList.add("is-open");
  };
  const closeCart = () => {
    $(".pp-drawer")?.classList.remove("is-open");
    $(".pp-scrim")?.classList.remove("is-open");
  };

  const addToCart = (productId, variantId, qty = 1, originEl) => {
    const p = findProduct(productId);
    if (!p) return;
    const variant = (p.variants || []).find((v) => v.id === variantId) || p.variants?.[0];
    const lineId = `${productId}::${variant?.id || "default"}`;
    const cart = loadCart();
    const existing = cart.find((l) => l.lineId === lineId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        lineId,
        productId,
        variantId: variant?.id,
        variantLabel: variant?.label?.[document.documentElement.lang] || variant?.label?.en || "",
        price: variant?.price ?? p.price,
        name: p.name?.en || productId,
        qty,
      });
    }
    saveCart(cart);
    renderDrawer();
    updateBadge();
    if (originEl) flyToCart(originEl, p.img);
    toast(p.name?.[document.documentElement.lang] || p.name?.en, "added");
  };

  const toast = (productName, kind) => {
    const t = document.createElement("div");
    t.className = "pp-toast";
    const lang = document.documentElement.lang || "en";
    const txt = kind === "added"
      ? (lang === "en" ? `Added: ${productName}` : `已加入：${productName}`)
      : productName;
    t.innerHTML = `<i data-lucide="check-circle-2"></i><span>${txt}</span>`;
    document.body.appendChild(t);
    if (window.lucide) lucide.createIcons();
    setTimeout(() => {
      t.style.transition = "opacity 240ms ease, transform 240ms ease";
      t.style.opacity = "0";
      t.style.transform = "translate(-50%, 8px)";
      setTimeout(() => t.remove(), 260);
    }, 1800);
  };

  const flyToCart = (originEl, imgSrc) => {
    const targetIcon = $(".pp-iconbtn[data-cart]");
    if (!originEl || !targetIcon || !imgSrc) return;
    const o = originEl.getBoundingClientRect();
    const t = targetIcon.getBoundingClientRect();
    const fly = document.createElement("div");
    fly.className = "pp-fly";
    fly.style.left = `${o.left + o.width / 2 - 30}px`;
    fly.style.top  = `${o.top + o.height / 2 - 30}px`;
    fly.innerHTML = `<img src="${imgSrc}" alt="">`;
    document.body.appendChild(fly);
    requestAnimationFrame(() => {
      fly.style.transform = `translate(${t.left + t.width/2 - (o.left + o.width/2)}px, ${t.top + t.height/2 - (o.top + o.height/2)}px) scale(0.25)`;
      fly.style.opacity = "0";
      fly.style.width = "20px"; fly.style.height = "20px";
    });
    setTimeout(() => fly.remove(), 850);
    setTimeout(() => {
      targetIcon.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
        { duration: 360, easing: "cubic-bezier(.34, 1.56, .64, 1)" }
      );
    }, 700);
  };

  /* =========================================================
     3. SCROLL REVEAL
     ========================================================= */
  const initReveal = () => {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    $$(".reveal").forEach((el) => io.observe(el));
  };

  /* =========================================================
     4. DRAWER WIRING
     ========================================================= */
  const initDrawer = () => {
    document.body.addEventListener("click", (e) => {
      const cartBtn = e.target.closest("[data-cart]");
      if (cartBtn) { e.preventDefault(); openCart(); return; }

      const closeBtn = e.target.closest("[data-drawer-close]");
      if (closeBtn) { closeCart(); return; }

      const scrim = e.target.closest(".pp-scrim");
      if (scrim) { closeCart(); return; }

      const line = e.target.closest(".pp-line");
      if (line) {
        const act = e.target.closest("[data-act]")?.dataset.act;
        if (!act) return;
        const cart = loadCart();
        const l = cart.find((x) => x.lineId === line.dataset.line);
        if (!l) return;
        if (act === "inc") l.qty += 1;
        if (act === "dec") l.qty = Math.max(1, l.qty - 1);
        if (act === "rm") cart.splice(cart.indexOf(l), 1);
        saveCart(cart);
        renderDrawer();
        return;
      }

      // FAQ accordion
      const faqQ = e.target.closest(".pp-faq__q");
      if (faqQ) {
        const item = faqQ.closest(".pp-faq__item");
        const open = item.classList.contains("is-open");
        // optional: close others
        $$(".pp-faq__item.is-open").forEach((i) => i.classList.remove("is-open"));
        if (!open) item.classList.add("is-open");
        return;
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeCart();
    });
  };

  /* =========================================================
     5. PUBLIC API
     ========================================================= */
  window.PP = {
    addToCart,
    openCart,
    closeCart,
    renderDrawer,
    getCart: loadCart,
    findProduct,
    toast,
  };

  /* =========================================================
     6. BOOT
     ========================================================= */
  document.addEventListener("DOMContentLoaded", () => {
    initLang();
    initDrawer();
    renderDrawer();
    updateBadge();
    initReveal();
    if (window.lucide) lucide.createIcons();
  });
})();
