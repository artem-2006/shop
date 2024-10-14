export function counter() {
	document.querySelectorAll(".quantity-selector").forEach((item) => {
		const minusBtn = item.querySelector(".minus-btn");
		const plusBtn = item.querySelector(".plus-btn");
		const quantityValue = item.querySelector(".quantity-value");

		const handleMinusClick = (quantityValue) => {
			let quantity = parseInt(quantityValue.textContent);
			if (quantity > 1) {
				quantityValue.textContent = quantity - 1;
			}
		};

		const handlePlusClick = (quantityValue) => {
			let quantity = parseInt(quantityValue.textContent);
			quantityValue.textContent = quantity + 1;
		};

		minusBtn.addEventListener("click", (event) => handleMinusClick(quantityValue));

		plusBtn.addEventListener("click", (event) => handlePlusClick(quantityValue));
	});
}
