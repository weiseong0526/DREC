(function () {
  const STORAGE_PRODUCTS = "pp:products";
  const STORAGE_ORDERS = "pp:orders";
  const STORAGE_USERS = "pp:users";
  const STORAGE_HERO_SLIDES = "pp:heroSlides";

  const clone = (value) => JSON.parse(JSON.stringify(value));

  const loadJSON = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return clone(fallback);
      const parsed = JSON.parse(raw);
      if (Array.isArray(fallback) && !Array.isArray(parsed)) return clone(fallback);
      return parsed;
    } catch {
      return clone(fallback);
    }
  };

  const saveJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  const defaultUsers = [
    { id: "u-001", name: "Maya R.", email: "maya@example.com", tier: "VIP" },
    { id: "u-002", name: "Wei L.", email: "wei@example.com", tier: "Regular" },
    { id: "u-003", name: "Daniel K.", email: "daniel@example.com", tier: "Regular" },
  ];

  const defaultOrders = [
    { id: "o-1045", userId: "u-001", total: 72, status: "Paid" },
    { id: "o-1046", userId: "u-002", total: 54, status: "Pending" },
    { id: "o-1047", userId: "u-003", total: 22, status: "Shipped" },
  ];

  const getProducts = () => loadJSON(STORAGE_PRODUCTS, window.PP_DATA?.products || []);
  const setProducts = (products) => saveJSON(STORAGE_PRODUCTS, products || []);
  const resetProducts = () => localStorage.removeItem(STORAGE_PRODUCTS);

  const getUsers = () => loadJSON(STORAGE_USERS, defaultUsers);
  const getOrders = () => loadJSON(STORAGE_ORDERS, defaultOrders);

  const upsertProduct = (incoming) => {
    const list = getProducts();
    const idx = list.findIndex((p) => p.id === incoming.id);
    if (idx >= 0) list[idx] = incoming;
    else list.push(incoming);
    setProducts(list);
    return incoming;
  };

  const removeProduct = (id) => {
    const next = getProducts().filter((p) => p.id !== id);
    setProducts(next);
  };

  const defaultHeroSlides = () => {
    const fromData = window.PP_DATA?.heroSlides;
    if (Array.isArray(fromData) && fromData.length) return clone(fromData);
    return ["photo/main.png"];
  };

  const getHeroSlides = () => {
    try {
      const raw = localStorage.getItem(STORAGE_HERO_SLIDES);
      if (!raw) return defaultHeroSlides();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return defaultHeroSlides();
      const urls = parsed.map((s) => String(s).trim()).filter(Boolean);
      return urls.length ? urls : defaultHeroSlides();
    } catch {
      return defaultHeroSlides();
    }
  };

  const setHeroSlides = (slides) => {
    const urls = (slides || []).map((s) => String(s).trim()).filter(Boolean);
    if (!urls.length) {
      localStorage.removeItem(STORAGE_HERO_SLIDES);
      return;
    }
    saveJSON(STORAGE_HERO_SLIDES, urls);
  };

  window.PP_STORE = {
    getProducts,
    setProducts,
    resetProducts,
    upsertProduct,
    removeProduct,
    getUsers,
    getOrders,
    getHeroSlides,
    setHeroSlides,
  };
})();
