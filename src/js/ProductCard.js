import { products } from "./Data.js";

function updateQuantity(value) {
	const quantityValueElement = document.querySelector(".quantity-value");
	let quantity = parseInt(quantityValueElement.textContent);
	quantity += value;
	if (quantity < 1) quantity = 1;
	quantityValueElement.textContent = quantity;
}

function initializeProductCards() {
	document.querySelectorAll(".related-products .col-6").forEach((card) => {
		card.addEventListener("click", function () {
			const productTitle = card.querySelector("h3").textContent;

			const productData = products[productTitle];
			if (productData) {
				document.getElementById("productTitle").textContent = productData.title;
				document.getElementById("productPrice").textContent = productData.price;
				document.querySelector(".main-product-image").src = productData.mainImg;
				document.getElementById("productDescription").textContent = productData.description;

				const galleryPreviewElements = document.querySelectorAll(".gallery-item .gallery-preview");
				productData.thumbnails.forEach((thumb, index) => {
					if (galleryPreviewElements[index]) {
						galleryPreviewElements[index].src = thumb;
					}
				});
			}

			document.querySelector(".quantity-value").textContent = "1";

			new bootstrap.Modal(document.getElementById("productModal")).show();
		});
	});
}

function initializeQuantityButtons() {
	document.querySelectorAll(".btn-decrement").forEach((btn) => {
		btn.addEventListener("click", function () {
			updateQuantity(-1);
		});
	});

	document.querySelectorAll(".btn-increment").forEach((btn) => {
		btn.addEventListener("click", function () {
			updateQuantity(1);
		});
	});
}

function init() {
	initializeProductCards();
	initializeQuantityButtons();
}

init();
