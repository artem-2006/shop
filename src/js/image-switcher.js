export function imageSwitcher() {
	document.addEventListener("DOMContentLoaded", function () {
		const cards = ["card1", "card2", "card3", "card4"];

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
