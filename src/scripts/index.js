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

// Variable to used to keep count of matched cards
let matchedCardCount;

// Variable to used to pause flipping cards
let flippingPause;

document.addEventListener("DOMContentLoaded", () => {

    // Function to initialize the game board
    function init() {
        selectedCardElements = [];
        matchedCardCount = 0;
        flippingPause = false;
        grid.innerHTML = "";
        resultDisplay.textContent = "Score: 0";
        gameCards.sort(() => 0.5 - Math.random());
    }

    // Function to create game board with cards
    function createBoard() {
        init();

        // Loop through each card and create its HTML
        for (let i = 0; i < gameCards.length; i++) {
            const cardElement = document.createElement("img");
            flipCardBack(cardElement);
            cardElement.setAttribute("data-id", i);
            cardElement.addEventListener("click", flipCard);
            grid.appendChild(cardElement);
        }
    }

    function flipCardBack(element) {
        element.setAttribute("src", "public/images/reggae.png");
    }

    // Function to flip the selected card
    function flipCard() {
        // If there are two cards already flipped, do nothing
        if (flippingPause) return;

        // If the same card is clicked twice, do nothing
        if (selectedCardElements.includes(this)) return;

        // Collect the card index, set the image to the card's image
        const cardIndex = this.getAttribute("data-id");
        this.setAttribute("src", gameCards[cardIndex].img);
        selectedCardElements.push(this);

        // If two cards have been flipped, check for match
        if (selectedCardElements.length === 2) {
            flippingPause = true;

            // Set a timeout for 0.5 seconds to check for match and after let user flip another card
            setTimeout(() => {
                checkForMatch();
                flippingPause = false;
            }, 500);
        }
    }

    // Function to check for matches
    function checkForMatch() {

        // Get the card elements
        const cardElementOne = selectedCardElements[0];
        const cardElementTwo = selectedCardElements[1];

        // Get the cards from the game cards array
        const gameCardOne = gameCards[cardElementOne.getAttribute("data-id")];
        const gameCardTwo = gameCards[cardElementTwo.getAttribute("data-id")];

        // If the two cards match add 2 to the matched card count
        if (gameCardOne.name === gameCardTwo.name) {
            matchedCardCount += 2;

            // If the two cards do not match flip them back
        } else {
            flipCardBack(cardElementOne);
            flipCardBack(cardElementTwo);
        }

        // Empty the selected card elements array for the next turn
        selectedCardElements = [];

        // Set the result display to the matched card pairs
        resultDisplay.textContent = `Score: ${
            (matchedCardCount / 2).toString()
        }`;

        // If all cards have been matched, display a message
        if (matchedCardCount === gameCards.length) {
            resultDisplay.textContent = "Congratulations! You found them all!";
        }
    }

    // Create functionality to restart the game
    const restartButton = document.querySelector("#restart-button");
    restartButton.addEventListener("click", createBoard);

    createBoard();
});
