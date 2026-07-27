
const track = document.querySelector(".track");
const cards = document.querySelectorAll(".card");

let visibleCards = 3;
let index = visibleCards;

// Clone
const clonesBefore = [];
const clonesAfter = [];

cards.forEach((card, i) => {
  if (i < visibleCards) clonesAfter.push(card.cloneNode(true));
  if (i >= cards.length - visibleCards) clonesBefore.push(card.cloneNode(true));
});

clonesBefore.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));
clonesAfter.forEach(clone => track.appendChild(clone));

const allCards = document.querySelectorAll(".card");

// Width
function getWidth() {
  const gap = parseInt(getComputedStyle(track).gap);
  return allCards[0].offsetWidth + gap;
}

// Move
function move(instant = false) {
  track.style.transition = instant ? "none" : "transform 0.4s ease";
  track.style.transform = `translateX(-${index * getWidth()}px)`;
}

move(true);

// Auto slide
setInterval(() => {
  index++;
  move();
}, 2500);

// Loop fix
track.addEventListener("transitionend", () => {
  if (index >= allCards.length - visibleCards) {
    index = visibleCards;
    move(true);
  }
  if (index < visibleCards) {
    index = allCards.length - visibleCards * 2;
    move(true);
  }
});

// Modal
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");

document.addEventListener("click", (e) => {
  const card = e.target.closest(".card");

  if (card) {
    modal.style.display = "flex";
    modalTitle.innerText = card.dataset.title;
    modalDesc.innerText = card.dataset.desc;
    modalContent.style.backgroundImage = `url(${card.dataset.img})`;
  }

  if (e.target === modal) {
    modal.style.display = "none";
  }
});