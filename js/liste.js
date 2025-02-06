const queryString = document.location.search;
const URLparams = new URLSearchParams(queryString);
const category = URLparams.get('category');
console.log(category);
const productList = document.querySelector('.produktliste');
const showMoreButton = document.getElementById('show-more');

let allProducts = []; // Store all products fetched from the API
let visibleProducts = 12; // Number of products to show initially
const productsPerPage = 12; // Number of products to load each time "Show More" is clicked

// Fetch products from the API
fetch('https://kea-alt-del.dk/t7/api/products?limit=100&category=' + category)
    .then(response => response.json())
    .then(products => {
        allProducts = products; // Store all products
        displayProducts(allProducts.slice(0, visibleProducts)); // Display initial set of products
        toggleShowMoreButton(); // Show or hide the "Show More" button based on remaining products
    });

// Function to display products
function displayProducts(products) {
    const markup = products.map((product) =>
        ` <div class="produktkort">
            <a href="produkt.html?id=${product.id}" class="${product.soldout && 'grayscale'}"><img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt=""></a>

            <a href="produkt.html?id=${product.id}" class="npt">${product.productdisplayname}</a>
            <a href="produkt.html?id=${product.id}" class="cat">${product.category}</a>
            <a href="produkt.html?id=${product.id}" class="nowdkk">DKK ${product.price},-</a>
            <a href="produkt.html?id=${product.id}" class="prevdkk ${product.discount}">DKK ${Math.round(product.price / (100 - product.discount) * 100)},-</a>
            <a href="produkt.html?id=${product.id}" class="readmore">read more</a>

            <div class="rabat ${product.discount}">
                <a href="produkt.html?id=${product.id}">${product.discount}%</a>
            </div>
            <div class="soldout ${!product.soldout && 'null'}">
                <a href="produkt.html?id=${product.id}">Sold Out</a>
            </div>
        </div> `
    ).join("");
    productList.innerHTML = markup;
}

// Function to filter products
function filterProducts() {
    const genderFilter = document.getElementById('gender').value;
    const priceFilter = document.getElementById('price').value;

    const filteredProducts = allProducts.filter(product => {
        const matchesGender = genderFilter === 'all' || product.gender === genderFilter;
        const matchesPrice = product.price <= priceFilter;
        return matchesGender && matchesPrice;
    });

    visibleProducts = productsPerPage; // Reset visible products when filtering
    displayProducts(filteredProducts.slice(0, visibleProducts)); // Display filtered products
    toggleShowMoreButton(); // Update the "Show More" button
}

// Function to handle "Show More" button click
function showMoreProducts() {
    visibleProducts += productsPerPage; // Increase the number of visible products
    const genderFilter = document.getElementById('gender').value;
    const priceFilter = document.getElementById('price').value;

    const filteredProducts = allProducts.filter(product => {
        const matchesGender = genderFilter === 'all' || product.gender === genderFilter;
        const matchesPrice = product.price <= priceFilter;
        return matchesGender && matchesPrice;
    });

    displayProducts(filteredProducts.slice(0, visibleProducts)); // Display more products
    toggleShowMoreButton(); // Update the "Show More" button
}

// Function to toggle the "Show More" button visibility
function toggleShowMoreButton() {
    const genderFilter = document.getElementById('gender').value;
    const priceFilter = document.getElementById('price').value;

    const filteredProducts = allProducts.filter(product => {
        const matchesGender = genderFilter === 'all' || product.gender === genderFilter;
        const matchesPrice = product.price <= priceFilter;
        return matchesGender && matchesPrice;
    });

    if (visibleProducts >= filteredProducts.length) {
        showMoreButton.style.display = 'none'; // Hide the button if all products are visible
    } else {
        showMoreButton.style.display = 'block'; // Show the button if there are more products to load
    }
}

// Add event listeners to filter controls
document.getElementById('gender').addEventListener('change', filterProducts);
document.getElementById('price').addEventListener('input', function () {
    document.getElementById('price-value').textContent = this.value + ' DKK';
    filterProducts();
});

// Add event listener to "Show More" button
showMoreButton.addEventListener('click', showMoreProducts);