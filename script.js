const products = [
  {
    id: 1,
    name: "CSS",
    price: 200,
    image: "css.png",
    description: "Description of Product1",
  },
  {
    id: 2,
    name: "HTML",
    price: 150,
    image: "html.png",
    description: "Description of Product2",
  },
  {
    id: 3,
    name: "HTMLCSSJS",
    price: 350,
    image: "htmlcssjs.png",
    description: "Description of Product3",
  },
  {
    id: 4,
    name: "JSON",
    price: 250,
    image: "json.png",
    description: "Description of Product4 ",
  },
  {
    id: 5,
    name: "Salesforce",
    price: 530,
    image: "salesforce.png",
    description: "Description of Product5 ",
  },
  {
    id: 6,
    name: "Tableau",
    price: 935,
    image: "tableau.png",
    description: "Description of Product6 ",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productContainer = document.getElementById("product-container");
const sortPrice = document.getElementById("sort-price");
const searchBar = document.getElementById("search-bar");
const cartButton = document.getElementById("cart-button");

// Function to display products
function displayProducts(productList) {
  productContainer.innerHTML = ""; // Clear the container
  productList.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="images/${product.image}" alt="${product.name}">
      <div class="product-info">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    productContainer.appendChild(productCard);
  });
}

// Function to update the cart count
function updateCartCount() {
  cartButton.textContent = `Cart (${cart.length})`;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Initial product display
displayProducts(products);
updateCartCount();

// Event Listener: Sorting
sortPrice.addEventListener("change", (event) => {
  const sortType = event.target.value;
  const sortedProducts = [...products].sort((a, b) => {
    return sortType === "low-to-high" ? a.price - b.price : b.price - a.price;
  });
  displayProducts(sortedProducts);
});

// Event Listener: Search
searchBar.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );
  displayProducts(filteredProducts);
});

// Event Listener: Add to Cart
productContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const productId = event.target.getAttribute("data-id");
    const product = products.find((p) => p.id == productId);
    cart.push(product);
    updateCartCount();
    saveCart(); // Save to localStorage
    alert(`${product.name} has been added to the cart.`);
  }
});
