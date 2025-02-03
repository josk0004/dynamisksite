const queryString = document.location.search;
const URLparams = new URLSearchParams(queryString);
const category = URLparams.get('category');
console.log(category);
const productList = document.querySelector('.produktliste');

fetch('https://kea-alt-del.dk/t7/api/products?limit=100&category=' + category)
    .then((response) => response.json())
    .then((data) => showList(data));

function showList(products) {
    console.log(products);
    const markup = products.map((product) =>
        ` <div class="produktkort">
            <a href="produkt.html?id=${product.id}" class="${product.soldout === 1 ? 'grayscale' : ''}"><img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt=""></a>

            <a href="produkt.html?id=${product.id}" class="npt">${product.productdisplayname}</a>
            <a href="produkt.html?id=${product.id}" class="cat">${product.category}</a>
            <a href="produkt.html?id=${product.id}" class="nowdkk">DKK ${product.price},-</a>
            <a href="produkt.html?id=${product.id}" class="prevdkk ${product.discount}">DKK ${Math.round(product.price / (100 - product.discount) * 100)},-</a>
            <a href="produkt.html?id=${product.id}" class="readmore">read more</a>

            <div class="rabat ${product.discount}">
                <a href="produkt.html?id=${product.id}">${product.discount}%</a>
            </div>
            <div class="soldout ${product.soldout === 1 ? '' : 'null'}">
                <a href="produkt.html?id=${product.id}">Sold Out</a>
            </div>
        </div> `
    ).join("");
    // console.log(markup);
    productList.innerHTML = markup;
}