const currentPage = location.pathname;
const navAnchors = document.querySelectorAll("header .links a");



for (item of navAnchors) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}