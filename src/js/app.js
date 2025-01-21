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
