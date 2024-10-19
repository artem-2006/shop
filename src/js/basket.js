export function addBasket() {
	let cart = [];
	const cartItemsContainer = document.getElementById("cartItems");
	const cartTotal = document.getElementById("cartTotal");
	const cartCountElement = document.querySelector(".bnt-cart-count");
	const cartCountMobileElement = document.querySelector(".bnt-cart-count-mobile");
	const emptyCartImage = document.getElementById("emptyCartImage");
	let total = 0;
	let itemCount = 0;

	function updateCartState() {
		if (itemCount === 0) {
			emptyCartImage.style.display = "block";
			cartItemsContainer.style.display = "none";
			cartCountElement.classList.remove("show");
			cartCountMobileElement.classList.remove("show");
		} else {
			emptyCartImage.style.display = "none";
			cartItemsContainer.style.display = "block";
			cartCountElement.classList.add("show");
			cartCountMobileElement.classList.add("show");
		}
		cartCountElement.textContent = itemCount;
		cartCountMobileElement.textContent = itemCount;
	}

	updateCartState();

	document.querySelectorAll(".preview-card-bnt").forEach((btn) => {
		const card = btn.closest(".col-12.col-lg-6");

		btn.addEventListener("click", () => {
			const title = card.querySelector(".preview-card-title").textContent;
			const price = parseFloat(card.querySelector(".preview-card-price").textContent.replace("$", ""));
			const imgSrc = card.closest(".row").querySelector(".first-img-glasses").src;
			const quantityElement = card.querySelector(".quantity-value");
			const quantity = parseInt(quantityElement.textContent);

			addToCart(title, price, imgSrc, quantity);
		});
	});

	function addToCart(title, price, imgSrc, quantity) {
		const existingItemIndex = cart.findIndex((item) => item.title === title);
		if (existingItemIndex !== -1) {
			cart[existingItemIndex].quantity += quantity;
			total += price * quantity;
		} else {
			cart.push({ title, price, imgSrc, quantity });
			total += price * quantity;
		}

		itemCount += quantity;
		cartTotal.textContent = `$${total.toFixed(2)}`;
		updateCartState();

		renderCartItems();
	}

	function renderCartItems() {
		cartItemsContainer.innerHTML = "";
		cart.forEach((item) => {
			const cartItem = document.createElement("li");
			cartItem.classList.add("cart-item");

			cartItem.innerHTML = `
				<div class="cart-item-info">
					<img src="${item.imgSrc}" alt="${item.title}" class="cart-item-img">
					<div>
						<p class="cart-item-title">${item.title}</p>
						<p>$${item.price.toFixed(2)} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
					</div>
				</div>
				<div class="cart-item-quantity">
					<button class="btn btn-sm minus-btn">-</button>
					<span>${item.quantity}</span>
					<button class="btn btn-sm plus-btn">+</button>
				</div>
			`;

			cartItemsContainer.appendChild(cartItem);

			cartItem.querySelector(".minus-btn").addEventListener("click", () => {
				const itemQuantity = cartItem.querySelector(".cart-item-quantity span");
				let quantity = parseInt(itemQuantity.textContent);
				if (quantity > 1) {
					quantity--;
					itemQuantity.textContent = quantity;
					total -= item.price;
					itemCount--;
				} else {
					cart.splice(cart.indexOf(item), 1);
					cartItem.remove();
					total -= item.price;
					itemCount--;
				}
				cartTotal.textContent = `$${total.toFixed(2)}`;
				updateCartState();
			});

			cartItem.querySelector(".plus-btn").addEventListener("click", () => {
				const itemQuantity = cartItem.querySelector(".cart-item-quantity span");
				let quantity = parseInt(itemQuantity.textContent);
				quantity++;
				itemQuantity.textContent = quantity;
				total += item.price;
				itemCount++;
				cartTotal.textContent = `$${total.toFixed(2)}`;
				updateCartState();
			});
		});
	}

	document.querySelector(".btn-basket").addEventListener("click", () => {
		if (itemCount > 0) {
			const orderTotalAmount = document.getElementById("orderTotalAmount");
			orderTotalAmount.textContent = `$${total.toFixed(2)}`;
			const orderConfirmationModal = new bootstrap.Modal(document.getElementById("orderConfirmationModal"));
			orderConfirmationModal.show();

			clearCart();
		} else {
			alert("Your cart is empty!");
		}
	});

	function clearCart() {
		cartItemsContainer.innerHTML = "";
		cart = [];
		total = 0;
		itemCount = 0;
		cartTotal.textContent = `$0.00`;
		updateCartState();
	}
}
