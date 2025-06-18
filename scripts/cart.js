const cartItemsDiv = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (badge) badge.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Render cart items
function renderCart() {
  cartItemsDiv.innerHTML = "";
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    checkoutBtn.disabled = true;
    totalPriceEl.innerText = "Total: $0.00";
    return;
  }

  checkoutBtn.disabled = false;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div>
        <h3>${item.title}</h3>
        <p>Size: ${item.size}</p>
        <p>Price: $${item.price}</p>
        <div class="quantity-selector">
          <button class="decrease" data-index="${index}">−</button>
          <span>${item.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
        <button class="remove" data-index="${index}">Remove</button>
      </div>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  updateTotal();
  updateCartBadge();
}

function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceEl.innerText = `Total: $${total.toFixed(2)}`;
}

// Quantity increase
cartItemsDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("increase")) {
    const index = e.target.dataset.index;
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

// Quantity decrease
cartItemsDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("decrease")) {
    const index = e.target.dataset.index;
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  }
});

// Remove item
cartItemsDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

renderCart();
updateCartBadge();
