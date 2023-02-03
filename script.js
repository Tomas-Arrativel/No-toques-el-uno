'use strict';

//  Seleccion de elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//  Condiciones iniciales
let scores, currScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

//  Función cambio de jugador
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//  Funcion Girar dado

btnRollDice.addEventListener('click', function () {
  if (playing) {
    //  1. Generar un num rand
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    //  2. Mostrar el dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;
    //  3. Ver si lo que sacamos no es 1
    if (diceNum !== 1) {
      //  Agregar diceNum al resultado
      currScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      //  Cambiar al siguiente jugador
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //  1. Agregar currscore al jugador activo
    scores[activePlayer] += currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //  2. Fijarse si el score es >= 100
    if (scores[activePlayer] >= 100) {
      //  Terminar juego
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //  Cambiar al sig jugador
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
