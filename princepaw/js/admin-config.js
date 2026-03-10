// Prince Paw - Simple Admin Config
// NOTE: This stores data only in this browser using localStorage.
// It does NOT provide secure login or shared editing between users.

(function () {
    const STORAGE_KEY = 'princepaw_admin_config_v1';

    const defaultConfig = {
        products: {
            'odour-control': {
                id: 'odour-control',
                name: 'Fresh Scent Shampoo',
                subtitle: 'Odour Control',
                category: 'Smelly / Odour',
                priceA: 19.99,
                priceB: 34.99,
                imageA: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80',
                imageB: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80'
            },
            'shedding': {
                id: 'shedding',
                name: 'Anti-Shed Formula',
                subtitle: 'Reduce Shedding',
                category: 'Shedding',
                price: 28.99,
                image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80'
            },
            'sensitive-skin': {
                id: 'sensitive-skin',
                name: 'Soothing Oatmeal Shampoo',
                subtitle: 'Sensitive Skin Care',
                category: 'Sensitive / Itchy Skin',
                priceA: 26.99,
                priceB: 48.99,
                imageA: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80',
                imageB: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80'
            },
            'dandruff-infection': {
                id: 'dandruff-infection',
                name: 'Medicated Relief Shampoo',
                subtitle: 'Dandruff & Infection',
                category: 'Dandruff / Infection',
                price: 32.99,
                image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80'
            },
            'flea-tick': {
                id: 'flea-tick',
                name: 'Flea & Tick Defense',
                subtitle: 'Protection & Prevention',
                category: 'Flea & Tick Control',
                priceA: 25.49,
                priceB: 45.99,
                imageA: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80',
                imageB: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&q=80'
            }
        }
    };

    function loadConfig() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return JSON.parse(JSON.stringify(defaultConfig));
            const parsed = JSON.parse(raw);
            // Shallow merge defaults with stored values
            return {
                products: Object.assign({}, defaultConfig.products, parsed.products || {})
            };
        } catch {
            return JSON.parse(JSON.stringify(defaultConfig));
        }
    }

    function saveConfig(cfg) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    }

    // Admin page: render list + detail editor
    function renderAdmin() {
        const listEl = document.getElementById('adminProductList');
        const detailEl = document.getElementById('adminProductDetail');
        if (!listEl || !detailEl) return;
        const cfg = loadConfig();
        const products = cfg.products;
        const keys = Object.keys(products);

        listEl.innerHTML = '';

        keys.forEach(key => {
            const p = products[key];
            const btn = document.createElement('button');
            btn.className = 'admin-product-item';
            btn.setAttribute('data-product', key);
            btn.innerHTML = `<strong>${p.name || '(Unnamed product)'}</strong><br><span style="font-size:0.8rem;color:#a27a4a;">${key}</span>`;
            btn.addEventListener('click', () => selectProduct(key));
            listEl.appendChild(btn);
        });

        function selectProduct(id) {
            const p = products[id];
            if (!p) return;
            listEl.querySelectorAll('.admin-product-item').forEach(el => {
                el.classList.toggle('active', el.getAttribute('data-product') === id);
            });
            detailEl.innerHTML = `
                <h2 style="margin-bottom:0.5rem;">Edit Product</h2>
                <p style="font-size:0.9rem;color:#a27a4a;margin-bottom:1rem;">ID: <strong>${id}</strong></p>
                <div class="account-form">
                    <label>Name
                        <input type="text" data-field="name" data-product="${id}" value="${p.name || ''}">
                    </label>
                    <label>Subtitle / Short text
                        <input type="text" data-field="subtitle" data-product="${id}" value="${p.subtitle || ''}">
                    </label>
                    <label>Category
                        <input type="text" data-field="category" data-product="${id}" value="${p.category || ''}">
                    </label>
                    <label>Promotion / Badge text (e.g. NEW, 15% OFF)
                        <input type="text" data-field="promoLabel" data-product="${id}" value="${p.promoLabel || ''}">
                    </label>
                    <label>Price SET A
                        <input type="number" step="0.01" data-field="priceA" data-product="${id}" value="${p.priceA ?? p.price ?? ''}">
                    </label>
                    <label>Price SET B (if used)
                        <input type="number" step="0.01" data-field="priceB" data-product="${id}" value="${p.priceB ?? ''}">
                    </label>
                    <label>Image URL SET A / main
                        <input type="text" data-field="imageA" data-product="${id}" value="${p.imageA || p.image || ''}">
                    </label>
                    <label>Image URL SET B (if used)
                        <input type="text" data-field="imageB" data-product="${id}" value="${p.imageB || ''}">
                    </label>
                    <label>Long description (for product page)
                        <textarea data-field="description" data-product="${id}" rows="4">${p.description || ''}</textarea>
                    </label>
                </div>
                <div class="section-cta" style="display:flex;justify-content:space-between;gap:1rem;margin-top:1.5rem;">
                    <button id="deleteProduct" class="btn-primary" style="background:#b33939;border-color:#b33939;">Delete Product</button>
                    <button id="saveProduct" class="btn-primary">Save Product</button>
                </div>
            `;

            const deleteBtn = detailEl.querySelector('#deleteProduct');
            if (deleteBtn) {
                deleteBtn.onclick = function () {
                    if (!confirm('Delete this product?')) return;
                    const updated = loadConfig();
                    delete updated.products[id];
                    saveConfig(updated);
                    renderAdmin();
                };
            }

            const saveBtn = detailEl.querySelector('#saveProduct');
            if (saveBtn) {
                saveBtn.onclick = function () {
                    const updated = loadConfig();
                    const inputs = detailEl.querySelectorAll('[data-product][data-field]');
                    inputs.forEach(input => {
                        const key = input.getAttribute('data-product');
                        const field = input.getAttribute('data-field');
                        const prod = updated.products[key] || (updated.products[key] = { id: key });
                        let val = input.value;
                        if (field.startsWith('price') && val !== '') {
                            val = parseFloat(val);
                        }
                        prod[field] = val;
                    });
                    saveConfig(updated);
                    alert('Product saved.');
                    renderAdmin();
                };
            }
        }

        if (keys.length) {
            selectProduct(keys[0]);
        } else {
            detailEl.innerHTML = '<p>No products yet. Click “+ Add Product” to create one.</p>';
        }

        const addBtn = document.getElementById('addProduct');
        if (addBtn) {
            addBtn.onclick = function () {
                const cfg = loadConfig();
                let id = prompt('Enter new product ID (e.g. new-shampoo):');
                if (!id) return;
                id = id.trim().toLowerCase();
                if (!/^[a-z0-9\-]+$/.test(id)) {
                    alert('Please use only letters, numbers and dashes for the product ID.');
                    return;
                }
                if (cfg.products[id]) {
                    alert('A product with this ID already exists.');
                    return;
                }
                cfg.products[id] = {
                    id,
                    name: '',
                    subtitle: '',
                    category: '',
                    promoLabel: '',
                    priceA: 0,
                    priceB: 0,
                    imageA: '',
                    imageB: '',
                    description: ''
                };
                saveConfig(cfg);
                renderAdmin();
            };
        }

        const globalSaveBtn = document.getElementById('saveAdmin');
        if (globalSaveBtn) {
            globalSaveBtn.onclick = function () {
                alert('Use "Save Product" inside the editor for each product. Global save is not required.');
            };
        }
    }

    // Frontend: apply config to shop/product pages
    function applyConfigToShopAndProducts() {
        const cfg = loadConfig();
        const products = cfg.products;

        // Shop cards
        document.querySelectorAll('.shop-product-card').forEach(card => {
            const filter = card.getAttribute('data-filter');
            if (!filter) return;
            let key = filter;
            if (filter === 'odour') key = 'odour-control';
            if (filter === 'flea') key = 'flea-tick';
            if (filter === 'sensitive') key = 'sensitive-skin';
            if (filter === 'dandruff') key = 'dandruff-infection';
            const p = products[key];
            if (!p) return;
            const nameEl = card.querySelector('h3');
            const subtitleEl = card.querySelector('.product-subtitle');
            const priceEl = card.querySelector('.price-current');
            const imgEl = card.querySelector('.product-image img');
            const favBtn = card.querySelector('.product-favourite');
            const badgeEl = card.querySelector('.product-badge');
            const optionBtns = card.querySelectorAll('.product-options .option-btn');

            if (nameEl && p.name) nameEl.textContent = p.name;
            if (subtitleEl && p.subtitle) subtitleEl.textContent = p.subtitle;
            if (badgeEl && p.promoLabel) badgeEl.textContent = p.promoLabel;

            // Single-price products
            if (!optionBtns.length && priceEl && (p.price || p.priceA)) {
                priceEl.textContent = '$' + (p.price ?? p.priceA).toFixed(2);
            }

            // Set products
            if (optionBtns.length) {
                optionBtns.forEach(btn => {
                    const set = btn.getAttribute('data-set');
                    if (set === 'a' && p.priceA) {
                        btn.setAttribute('data-price', p.priceA);
                    }
                    if (set === 'b' && p.priceB) {
                        btn.setAttribute('data-price', p.priceB);
                    }
                    if (set === 'a' && p.imageA) {
                        btn.setAttribute('data-img', p.imageA);
                    }
                    if (set === 'b' && p.imageB) {
                        btn.setAttribute('data-img', p.imageB);
                    }
                });
                // Use SET A image for card thumb
                if (imgEl && (p.imageA || p.image)) {
                    imgEl.src = p.imageA || p.image;
                }
            } else if (imgEl && (p.image || p.imageA)) {
                imgEl.src = p.image || p.imageA;
            }

            if (favBtn) {
                if (p.image || p.imageA) favBtn.setAttribute('data-image', p.image || p.imageA);
            }
        });

        // Product detail pages
        const detailInfo = document.querySelector('.product-info[data-id]');
        if (detailInfo) {
            const pid = detailInfo.getAttribute('data-id');
            const p = products[pid];
            if (p) {
                const titleEl = detailInfo.querySelector('h1');
                const priceEl = detailInfo.querySelector('#productPrice');
                const descEl = detailInfo.querySelector('.description');
                if (titleEl && p.name) titleEl.textContent = p.name;
                if (priceEl) {
                    const hasSets = !!detailInfo.querySelector('.product-set-options');
                    if (hasSets) {
                        priceEl.textContent = '$' + (p.priceA ?? parseFloat(detailInfo.dataset.price || 0)).toFixed(2);
                    } else if (p.price) {
                        priceEl.textContent = '$' + p.price.toFixed(2);
                    }
                }
                if (p.imageA || p.image) {
                    detailInfo.dataset.image = p.imageA || p.image;
                }
                if (descEl && p.description) {
                    descEl.textContent = p.description;
                }
            }
        }
    }

    // Frontend: apply config to home page sections (index.html)
    function applyConfigToHome() {
        const cfg = loadConfig();
        const products = cfg.products;

        function productIdFromHref(href) {
            try {
                const clean = (href || '').split('#')[0].split('?')[0];
                const m = clean.match(/products\/([^\/]+)\.html$/);
                return m ? m[1] : null;
            } catch {
                return null;
            }
        }

        function formatMoney(n) {
            const num = typeof n === 'number' ? n : parseFloat(n);
            if (!isFinite(num)) return null;
            return '$' + num.toFixed(2);
        }

        // Promotion cards on home
        document.querySelectorAll('.promotion-section a.kit-card[href]').forEach(card => {
            const pid = productIdFromHref(card.getAttribute('href'));
            if (!pid) return;
            const p = products[pid];
            if (!p) return;

            const imgEl = card.querySelector('.kit-card-img img');
            const titleEl = card.querySelector('.kit-card-title');
            const priceEl = card.querySelector('.kit-card-price');

            const img = p.imageA || p.image;
            if (imgEl && img) imgEl.src = img;

            if (titleEl && p.name) {
                const current = (titleEl.textContent || '').trim();
                if (current.includes('—')) {
                    const parts = current.split('—');
                    titleEl.textContent = (parts[0].trim() + ' — ' + p.name).trim();
                } else {
                    titleEl.textContent = p.name;
                }
            }

            const money = formatMoney(p.priceA ?? p.price);
            if (priceEl && money) {
                const rest = (priceEl.textContent || '').replace(/^\s*\$[0-9]+(?:\.[0-9]{1,2})?\s*/, '');
                priceEl.textContent = money + (rest ? ' ' + rest.trim() : '');
            }
        });

        // Hero carousel product blocks on home
        document.querySelectorAll('.hero-carousel .hero-product-block').forEach(block => {
            const link = block.querySelector('a.hero-cta[href]');
            const pid = link ? productIdFromHref(link.getAttribute('href')) : null;
            if (!pid) return;
            const p = products[pid];
            if (!p) return;

            const titleEl = block.querySelector('h2');
            const imgEl = block.querySelector('.hero-product-img img');
            const descEl = block.querySelector('p');

            if (titleEl && p.name) titleEl.textContent = p.name;
            if (descEl && p.subtitle) descEl.textContent = p.subtitle;
            const img = p.imageA || p.image;
            if (imgEl && img) imgEl.src = img;
            if (imgEl && p.name) imgEl.alt = p.name;
        });

        // "Looking for a solution?" kit boxes on home
        document.querySelectorAll('.solution-section .solution-slide').forEach(slide => {
            const link = slide.querySelector('a.btn-solution[href]');
            const pid = link ? productIdFromHref(link.getAttribute('href')) : null;
            if (!pid) return;
            const p = products[pid];
            if (!p) return;

            const kitNameEl = slide.querySelector('.solution-kit-box span:last-child');
            if (kitNameEl && p.name) kitNameEl.textContent = p.name;
        });
    }

    // Expose helpers
    window.PrincePawAdmin = {
        loadConfig,
        saveConfig,
        renderAdmin,
        applyConfigToShopAndProducts,
        applyConfigToHome
    };

    function init() {
        // If admin container exists, render admin UI
        if (document.getElementById('adminProducts')) {
            renderAdmin();
            return;
        }

        // Otherwise apply config to public pages
        applyConfigToShopAndProducts();
        applyConfigToHome();
    }

    // Run even if this script is loaded after DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

