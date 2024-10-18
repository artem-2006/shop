export function addBasket() {
	let cart = [];
	const cartItemsContainer = document.getElementById("cartItems");
	const cartTotal = document.getElementById("cartTotal");
	let total = 0;

	document.querySelectorAll(".preview-card-bnt").forEach((btn, index) => {
		btn.addEventListener("click", () => {
			const card = btn.closest(".row").querySelector(".main-image");
			const title = btn.closest(".col-12.col-lg-6").querySelector(".preview-card-title").textContent;
			const price = parseFloat(
				btn.closest(".col-12.col-lg-6").querySelector(".preview-card-price").textContent.replace("$", "")
			);
			const imgSrc = card.src;

			addToCart(title, price, imgSrc);
		});
	});

	function addToCart(title, price, imgSrc) {
		total += price;
		cartTotal.textContent = `$${total.toFixed(2)}`;

		const cartItem = document.createElement("li");
		cartItem.classList.add("cart-item");

		cartItem.innerHTML = `
        <div class="cart-item-info">
            <img src="${imgSrc}" alt="${title}" class="cart-item-img">
            <div>
                <p class="cart-item-title">${title}</p>
                <p>$${price.toFixed(2)}</p>
            </div>
        </div>
        <div class="cart-item-quantity">
            <button class="btn btn-sm minus-btn">-</button>
            <span>1</span>
            <button class="btn btn-sm plus-btn">+</button>
        </div>
    `;

		cartItemsContainer.appendChild(cartItem);

		cartItem.querySelector(".minus-btn").addEventListener("click", () => {
			const quantityElement = cartItem.querySelector(".cart-item-quantity span");
			let quantity = parseInt(quantityElement.textContent);
			if (quantity > 1) {
				quantity--;
				quantityElement.textContent = quantity;
				total -= price;
			} else {
				cartItem.remove();
				total -= price;
			}
			cartTotal.textContent = `$${total.toFixed(2)}`;
		});

		cartItem.querySelector(".plus-btn").addEventListener("click", () => {
			const quantityElement = cartItem.querySelector(".cart-item-quantity span");
			let quantity = parseInt(quantityElement.textContent);
			quantity++;
			quantityElement.textContent = quantity;
			total += price;
			cartTotal.textContent = `$${total.toFixed(2)}`;
		});
	}
}
