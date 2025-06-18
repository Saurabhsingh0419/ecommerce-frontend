// Navbar toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Product fetch
const productGrid = document.querySelector(".product-grid");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

fetch('https://fakestoreapi.com/products?limit=8')
  .then(res => res.json())
  .then(data => {
    loading.style.display = "none";
    data.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </a>
        <h3>${product.title}</h3>
        <p class="price">$${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });
  })
  .catch(err => {
    loading.style.display = "none";
    errorDiv.style.display = "block";
    console.log("API Error:", err);
  });

// Update cart badge on home
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.querySelector(".cart-badge");
  if (badge) badge.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}
updateCartCount();


