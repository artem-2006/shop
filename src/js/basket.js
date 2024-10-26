export function addBasket() {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	const cartItemsContainer = document.getElementById("cartItems");
	const cartTotal = document.getElementById("cartTotal");
	const cartCountElement = document.querySelector(".bnt-cart-count");
	const cartCountMobileElement = document.querySelector(".bnt-cart-count-mobile");
	const emptyCartImage = document.getElementById("emptyCartImage");
	const cartItemCount = document.getElementById("cartItemCount");
	let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	let itemCount = cart.reduce((count, item) => count + item.quantity, 0);

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
		cartItemCount.textContent = itemCount;
		cartTotal.textContent = `$${total.toFixed(2)}`;
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	updateCartState();
	renderCartItems();

	document.querySelectorAll(".btnAdd").forEach((btn) => {
		btn.addEventListener("click", () => {
			let title, price, imgSrc, quantity;
			const card = btn.closest(".col-12.col-lg-6");

			if (card) {
				title = card.querySelector(".preview-card-title").textContent;
				price = parseFloat(card.querySelector(".preview-card-price").textContent.replace("$", ""));
				imgSrc = card.closest(".row").querySelector(".first-img-glasses").src;
				quantity = parseInt(card.querySelector(".quantity-value").textContent);
			} else {
				title = document.querySelector(".product-title").textContent;
				price = parseFloat(document.querySelector(".product-price").textContent.replace("$", ""));
				imgSrc = document.querySelector(".first-img-glasses-modal").src;
				quantity = parseInt(document.querySelector(".quantity-value-modal").textContent);
				const productModal = bootstrap.Modal.getInstance(document.getElementById("productModal"));
				const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));

				addToCart(title, price, imgSrc, quantity);

				if (productModal) {
					productModal.hide();
					cartModal.show();
				}
				return;
			}
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
		updateCartState();
		renderCartItems();
	}

	function renderCartItems() {
		cartItemsContainer.innerHTML = "";
		cart.forEach((item) => {
			const cartItem = document.createElement("li");
			cartItem.classList.add("cart-item");
			cartItem.style.position = "relative";

			cartItem.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.imgSrc}" alt="${item.title}" class="cart-item-img">
                    <div>
                        <p class="cart-item-title">${item.title}</p>
                        <p class="item-price" data-price="${item.price}">$${item.price.toFixed(2)} x ${
				item.quantity
			} = $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-item-quantity">
                    <button class="btn btn-sm minus-btn">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn btn-sm plus-btn">+</button>
                </div>
                <button class="btn-remove" aria-label="Remove item">&times;</button>
            `;

			cartItemsContainer.appendChild(cartItem);

			cartItem.querySelector(".minus-btn").addEventListener("click", () => {
				let itemQuantity = cartItem.querySelector(".cart-item-quantity span");
				let quantity = parseInt(itemQuantity.textContent);
				if (quantity > 1) {
					quantity--;
					itemQuantity.textContent = quantity;
					cart.find((i) => i.title === item.title).quantity = quantity;
					total -= item.price;
					itemCount--;
				} else {
					cart.splice(cart.indexOf(item), 1);
					cartItem.remove();
					total -= item.price;
					itemCount--;
				}
				cartItem.querySelector(".item-price").textContent = `$${item.price.toFixed(2)} x ${quantity} = $${(
					item.price * quantity
				).toFixed(2)}`;
				updateCartState();
			});

			cartItem.querySelector(".plus-btn").addEventListener("click", () => {
				let itemQuantity = cartItem.querySelector(".cart-item-quantity span");
				let quantity = parseInt(itemQuantity.textContent);
				quantity++;
				itemQuantity.textContent = quantity;
				cart.find((i) => i.title === item.title).quantity = quantity;
				total += item.price;
				itemCount++;
				cartItem.querySelector(".item-price").textContent = `$${item.price.toFixed(2)} x ${quantity} = $${(
					item.price * quantity
				).toFixed(2)}`;
				updateCartState();
			});

			const removeButton = cartItem.querySelector(".btn-remove");
			removeButton.addEventListener("click", () => {
				cart = cart.filter((i) => i.title !== item.title);
				cartItem.remove();
				total -= item.price * item.quantity;
				itemCount -= item.quantity;
				updateCartState();
			});
		});
	}

	document.querySelector(".btn-basket").addEventListener("click", () => {
		if (itemCount > 0) {
			const deliveryModal = new bootstrap.Modal(document.getElementById("deliveryModal"));
			deliveryModal.show();
		}
	});

	document.getElementById("submitOrder").disabled = true;

	function checkFormCompletion() {
		const fullName = document.getElementById("fullName").value;
		const phone = document.getElementById("phone").value;
		const email = document.getElementById("email").value;
		const address = document.getElementById("address").value;
		const isFormComplete = fullName && phone && email && address;
		document.getElementById("submitOrder").disabled = !isFormComplete;
	}

	document.getElementById("fullName").addEventListener("input", checkFormCompletion);
	document.getElementById("phone").addEventListener("input", checkFormCompletion);
	document.getElementById("email").addEventListener("input", checkFormCompletion);
	document.getElementById("address").addEventListener("input", checkFormCompletion);

	document.getElementById("submitOrder").addEventListener("click", () => {
		const fullName = document.getElementById("fullName").value;
		const phone = document.getElementById("phone").value;
		const email = document.getElementById("email").value;
		const address = document.getElementById("address").value;

		const finalTotal = total;

		const message = `
        New Order:
        - Full Name: ${fullName}
        - Phone Number: ${phone}
        - Email: ${email}
        - Delivery Address: ${address}
        - Items: ${cart.map((item) => `${item.title} (x${item.quantity})`).join(", ")}
        - Total Amount: $${finalTotal.toFixed(2)}
    `;

		sendToTelegram(message).then(() => {
			cart = [];
			itemCount = 0;
			total = 0;
			cartTotal.textContent = `$0.00`;
			updateCartState();

			const deliveryModal = bootstrap.Modal.getInstance(document.getElementById("deliveryModal"));
			if (deliveryModal) deliveryModal.hide();

			const cartModal = bootstrap.Modal.getInstance(document.getElementById("cartModal"));
			if (cartModal) cartModal.hide();

			const confirmationTotal = document.getElementById("orderTotalAmount");
			if (confirmationTotal) {
				confirmationTotal.textContent = `$${finalTotal.toFixed(2)}`;
			}

			const orderConfirmationModal = new bootstrap.Modal(document.getElementById("orderConfirmationModal"));
			orderConfirmationModal.show();
		});
	});

	function sendToTelegram(message) {
		const botToken = "7466851466:AAGS09Q3xbNWezYrSfKtuTsx_HFxkQAX0B0";
		const chatId = "1451788163";
		const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

		return fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				chat_id: chatId,
				text: message,
			}),
		});
	}
}
