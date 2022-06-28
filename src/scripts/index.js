import "../styles/index.scss";

// Array with available cards
const cards = [
    {
        name: "cactus",
        img: "images/cactus.png",
    },
    {
        name: "mountain",
        img: "images/mountain.png",
    },
    {
        name: "rainbow",
        img: "images/rainbow.png",
    },
    {
        name: "sunflower",
        img: "images/sunflower.png",
    },
    {
        name: "world",
        img: "images/world.png",
    },
    {
        name: "fish",
        img: "images/fish.png",
    },
];

//Array with memory game cards, two sets of same cards
const gameCards = [...cards, ...cards];

// Variable to create the grid to fill with cards
const grid = document.querySelector("#grid");

// Variable to create the result display
const resultDisplay = document.querySelector("#result");

// Variable to be used to collect card elements
let selectedCardElements;

// Variable to used to  keep count of matched cards
let matchedCardCount;

// Variable to used to pause flipping cards
let flippingPause;

document.addEventListener("DOMContentLoaded", () => {

    //Function to initialize the game board
    function init() {
        selectedCardElements = [];
        matchedCardCount = 0;
        flippingPause = false;
        grid.innerHTML = "";
        resultDisplay.textContent = 0;
        gameCards.sort(() => 0.5 - Math.random());
    }

    //Function to create game board with cards
    function createBoard() {
        init();

        //loop through each card and create its HTML
        for (let i = 0; i < gameCards.length; i++) {
            const cardElement = document.createElement("img");
            cardElement.setAttribute("src", "public/images/reggae.png");
            cardElement.setAttribute("data-id", i);
            cardElement.addEventListener("click", flipCard);
            grid.appendChild(cardElement);
        }
    }

    //Function to flip the selected card
    function flipCard() {
        // if there are two cards already flipped, do nothing
        if (flippingPause) return;

        // if the same card is clicked twice, do nothing
        if (selectedCardElements.includes(this)) {
            return;
        }
        // collect the card index, set the image to the card's image
        const cardIndex = this.getAttribute("data-id");
        this.setAttribute("src", gameCards[cardIndex].img);
        selectedCardElements.push(this);

        // if two cards have been flipped, check for match
        if (selectedCardElements.length === 2) {
            flippingPause = true;

            // set a timeout for 0.5 seconds to display the cards front side and after let user flip another card
            setTimeout(() => {
                checkForMatch();
                flippingPause = false;
            }, 500);
        }
    }

    //Function to check for matches
    function checkForMatch() {
        const cardElementOne = selectedCardElements[0];
        const cardElementTwo = selectedCardElements[1];

        const gameCardOne = gameCards[cardElementOne.getAttribute("data-id")];
        const gameCardTwo = gameCards[cardElementTwo.getAttribute("data-id")];

        // if the two cards match add 2 to the matched card count
        if (gameCardOne.name === gameCardTwo.name) {
            matchedCardCount += 2;
            // if the two cards do not match flip them back
        } else {
            cardElementOne.setAttribute("src", "public/images/reggae.png");
            cardElementTwo.setAttribute("src", "public/images/reggae.png");
        }
        selectedCardElements = [];

        //set the result display to the matched card pairs
        resultDisplay.textContent = (matchedCardCount / 2).toString();

        // if all cards have been matched, display a message
        if (matchedCardCount.length === gameCards.length) {
            resultDisplay.textContent = "Congratulations! You found them all!";
        }
    }

    //Create button to start the game
    const restartButton = document.querySelector("#restart-button");
    restartButton.addEventListener("click", createBoard);

    createBoard();
});
