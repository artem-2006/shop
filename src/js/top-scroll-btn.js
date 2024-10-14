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
