const categoryList = document.querySelector('.category-list');

fetch('https://kea-alt-del.dk/t7/api/categories')
    .then((response) => response.json())
    .then((data) => showCategories(data));

function showCategories(categories) {
    console.log(categories);
    const markup = categories.map((category) =>
        ` <a href="produktliste.html?category=${category.category}" class="category">${category.category}</a> `
    ).join("");
    // console.log(markup);
    categoryList.innerHTML = markup;
}