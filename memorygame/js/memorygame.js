const cardsArray = [
  {
    name: "fire",
    img: "./img/fire.png",
  },
  {
    name: "youtube",
    img: "./img/youtube.png",
  },
  {
    name: "flash",
    img: "./img/flash.png",
  },
  {
    name: "gift",
    img: "./img/gift.png",
  },
  {
    name: "tron",
    img: "./img/tron.png",
  },
  {
    name: "ufo",
    img: "./img/ufo.png",
  },
  {
    name: "plant",
    img: "./img/plant.png",
  },
  {
    name: "burger",
    img: "./img/burger.png",
  },
];
const delay = 1000;
const grid = document.querySelector(".grid");
let count = 0;
let previousCard;
let firstGuess = "";
let secondGuess = "";
generateCard();

function matchingCard() {
  const selectedItems = [...document.querySelectorAll(".selected")];
  selectedItems.forEach((item) => item.classList.add("matched"));
}

function resetGuess() {
  count = 0;
  firstGuess = "";
  secondGuess = "";
  const selectedItems = [...document.querySelectorAll(".selected")];
  selectedItems.forEach((item) => item.classList.remove("selected"));
  const mathedAll = document.querySelectorAll(".matched");
  const cardLength = document.querySelectorAll(".card").length;
  if (mathedAll.length === cardLength) {
    //done game => reset
    setTimeout(
      mathedAll.forEach((el) => el.classList.remove("matched")),
      delay
    );
    setTimeout(generateCard, delay);
  }
}

function generateCard() {
  //reset inner html
  grid.innerHTML = "";
  //cardsArray gộp chính nó.
  //công thức random các item trong 1 array: array.sort(() => 0.5 - Math.random())
  const cardsArrayMerge = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());
  cardsArrayMerge.forEach((item) => {
    //mỗi item sẽ tạo ra 1 card
    const card = document.createElement("div");
    card.classList.add("card");

    // card.setAttribute("data-set", item.name)
    card.dataset.name = item.name;

    //front-card
    const front = document.createElement("div");
    front.classList.add("front");
    //backcard
    const back = document.createElement("div");
    back.classList.add("back");

    back.style.backgroundImage = `url(${item.img})`;
    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);
  });
}
grid.addEventListener("click", (e) => {
  const cards = grid.querySelectorAll(".card");
  console.log(cards);
  const clicked = e.target;
  if (
    clicked.nodeName === "SECTION" ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("matched")
  ) {
    return;
  }
  if (previousCard === clicked.parentNode) {
    resetGuess();
  }
  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
    } else {
      secondGuess = clicked.parentNode.dataset.name;
    }
    clicked.parentNode.classList.add("selected");
    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(matchingCard, delay);
      }
      setTimeout(resetGuess, delay);
    }
    previousCard = clicked.parentNode;
  }
});
