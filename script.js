'use strict';

let currentScore = 0
let diceImg = document.querySelector('.dice')
diceImg.classList.add("hidden")
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let activePlayer = 0
let scores = [0, 0]
let playing = true

const rollDice = () => {
  if (playing){
    const diceNumber = Math.floor((Math.random() * 6) +1);
    let imageDice = document.querySelector('.dice')
    imageDice.src = `dice-${diceNumber}.png`
    diceImg.classList.remove("hidden")

    if (diceNumber !== 1) {
      currentScore += diceNumber
      document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
      switchPlayer()
    }
  }
}
/* function to save the current player's score */
const holdDice = () => {
  if (playing){
    let playerScore = document.getElementById(`score--${activePlayer}`)
    scores[activePlayer] += currentScore
    playerScore.textContent = scores[activePlayer]
    if (scores[activePlayer] >= 80) {
      playing = false
      alert(`player--${activePlayer +1} win the game, replay`)
    } else {
      switchPlayer()
    }
  }
}

const switchPlayer = () => {
  let players = document.querySelectorAll('.player')
    players.forEach(player => {
      if (player.classList.contains("player--active")) {
        player.classList.remove("player--active")
      } else {
        player.classList.add("player--active")
      }
    });
  currentScore = 0
  document.getElementById(`current--${activePlayer}`).textContent = 0
  activePlayer = activePlayer === 0 ? 1 : 0
}

const resetGame = () => {
  scores = [0,0]
  activePlayer = 0
  currentScore = 0;
  playing = true

  document.getElementById(`score--0`).textContent = 0
  document.getElementById(`score--1`).textContent = 0

  diceImg.classList.add("hidden")
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

document.querySelector('.btn--roll').addEventListener('click', rollDice)
document.querySelector('.btn--hold').addEventListener('click', holdDice)
document.querySelector('.btn--new').addEventListener('click', resetGame)
