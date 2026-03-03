// Prince Paw - Wishlist Logic
const WISHLIST_KEY = 'princepaw_wishlist';

function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveWishlist(items) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

function addToWishlist(product) {
    var list = getWishlist();
    var idx = list.findIndex(function(item) { return item.id === product.id; });
    if (idx >= 0) {
        list.splice(idx, 1);
    } else {
        list.push(product);
    }
    saveWishlist(list);
}

function removeFromWishlist(id) {
    var list = getWishlist().filter(function(item) { return item.id !== id; });
    saveWishlist(list);
}

function isInWishlist(id) {
    return getWishlist().some(function(item) { return item.id === id; });
}
