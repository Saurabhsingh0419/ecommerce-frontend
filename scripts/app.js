const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

const productGrid = document.querySelector(".product-grid");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let badge = document.querySelector(".cart-badge");
  if (badge) {
    badge.innerText = cart.reduce((total, item) => total + item.quantity, 0);
  }
}

fetch("https://fakestoreapi.com/products?limit=8")
  .then(res => res.json())
  .then(data => {
    loading.style.display = "none";
    data.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.title}" loading="lazy">
        </a>
        <h3>${product.title}</h3>
        <p class="price">$${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;
      productGrid.appendChild(productCard);
    });
  })
  .catch(err => {
    console.log("API Error:", err);
    loading.style.display = "none";
    errorDiv.style.display = "block";
  });

updateCartCount();

