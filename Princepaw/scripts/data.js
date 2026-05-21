/* Prince Paw — invented product catalog + content data */
window.PP_DATA = {
  products: [
    {
      id: "royal-paw-balm",
      slug: "royal-paw-balm",
      name: { en: "Royal Paw Balm", cn: "御足舒润膏" },
      sub: { en: "Cracked-pad rescue · 30ml", cn: "干裂肉垫修护 · 30ml" },
      tagline: {
        en: "A buttery balm that soothes cracked pads in days.",
        cn: "丝滑膏体，几日舒缓干裂肉垫。",
      },
      price: 24,
      compare: 30,
      ribbon: { en: "Bestseller", cn: "热销", color: "gold" },
      tags: ["paws", "dog", "cat", "dry"],
      rating: 4.9,
      reviews: 1284,
      img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900&q=80&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581888227599-779811939961?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=900&q=80&auto=format&fit=crop",
      ],
      variants: [
        { id: "30", label: { en: "30 ml", cn: "30 毫升" }, sub: { en: "Pocket", cn: "便携装" }, price: 24 },
        { id: "75", label: { en: "75 ml", cn: "75 毫升" }, sub: { en: "Best value", cn: "超值装" }, price: 42 },
        { id: "150", label: { en: "150 ml", cn: "150 毫升" }, sub: { en: "Family", cn: "家庭装" }, price: 72 },
      ],
    },
    {
      id: "coat-glow-shampoo",
      slug: "coat-glow-shampoo",
      name: { en: "Coat Glow Shampoo", cn: "毛感光泽洗护露" },
      sub: { en: "Tear-free · 250ml", cn: "无泪配方 · 250ml" },
      tagline: {
        en: "Oat & honey lather that leaves the coat soft and shiny.",
        cn: "燕麦蜂蜜泡沫，赋予毛发柔顺光泽。",
      },
      price: 32,
      ribbon: { en: "New", cn: "新品", color: "cocoa" },
      tags: ["coat", "dog", "shine"],
      rating: 4.8,
      reviews: 612,
      img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=900&q=80&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=900&q=80&auto=format&fit=crop",
      ],
      variants: [
        { id: "250", label: { en: "250 ml", cn: "250 毫升" }, sub: { en: "Travel", cn: "旅行装" }, price: 32 },
        { id: "500", label: { en: "500 ml", cn: "500 毫升" }, sub: { en: "Home", cn: "家庭装" }, price: 54 },
      ],
    },
    {
      id: "calm-belly-mist",
      slug: "calm-belly-mist",
      name: { en: "Calm Belly Mist", cn: "舒敏柔肤喷雾" },
      sub: { en: "Sensitive skin · 120ml", cn: "敏感肌适用 · 120ml" },
      tagline: {
        en: "A mist that takes the sting out of itchy hot spots.",
        cn: "舒缓喷雾，瞬时镇定瘙痒发热部位。",
      },
      price: 26,
      ribbon: { en: "Vet-loved", cn: "兽医推荐", color: "mint" },
      tags: ["soothe", "dog", "cat", "sensitive"],
      rating: 4.9,
      reviews: 487,
      img: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=900&q=80&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1559563458-527698bf5295?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546975490-a79f0a541605?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582456891925-a53965520520?w=900&q=80&auto=format&fit=crop",
      ],
      variants: [
        { id: "120", label: { en: "120 ml", cn: "120 毫升" }, sub: { en: "Single", cn: "单瓶" }, price: 26 },
        { id: "2pk", label: { en: "Duo", cn: "两瓶装" }, sub: { en: "Save 15%", cn: "省 15%" }, price: 44 },
      ],
    },
    {
      id: "crown-face-wash",
      slug: "crown-face-wash",
      name: { en: "Crown Tear-Free Face Wash", cn: "御冠无泪洁颜泡沫" },
      sub: { en: "Around-eye safe · 180ml", cn: "可用于眼周 · 180ml" },
      tagline: {
        en: "A whipped foam wash that's gentle around eyes and ears.",
        cn: "蓬松泡沫，眼周耳周也能温柔清洁。",
      },
      price: 28,
      ribbon: { en: "Limited", cn: "限定", color: "pink" },
      tags: ["face", "dog", "cat", "gentle"],
      rating: 4.7,
      reviews: 318,
      img: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=900&q=80&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=900&q=80&auto=format&fit=crop",
      ],
      variants: [
        { id: "180", label: { en: "180 ml", cn: "180 毫升" }, sub: { en: "Standard", cn: "标准装" }, price: 28 },
      ],
    },
    {
      id: "velvet-conditioner",
      slug: "velvet-conditioner",
      name: { en: "Velvet Coat Conditioner", cn: "丝绒护毛素" },
      sub: { en: "Detangle · 200ml", cn: "顺滑解结 · 200ml" },
      tagline: {
        en: "Silky-smooth detangler with argan and pro-vitamin B5.",
        cn: "丝滑配方，摩洛哥坚果与维他命 B5。",
      },
      price: 30,
      tags: ["coat", "dog", "longhair"],
      rating: 4.8,
      reviews: 226,
      img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=900&q=80&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900&q=80&auto=format&fit=crop",
      ],
      variants: [
        { id: "200", label: { en: "200 ml", cn: "200 毫升" }, sub: { en: "Standard", cn: "标准装" }, price: 30 },
        { id: "500", label: { en: "500 ml", cn: "500 毫升" }, sub: { en: "Salon size", cn: "美容院装" }, price: 58 },
      ],
    },
    {
      id: "soothe-itch-spray",
      slug: "soothe-itch-spray",
      name: { en: "Soothe Itch Spray", cn: "止痒舒缓喷雾" },
      sub: { en: "Fast relief · 100ml", cn: "迅速止痒 · 100ml" },
      tagline: {
        en: "A cooling mist with colloidal oat and chamomile.",
        cn: "胶体燕麦与洋甘菊，清凉止痒。",
      },
      price: 22,
      tags: ["soothe", "dog", "cat", "itchy"],
      rating: 4.7,
      reviews: 165,
      img: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=900&q=80&auto=format&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1559563458-527698bf5295?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546975490-a79f0a541605?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582456891925-a53965520520?w=900&q=80&auto=format&fit=crop",
      ],
      variants: [
        { id: "100", label: { en: "100 ml", cn: "100 毫升" }, sub: { en: "Standard", cn: "标准装" }, price: 22 },
      ],
    },
  ],

  /* ---------- Home hero carousel (slide 1 = copy overlay; 2+ = image only) ---------- */
  heroSlides: [
    "photo/main.png",
    "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=1400&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=1400&q=80&auto=format&fit=crop",
  ],

  /* ---------- Hero & global photos (stock) ---------- */
  photos: {
    heroMain:  "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=900&q=80&auto=format&fit=crop", // dog being bathed
    heroTop:   "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80&auto=format&fit=crop", // dog paws
    heroBot:   "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=600&q=80&auto=format&fit=crop", // happy cat
    science:   "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80&auto=format&fit=crop",   // lab/skincare
    aboutA:    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80&auto=format&fit=crop", // fluffy dog
    aboutB:    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900&q=80&auto=format&fit=crop", // tabby cat
    aboutC:    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=900&q=80&auto=format&fit=crop", // pet bath
  },

  /* ---------- Reviews ---------- */
  reviews: [
    {
      stars: 5,
      quote: {
        en: "After 4 days my golden's paws went from sandpaper to silk. The balm is now part of our nightly snuggle routine.",
        cn: "用了四天，我家金毛的肉垫从粗糙变得柔软。现在是我们每晚的睡前仪式。",
      },
      by: { en: "Maya R.", cn: "玛雅 R." },
      pet: { en: "Golden retriever, 4yo", cn: "金毛 · 4岁" },
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop",
    },
    {
      stars: 5,
      quote: {
        en: "My senior cat finally tolerates bath day. Coat Glow is the only shampoo that doesn't dry her skin.",
        cn: "终于洗澡不再受罪了。光泽洗护露是唯一不让我家老猫皮肤干燥的产品。",
      },
      by: { en: "Wei L.", cn: "李 伟" },
      pet: { en: "Tabby, 12yo", cn: "虎斑猫 · 12岁" },
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format&fit=crop",
    },
    {
      stars: 5,
      quote: {
        en: "The mist is a hot-spot miracle. I bring it to every vet visit and the techs ask for the brand.",
        cn: "舒敏喷雾简直是热点神器。带去医院，连兽医师都问是什么牌子。",
      },
      by: { en: "Daniel K.", cn: "丹尼尔 K." },
      pet: { en: "Frenchie, 2yo", cn: "法斗 · 2岁" },
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop",
    },
  ],

  /* ---------- FAQs ---------- */
  faqs: [
    {
      q: { en: "Is everything safe for both dogs and cats?", cn: "适用于狗和猫吗？" },
      a: {
        en: "Yes. Every Prince Paw formula is reviewed by our in-house veterinary panel for safe use on both dogs and cats over 8 weeks old. We never use essential oils that are toxic to felines (no tea tree, no pennyroyal, no clove).",
        cn: "可以。每款 Prince Paw 产品都由内部兽医团队审核，适用于 8 周龄以上的犬猫。我们绝不使用对猫有毒的精油（无茶树、无薄荷油、无丁香）。",
      },
    },
    {
      q: { en: "How fast will I see results?", cn: "多久能看到效果？" },
      a: {
        en: "Most pet parents report visibly softer skin and coat within 5–7 days of daily use. The Royal Paw Balm typically heals cracked pads in 3–4 nights.",
        cn: "大多数主人在坚持使用 5–7 天后能看到明显的柔软改善。御足舒润膏一般 3–4 个晚上即可修护干裂肉垫。",
      },
    },
    {
      q: { en: "Where do you ship?", cn: "发货范围？" },
      a: {
        en: "We ship across Malaysia (free over MYR 60), Singapore, and Greater China. Malaysia orders ship locally; other regions use tracked international post.",
        cn: "支持马来西亚（满 MYR 60 包邮）、新加坡与大中华区。马来西亚订单本地发货，其他地区为国际追踪邮寄。",
      },
    },
    {
      q: { en: "What if my pet's skin doesn't agree?", cn: "如果不适用怎么办？" },
      a: {
        en: "We offer a 60-day Happy Skin guarantee. If your pet's skin doesn't love it, we refund the full purchase — keep or donate the bottle, your call.",
        cn: "我们提供 60 天「肤感无忧」保证。如不合适，全额退款，无需寄回。",
      },
    },
    {
      q: { en: "Are the bottles refillable?", cn: "瓶子可以补充装吗？" },
      a: {
        en: "All bottles 180ml and up come with a refill program. Order a pouch refill at 30% off and we'll send a prepaid mailer to recycle your pump.",
        cn: "180ml 及以上规格均加入补充计划。补充装享 7 折，附寄回标签回收原瓶。",
      },
    },
  ],
};
