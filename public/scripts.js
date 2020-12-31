const currentPage = location.pathname
const menuItems = document.querySelectorAll("#nav-links a")


console.log(currentPage)

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}