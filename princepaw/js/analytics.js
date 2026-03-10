// Prince Paw - Simple On-Site Analytics (local to this browser)
// Tracks page views, product views, and orders using localStorage.
// This is for demo purposes only and is NOT a full production analytics system.

(function () {
    const ANALYTICS_KEY = 'princepaw_analytics_v1';

    function loadAnalytics() {
        try {
            const raw = localStorage.getItem(ANALYTICS_KEY);
            if (!raw) {
                return {
                    views: { siteTotal: 0, pages: {}, products: {} },
                    orders: [],
                    customers: {}
                };
            }
            const parsed = JSON.parse(raw);
            parsed.views = parsed.views || { siteTotal: 0, pages: {}, products: {} };
            parsed.orders = parsed.orders || [];
            parsed.customers = parsed.customers || {};
            return parsed;
        } catch {
            return {
                views: { siteTotal: 0, pages: {}, products: {} },
                orders: [],
                customers: {}
            };
        }
    }

    function saveAnalytics(data) {
        localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
    }

    function trackPageView(pageKey) {
        const data = loadAnalytics();
        data.views.siteTotal += 1;
        data.views.pages[pageKey] = (data.views.pages[pageKey] || 0) + 1;
        saveAnalytics(data);
    }

    function trackProductView(productId) {
        const data = loadAnalytics();
        data.views.siteTotal += 1;
        data.views.products[productId] = (data.views.products[productId] || 0) + 1;
        data.views.pages['product:' + productId] = (data.views.pages['product:' + productId] || 0) + 1;
        saveAnalytics(data);
    }

    // order = { id, dateISO, items:[{id,name,qty,price}], total, customer:{name,email,phone} }
    function recordOrder(order) {
        const data = loadAnalytics();
        data.orders.push(order);

        if (order.customer && order.customer.email) {
            const key = order.customer.email.toLowerCase();
            const existing = data.customers[key] || {
                name: order.customer.name || '',
                email: order.customer.email,
                phone: order.customer.phone || '',
                totalSpent: 0,
                orderCount: 0,
                lastOrderDate: null
            };
            existing.totalSpent += order.total || 0;
            existing.orderCount += 1;
            existing.lastOrderDate = order.dateISO;
            existing.name = order.customer.name || existing.name;
            existing.phone = order.customer.phone || existing.phone;
            data.customers[key] = existing;
        }

        saveAnalytics(data);
    }

    // Helpers for admin pages
    function getSummary() {
        return loadAnalytics();
    }

    window.PrincePawAnalytics = {
        trackPageView,
        trackProductView,
        recordOrder,
        getSummary
    };
})();

