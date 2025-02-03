const queryString = document.location.search;
const URLparams = new URLSearchParams(queryString);
const identity = URLparams.get('id');
console.log(identity);
const produktgrid = document.querySelector(".produktgrid");

fetch(`https://kea-alt-del.dk/t7/api/products/${identity}`)
    .then(response => response.json())
    .then(data => {
        produktgrid.innerHTML = `
        <div class="produktbillede">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${identity}.webp" class="${data.soldout === 1 ? 'grayscale' : ''}" alt="">
            </div>
            <div class="produktinfo">
                <p class="pi">Product Information</p>
                <p class="mn">Model Name</p>
                <p class="nm">${data.productdisplayname}</p>
                <p class="cl">Color</p>
                <p class="co">${data.basecolour}</p>
                <p class="in">Inventory number</p>
                <p class="nu">${data.id}</p>
                <p class="br">${data.brandname}</p>
                <p class="ta">${data.brandbio}</p>
            </div>
            <div>
                <p class="name">${data.productdisplayname}</p>
                <p class="brand">${data.brandname} | ${data.articletype}</p>
                <p class="mn">Price</p>
                <p class="nm">DKK ${data.price},-</p>
                <p class="prevdkk ${data.discount}">DKK ${Math.round(data.price / (100 - data.discount) * 100)},-</p>
                
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