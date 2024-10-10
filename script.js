const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const restartButton = document.getElementById('restart-button');
let cards = [];
let flippedCards = [];
let moves = 0;

const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
const gameEmojis = [...emojis, ...emojis];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(emoji, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = gameEmojis[this.dataset.index];
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = gameEmojis[card1.dataset.index] === gameEmojis[card2.dataset.index];

    if (!match) {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];

    if (document.querySelectorAll('.flipped').length === gameEmojis.length) {
        alert(`Congratulations! You won in ${moves} moves!`);
        restartButton.style.display = 'block';
    }
}

function initGame() {
    shuffleArray(gameEmojis);
    gameBoard.innerHTML = '';
    for (let i = 0; i < gameEmojis.length; i++) {
        const card = createCard(gameEmojis[i], i);
        gameBoard.appendChild(card);
        cards.push(card);
    }
    moves = 0;
    movesDisplay.textContent = moves;
    restartButton.style.display = 'none';
}

function restartGame() {
    cards = [];
    flippedCards = [];
    initGame();
}

restartButton.addEventListener('click', restartGame);

initGame();