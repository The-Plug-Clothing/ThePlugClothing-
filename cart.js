// cart.js - handles Add to Cart and cart count across all pages

// Grab cart from localStorage or start fresh
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in navbar
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;
  let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalItems;
}

// Add product to cart
function addToCart(product, price) {
  price = parseFloat(price);
  const existingItem = cart.find(item => item.product === product);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ product, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product} added to cart ✅`);
}

// Attach event listeners to Add to Cart buttons
function attachCartEvents() {
  document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", () => {
      const product = button.dataset.product;
      const price = button.dataset.price;
      addToCart(product, price);
    });
  });
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  attachCartEvents();
});
