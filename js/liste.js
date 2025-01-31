const productList = document.querySelector('.produktliste');

fetch('https://kea-alt-del.dk/t7/api/products')
    .then((response) => response.json())
    .then((data) => showList(data));

function showList(products) {
    console.log(products);
    let markup = "";
    products.map(product => {
        markup +=
            ` <div class="produktkort">
            <a href="produkt.html" class="${product.soldout === 1 ? 'grayscale' : ''}"><img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt=""></a>

            <a href="produkt.html" class="npt">${product.productdisplayname}</a>
            <a href="produkt.html" class="cat">${product.category}</a>
            <a href="produkt.html" class="nowdkk">DKK ${product.price},-</a>
            <a href="produkt.html" class="prevdkk ${product.discount}">DKK ${Math.round(product.price / (100 - product.discount) * 100)},-</a>
            <a href="produkt.html" class="readmore">read more</a>

            <div class="rabat ${product.discount}">
                <a href="produkt.html">${product.discount}%</a>
            </div>
            <div class="soldout ${product.soldout === 1 ? '' : 'null'}">
                <a href="produkt.html">Sold Out</a>
            </div>
        </div> `
    }).join("");
    console.log(markup);
    productList.innerHTML = markup;
}