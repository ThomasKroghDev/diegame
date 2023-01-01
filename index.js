const reset = document.querySelector('.reset');
const roll = document.querySelector('.roll');
const hold = document.querySelector('.hold');
const rollValue = document.querySelector('.rollValue');
const player1 = document.querySelector('.player0');
const player2 = document.querySelector('.player1');
const currentScore0 = document.querySelector('.currScore0');
const currentScore1 = document.querySelector('.currScore1');
const totalScore0 = document.querySelector('.score0');
const totalScore1 = document.querySelector('.score1');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

totalScore0.textContent = 0;
totalScore1.textContent = 0;

const switchPlayer = () => {
  document.querySelector(`.currScore${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('activePlayer');
  player2.classList.toggle('activePlayer');
};

const setWin = () => {
  playing = false;
  document.querySelector(`.currScore${activePlayer}`).textContent = 0;
  document.querySelector(`.player${activePlayer}`).classList.add('winner');
  document
    .querySelector(`.player${activePlayer}`)
    .classList.remove('activePlayer');
};

roll.addEventListener('click', () => {
  if (playing) {
    const d20Value = Math.floor(Math.random() * 20) + 1;

    if (d20Value > 9) {
      rollValue.style.left = '-30px';
    } else if (d20Value < 10) {
      rollValue.style.left = '-16px';
    }
    rollValue.textContent = d20Value;
    if (d20Value !== 1) {
      currentScore += d20Value;
      document.querySelector(`.currScore${activePlayer}`).textContent =
        currentScore;

      if (d20Value === 20) {
        currentScore += d20Value;
        scores[activePlayer] += currentScore;
        document.querySelector(`.score${activePlayer}`).textContent =
          scores[activePlayer];
        switchPlayer();
      }
      if (d20Value === 10) {
        let double = (currentScore += d20Value) * 2;
        currentScore += double;
        document.querySelector(`.currScore${activePlayer}`).textContent =
          currentScore;
      }
      if (scores[activePlayer] >= 500) {
        setWin();
      }
    } else {
      switchPlayer();
    }
  }
});

hold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`.score${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 500) {
      setWin();
    } else {
      switchPlayer();
    }
  }
});

reset.addEventListener('click', () => {
  playing = true;
  scores.forEach(() => (score = 0));
  document.querySelector(`.player${activePlayer}`).classList.remove('winner');
  document.querySelector(`.currScore0`).textContent = 0;
  document.querySelector(`.currScore1`).textContent = 0;
  document.querySelector(`.score0`).textContent = 0;
  document.querySelector(`.score1`).textContent = 0;
  activePlayer = 0;
  document
    .querySelector(`.player${activePlayer}`)
    .classList.add('activePlayer');
});
