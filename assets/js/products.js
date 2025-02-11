// Fetch Products Data from JSON File
async function fetchProductsData() {
    const response = await fetch('../assets/data/products.json');
    const data = await response.json();
    return data;
}

// Toggle Submenu Visibility
function toggleSubmenu(header) {
    const submenu = header.nextElementSibling;
    const arrow = header.querySelector('.arrow');
    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
        arrow.textContent = '▼';
    } else {
        submenu.style.display = 'block';
        arrow.textContent = '▲';
    }
}

// Show Products in Product Display Section
async function showProducts(category, model) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    const productsData = await fetchProductsData();
    const filteredProducts = productsData[category][model];

    if (filteredProducts && filteredProducts.length > 0) {
        filteredProducts.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            
            // 使用第一张图片作为展示图片
            const mainImage = product.img[0];
            
            productItem.innerHTML = `
                <a href="product-detail.html?id=${product.id}&category=${category}&model=${model}">
                    <img src="${mainImage}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="product-id">${product.id}</p>
                    <p class="product-specs">${product.specs}</p>
                </a>
            `;
            productGrid.appendChild(productItem);
        });
    } else {
        productGrid.innerHTML = '<p>No products found for the selected category and model.</p>';
    }
}
