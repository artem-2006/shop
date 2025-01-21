const displayHidden = document.querySelector(".display-hidden");
const about = document.querySelector(".about");
const aboutBtn = document.getElementById("aboutBtn");
const mainBtn = document.getElementById("mainBtn");
const lookbookBtn = document.getElementById("lookbookBtn");
const stockBtn = document.getElementById("stockBtn");

export const handleClick = (showAbout = false) => {
	if (showAbout) {
		displayHidden.style.display = "none";
		about.style.display = "block";
		mainBtn.classList.remove("active-nav");
		aboutBtn.classList.add("active-nav");
	} else {
		displayHidden.style.display = "block";
		about.style.display = "none";
		mainBtn.classList.add("active-nav");
		aboutBtn.classList.remove("active-nav");
	}
};

export const changeDisplay = () => {
	aboutBtn.addEventListener("click", () => handleClick(true));
	mainBtn.addEventListener("click", () => handleClick(false));
	lookbookBtn.addEventListener("click", () => handleClick(false));
	stockBtn.addEventListener("click", () => handleClick(false));
};
