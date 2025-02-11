// 获取产品数据
async function fetchProductsData() {
    const response = await fetch('../assets/data/products.json');
    const data = await response.json();
    return data;
}

let currentImageIndex = 0;
let productImages = [];

async function initializeProductDetail() {
    try {
        // 从 URL 获取产品信息
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        const category = params.get('category');
        const model = params.get('model');

        // 获取产品数据
        const productsData = await fetchProductsData();
        const product = productsData[category][model].find(p => p.id === productId);

        if (product) {
            // 设置产品信息
            document.getElementById('productName').textContent = product.name;
            document.getElementById('productId').textContent = `产品编号: ${product.id}`;
            
            // 设置产品规格
            document.getElementById('productSpecs').innerHTML = `<p>${product.specs}</p>`;

            // 设置图片
            productImages = product.img; // 直接使用 img 数组
            updateMainImage();
            createThumbnails();
        } else {
            console.error('Product not found');
        }
    } catch (error) {
        console.error('Error loading product details:', error);
    }
}

function updateMainImage() {
    const mainImage = document.getElementById('currentImage');
    if (productImages && productImages.length > 0) {
        mainImage.src = productImages[currentImageIndex];
        mainImage.alt = "Product Image " + (currentImageIndex + 1);
    }
}

function createThumbnails() {
    const thumbnailList = document.querySelector('.thumbnail-list');
    thumbnailList.innerHTML = ''; // 清空现有的缩略图

    productImages.forEach((img, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img;
        thumbnail.alt = "Thumbnail " + (index + 1);
        thumbnail.onclick = () => {
            currentImageIndex = index;
            updateMainImage();
            updateThumbnailSelection();
        };
        thumbnailList.appendChild(thumbnail);
    });
    updateThumbnailSelection();
}

function updateThumbnailSelection() {
    const thumbnails = document.querySelectorAll('.thumbnail-list img');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// 图片导航按钮事件处理
document.querySelector('.prev').onclick = () => {
    if (productImages.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
        updateMainImage();
        updateThumbnailSelection();
    }
};

document.querySelector('.next').onclick = () => {
    if (productImages.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % productImages.length;
        updateMainImage();
        updateThumbnailSelection();
    }
};

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initializeProductDetail); 