import { counter, imageSwitcher, scrollTopBtn } from "./buttons.js";
import { addBasket } from "./basket.js";
import { changeDisplay } from "./displayHidden.js";

imageSwitcher();
counter();
scrollTopBtn();
addBasket();
changeDisplay();

AOS.init({
	once: true,
});

document.addEventListener("DOMContentLoaded", function () {
	new Splide("#instagramSlider", {
		type: "loop",
		perPage: 4,
		gap: "1rem",
		autoplay: true,
		pagination: false,
		breakpoints: {
			1200: { perPage: 3 },
			768: { perPage: 2 },
			576: { perPage: 1 },
		},
	}).mount();
});
