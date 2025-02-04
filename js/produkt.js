const queryString = document.location.search;
const URLparams = new URLSearchParams(queryString);
const identity = URLparams.get('id');
console.log(identity);
const produktgrid = document.querySelector(".produktgrid");

fetch(`https://kea-alt-del.dk/t7/api/products/${identity}`)
    .then(response => response.json())
    .then(product => {
        produktgrid.innerHTML = `
        <div class="produktbillede">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${identity}.webp" class="${product.soldout && 'grayscale'}" alt="">
                <div class="rabat ${product.discount}">
                <a href="produkt.html?id=${product.id}">${product.discount}%</a>
            </div>
            <div class="soldout ${!product.soldout && 'null'}">
                <a href="produkt.html?id=${product.id}">Sold Out</a>
            </div>
            </div>
            <div class="produktinfo">
                <p class="pi">Product Information</p>
                <p class="mn">Model Name</p>
                <p class="nm">${product.productdisplayname}</p>
                <p class="cl">Color</p>
                <p class="co">${product.basecolour}</p>
                <p class="in">Inventory number</p>
                <p class="nu">${product.id}</p>
                <p class="br">${product.brandname}</p>
                <p class="ta">${product.brandbio}</p>
            </div>
            <div>
                <p class="name">${product.productdisplayname}</p>
                <p class="brand">${product.brandname} | ${product.articletype}</p>
                <p class="mn">Price</p>
                <p class="nm">DKK ${product.price},-</p>
                <p class="prevdkk ${product.discount}">DKK ${Math.round(product.price / (100 - product.discount) * 100)},-</p>
                
                <div class="sizes">
                    <p class="choose">Choose a size:</p>
                    <select name="Size" id="cars">
                        <optgroup label="Size">
                              <option value="volvo">S</option>
                              <option value="saab">M</option>
                             <option value="mercedes">L</option>
                              <option value="audi">XL</option>
                         </optgroup>
                    </select>
                </div>
                <p class="addto">Add To Basket</p>
            </div>
        `;
    })