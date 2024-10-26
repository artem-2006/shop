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

export function imageSwitcher() {
	document.addEventListener("DOMContentLoaded", function () {
		const cards = ["card1", "card2", "card3", "card4", "card5"];

		cards.forEach((cardId) => {
			const card = document.getElementById(cardId);
			const mainImage = card.querySelector(".main-image");
			const thumbnails = card.querySelectorAll(".thumbnail");

			thumbnails.forEach((thumbnail) => {
				thumbnail.addEventListener("click", function () {
					mainImage.src = this.src;
				});
			});
		});
	});
}

export function scrollTopBtn() {
	let timer;

	window.onscroll = function () {
		const button = document.getElementById("scrollToTop");

		clearTimeout(timer);

		timer = setTimeout(() => {
			if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
				button.style.display = "block";
			} else {
				button.style.display = "none";
			}
		}, 50);
	};

	document.getElementById("scrollToTop").onclick = function () {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
}
