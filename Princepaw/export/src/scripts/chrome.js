/* Prince Paw — chrome partials (header, footer, drawer, scrim).
   Call PPChrome.mount({ active: "home" | "shop" | "about" | "quiz" }) early in <body>.
*/
(function () {
  const html = String.raw;

  const header = (active) => html`
    <div class="pp-announce" role="region" aria-label="Announcement">
      <div class="pp-announce__inner">
        <i data-lucide="sparkles"></i>
        <span data-en>Free Malaysia shipping on orders over <b>MYR 60</b> · 60-day Happy Skin guarantee</span>
        <span data-cn>马来西亚订单满 <b>MYR 60</b> 包邮 · 60 天「肤感无忧」保证</span>
        <i data-lucide="sparkles"></i>
      </div>
    </div>
    <header class="pp-header">
      <div class="pp-header__inner">
        <a href="index.html" class="pp-logo" aria-label="Prince Paw">
          <img src="assets/prince-paw-logo.png" alt="">
          <span class="pp-logo__wordmark" data-en>Prince Paw</span>
          <span class="pp-logo__wordmark" data-cn>御宠护肤</span>
        </a>
        <nav class="pp-nav" aria-label="Primary">
          <a href="index.html" class="pp-nav__link ${active === 'home' ? 'is-active' : ''}">
            <span data-en>Home</span><span data-cn>首页</span>
          </a>
          <a href="shop.html" class="pp-nav__link ${active === 'shop' ? 'is-active' : ''}">
            <span data-en>Shop</span><span data-cn>商城</span>
          </a>
          <a href="quiz.html" class="pp-nav__link ${active === 'quiz' ? 'is-active' : ''}">
            <span data-en>Skin Quiz</span><span data-cn>护肤测试</span>
          </a>
          <a href="about.html" class="pp-nav__link ${active === 'about' ? 'is-active' : ''}">
            <span data-en>Our Story</span><span data-cn>品牌故事</span>
          </a>
        </nav>
        <div class="pp-header__actions">
          <div class="pp-lang" role="group" aria-label="Language">
            <button data-lang="en">EN</button>
            <button data-lang="zh">中</button>
          </div>
          <button class="pp-iconbtn" aria-label="Search"><i data-lucide="search"></i></button>
          <button class="pp-iconbtn" aria-label="Account"><i data-lucide="user-round"></i></button>
          <button class="pp-iconbtn" data-cart aria-label="Cart">
            <i data-lucide="shopping-bag"></i>
            <span class="pp-cart-badge">0</span>
          </button>
        </div>
      </div>
    </header>`;

  const drawer = () => html`
    <div class="pp-scrim" aria-hidden="true"></div>
    <aside class="pp-drawer" role="dialog" aria-label="Cart">
      <div class="pp-drawer__head">
        <h3>
          <span data-en>Your Bag</span>
          <span data-cn>购物袋</span>
        </h3>
        <button class="pp-iconbtn" data-drawer-close aria-label="Close">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="pp-drawer__body"></div>
      <div class="pp-drawer__foot"></div>
    </aside>`;

  const footer = () => html`
    <footer class="pp-footer">
      <div class="pp-footer__top">
        <div class="pp-footer__brand">
          <img src="assets/prince-paw-logo.png" alt="Prince Paw">
          <p class="pp-footer__tag" data-en>Vet-formulated skincare for the pets we treat like royalty. Made small batch in Shanghai & Brooklyn.</p>
          <p class="pp-footer__tag" data-cn>由兽医配方研发的宠物护肤系列，少量批次精造于上海与布鲁克林。</p>
          <form class="pp-footer__news" onsubmit="event.preventDefault(); window.PP?.toast(this.querySelector('input').value ? 'You\\'re on the list!' : '');">
            <input type="email" placeholder="you@home.com" required>
            <button type="submit">
              <span data-en>Join</span><span data-cn>订阅</span>
            </button>
          </form>
        </div>
        <div class="pp-footer__cols">
          <div class="pp-footer__col">
            <div class="pp-footer__col-title" data-en>Shop</div>
            <div class="pp-footer__col-title" data-cn>商城</div>
            <ul>
              <li><a href="shop.html" data-en>All products</a><a href="shop.html" data-cn>全部产品</a></li>
              <li><a href="shop.html" data-en>For dogs</a><a href="shop.html" data-cn>狗狗专属</a></li>
              <li><a href="shop.html" data-en>For cats</a><a href="shop.html" data-cn>猫咪专属</a></li>
              <li><a href="shop.html" data-en>Bundles</a><a href="shop.html" data-cn>套装</a></li>
            </ul>
          </div>
          <div class="pp-footer__col">
            <div class="pp-footer__col-title" data-en>Help</div>
            <div class="pp-footer__col-title" data-cn>帮助</div>
            <ul>
              <li><a href="#" data-en>Shipping</a><a href="#" data-cn>配送</a></li>
              <li><a href="#" data-en>Returns</a><a href="#" data-cn>退换</a></li>
              <li><a href="quiz.html" data-en>Skin Quiz</a><a href="quiz.html" data-cn>护肤测试</a></li>
              <li><a href="#" data-en>Contact</a><a href="#" data-cn>联系我们</a></li>
            </ul>
          </div>
          <div class="pp-footer__col">
            <div class="pp-footer__col-title" data-en>Brand</div>
            <div class="pp-footer__col-title" data-cn>品牌</div>
            <ul>
              <li><a href="about.html" data-en>Our story</a><a href="about.html" data-cn>品牌故事</a></li>
              <li><a href="about.html" data-en>Vet panel</a><a href="about.html" data-cn>兽医顾问</a></li>
              <li><a href="#" data-en>Sustainability</a><a href="#" data-cn>可持续</a></li>
              <li><a href="#" data-en>Press</a><a href="#" data-cn>媒体</a></li>
            </ul>
          </div>
          <div class="pp-footer__col">
            <div class="pp-footer__col-title" data-en>Follow</div>
            <div class="pp-footer__col-title" data-cn>关注</div>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
              <li><a href="#">小红书</a></li>
              <li><a href="#">WeChat</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="pp-footer__bot">
        <div>© 2026 Prince Paw · <span data-en>Made for pets we love</span><span data-cn>为我们爱的宠物而作</span></div>
        <div class="pp-footer__paws">🐾 🐾 🐾</div>
        <div class="pp-footer__legal">
          <a href="#" data-en>Privacy</a><a href="#" data-cn>隐私</a>
          <a href="#" data-en>Terms</a><a href="#" data-cn>条款</a>
        </div>
      </div>
    </footer>`;

  window.PPChrome = {
    mount({ active } = {}) {
      // Header
      const h = document.createElement("div");
      h.innerHTML = header(active || "").trim();
      document.body.prepend(...h.childNodes);

      // Footer + drawer at end of body
      const f = document.createElement("div");
      f.innerHTML = (footer() + drawer()).trim();
      document.body.append(...f.childNodes);

      if (window.lucide) lucide.createIcons();
    },
  };
})();
