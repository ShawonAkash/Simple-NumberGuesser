//game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//ui elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//assign ui min max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);
  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please Enter a Number Between ${min} and ${max}`, 'red');
  }
  //check if won
  if (guess === winningNum) {
    //Game Over - won
    gameOver(true, `${winningNum} is correct, You WIN!`);
  } else {
    //wrong number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      //Game Over -lost
      gameOver(false, `Game Over, you Lost. The Correct number was ${winningNum}`);

    } else {
      //game continuous - answer wrong
      guessInput.style.borderColor = 'red';
      //clear input
      guessInput.value = '';
      setMessage(`${guess} is not Correct, ${guessesLeft} guesses Left`, 'red');
    }
  }
});
//game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disable = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);
  //play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}
//get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}