// selecting an object (a class) called .modalOverlay
const modalOverlay = document.querySelector('.modalOverlay');
const modal = document.querySelector('.modal');

// selecting every object named .card using querySelectorALL
const cards = document.querySelectorAll('.card');


for (let card of cards) {
    card.addEventListener('click', function() {
        const pageId = card.getAttribute("id");
        window.location.href = `/course?id=${pageId}`


    })
}






// document.querySelector('.maximizeModal').addEventListener('click', function() {
//     if (modal.classList.contains('maximize')) {
//         modal.classList.remove('maximize')
//     } else {
//         modal.classList.add('maximize')
//     }
// })