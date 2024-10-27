import { productsData } from "./productsData.js";

function preloadImages() {
	for (const productKey in productsData) {
		if (productsData.hasOwnProperty(productKey)) {
			const product = productsData[productKey];

			const mainImage = new Image();
			mainImage.src = product.mainImg;

			product.thumbnails.forEach((thumbnail) => {
				const thumbImage = new Image();
				thumbImage.src = thumbnail;
			});
		}
	}
}

function updateQuantity(value) {
	const quantityValueElement = document.querySelector(".quantity-value-modal");
	let quantity = parseInt(quantityValueElement.textContent);
	quantity += value;
	if (quantity < 1) quantity = 1;
	quantityValueElement.textContent = quantity;
}

function initializeProductCards() {
	document.querySelectorAll(".related-products .col-6").forEach((card) => {
		card.addEventListener("click", function () {
			const productTitle = card.querySelector("h3").textContent;
			const productData = productsData[productTitle];

			if (productData) {
				document.getElementById("productTitle").textContent = productData.title;
				document.getElementById("productPrice").textContent = productData.price;
				document.querySelector(".main-product-image").src = productData.mainImg;
				document.getElementById("productDescription").textContent = productData.description;

				const galleryPreviewElements = document.querySelectorAll(".gallery-item img");
				productData.thumbnails.forEach((thumb, index) => {
					if (galleryPreviewElements[index]) {
						galleryPreviewElements[index].src = thumb;
					}
				});
			}

			document.querySelector(".quantity-value-modal").textContent = "1";
			new bootstrap.Modal(document.getElementById("productModal")).show();
		});
	});
}

function initializeQuantityButtons() {
	document.querySelector(".minus-btn-modal").addEventListener("click", function () {
		updateQuantity(-1);
	});

	document.querySelector(".plus-btn-modal").addEventListener("click", function () {
		updateQuantity(1);
	});
}

function init() {
	preloadImages();
	initializeProductCards();
	initializeQuantityButtons();
}

init();
