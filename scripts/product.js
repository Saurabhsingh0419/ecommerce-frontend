const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const productDetailDiv = document.getElementById("productDetail");
const errorDiv = document.getElementById("error");

let selectedSize = "M";
let quantity = 1;
let productPrice = 0;

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.querySelector(".cart-badge");
  if (badge) badge.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updatePriceDisplay() {
  const priceEl = document.getElementById("livePrice");
  if (priceEl) priceEl.innerText = `$${(productPrice * quantity).toFixed(2)}`;
}

function renderProduct(product) {
  productPrice = product.price;

  productDetailDiv.innerHTML = `
    <div class="detail-card">
      <div class="zoom-container">
        <img src="${product.image}" alt="${product.title}" class="zoom-image">
      </div>
      <div class="detail-info">
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p><strong>Size:</strong></p>
        <div class="size-options">
          <button class="size-btn active" data-size="S">S</button>
          <button class="size-btn" data-size="M">M</button>
          <button class="size-btn" data-size="L">L</button>
        </div>

        <p class="price">Price: <span id="livePrice">$${product.price}</span></p>

        <div class="quantity-selector">
          <button id="decreaseQty">−</button>
          <span id="qtyValue">1</span>
          <button id="increaseQty">+</button>
        </div>

        <button class="add-to-cart" id="addToCartBtn">Add to Cart</button>
        <p id="cartMsg" class="success-msg" style="display:none;">✔ Added to Cart</p>
      </div>
    </div>
  `;

  // Quantity selector
  document.getElementById("increaseQty").onclick = () => {
    if (quantity < 10) quantity++;
    document.getElementById("qtyValue").innerText = quantity;
    updatePriceDisplay();
  };
  document.getElementById("decreaseQty").onclick = () => {
    if (quantity > 1) quantity--;
    document.getElementById("qtyValue").innerText = quantity;
    updatePriceDisplay();
  };

  // Size selection
  document.querySelectorAll(".size-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = btn.dataset.size;
    });
  });

  // Add to cart
  document.getElementById("addToCartBtn").onclick = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.id === product.id && item.size === selectedSize);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: productPrice,
        quantity: quantity,
        size: selectedSize,
        image: product.image
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cartMsg").style.display = "block";
    updateCartCount();
  };
}

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => res.json())
  .then(product => renderProduct(product))
  .catch(err => {
    productDetailDiv.style.display = "none";
    errorDiv.style.display = "block";
  });

updateCartCount();



