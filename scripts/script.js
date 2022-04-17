"use strict";

//Selecting Elements
const player1El = document.querySelector(".player-1");
const player2El = document.querySelector(".player-2");
const score1El = document.querySelector("#score-1");
const score2El = document.querySelector("#score-2");
const diceEl = document.querySelector(".dice");
const currentScore1 = document.querySelector("#current-score-1");
const currentScore2 = document.querySelector("#current-score-2");
const btnNewGame = document.querySelector(".new-game-btn");
const btnRoll = document.querySelector(".roll-dice-btn");
const btnHold = document.querySelector(".hold-btn");

//Starting Conditions
score1El.textContent = 0;
score2El.textContent = 0;

let scores, currentScore, activePlayer, gameFinished;

function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  gameFinished = false;

  score1El.textContent = 0;
  score2El.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;

  player1El.classList.add("player-active");
  player2El.classList.remove("player-active");
  player1El.classList.remove("player-winner");
  player2El.classList.remove("player-winner");
  player1El.children[1].classList.add("current-active-score");
  player2El.children[1].classList.remove("current-active-score");
}

init();

diceEl.classList.add("hidden");

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current-score-${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1El.classList.toggle("player-active");
  player2El.classList.toggle("player-active");
  player1El.children[1].classList.toggle("current-active-score");
  player2El.children[1].classList.toggle("current-active-score");
}

//Roll Dice function
function rollDice() {
  if (gameFinished == false) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current-score-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

//Hold Button function
function holdButton() {
  if (gameFinished == false) {
    scores[activePlayer - 1] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer - 1];

    if (scores[activePlayer - 1] >= 20) {
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document.querySelector(`#score-${activePlayer}`).textContent =
        "🎆 Winner!";
      gameFinished = true;
    } else {
      switchPlayer();
    }
  }
}

btnRoll.addEventListener("click", rollDice);

btnHold.addEventListener("click", holdButton);

btnNewGame.addEventListener("click", init);

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    rollDice();
  }

  if (e.key == " ") {
    holdButton();
  }

  if (e.key == "Escape") {
    init();
  }
});
