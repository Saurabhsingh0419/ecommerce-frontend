console.log("E-Commerce Website Loaded");

// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Cart badge update function
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let badge = document.querySelector(".cart-badge");
  if (badge) {
    badge.innerText = cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// Product grid fetch & render
const productGrid = document.querySelector(".product-grid");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

fetch("https://fakestoreapi.com/products?limit=8")
  .then(res => res.json())
  .then(data => {
    loading.style.display = "none";
    data.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <a href="product.html?id=${product.id}">
          <img 
            src="${product.image}" 
            alt="${product.title}" 
            loading="lazy"
            srcset="${product.image} 480w, ${product.image} 768w, ${product.image} 1200w"
            sizes="(max-width: 600px) 480px, (max-width: 960px) 768px, 1200px">
        </a>
        <h3>${product.title}</h3>
        <p class="price">$${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;
      productGrid.appendChild(productCard);

      // Add to Cart button functionality
      const addToCartBtn = productCard.querySelector(".add-to-cart");
      addToCartBtn.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if product already exists
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
          });
        }

        // Save and update badge
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        // Feedback message
        addToCartBtn.innerText = "Added!";
        setTimeout(() => {
          addToCartBtn.innerText = "Add to Cart";
        }, 1500);
      });
    });
  })
  .catch(err => {
    console.log("API Error:", err);
    loading.style.display = "none";
    errorDiv.style.display = "block";
  });

// Initial badge count
updateCartCount();


