/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer, dice, gameActive;

// start game
init();

// **** NEW GAME **** //
// finds the button element for New Game and sets it to a variable
const newGame = document.querySelector('.btn-new');
// listens for click on New Game and resets all scores and activePlayer
newGame.addEventListener('click', init);

// **** Player rolls **** //
// finds the button element to roll the dice and places it in a variable
const rollDice = document.querySelector('.btn-roll');
// listens for click on roll dice, then rolls the dice and adds score to
// roundScore, placing it in the activePlayer'S current score box
  rollDice.addEventListener('click', function(event) {
    if (gameActive) {
      // 1. Roll the dice
      dice = Math.floor(Math.random() * 6) + 1;
      // 2. display the result
      document.querySelector(`img.dice`).src="dice-" + dice + ".png";
      document.querySelector(`.dice`).style.display = `block`;
      // 3. Update the result if a 1 was not rolled
      if (dice == 1) {
        changePlayer();
        return roundScores;
      } else {
        roundScores = dice + roundScores;
        document.querySelector('#current-' + activePlayer).textContent = roundScores;
        return roundScores;
      }
    }
});

// **** Player Holds **** //
// finds the button element to roll Hold and places it in a variable
const playerHolds = document.querySelector('.btn-hold');
// listens for player to click hold, adds his roundScore to his global score
// and changes players.
playerHolds.addEventListener('click', function(event) {
  if (gameActive) {
    // add current score to global score
    scores[activePlayer] = scores[activePlayer] + roundScores;
    // update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    // Check for winner
    if (scores[activePlayer] < 100) {
      // if no winner, switch players turn
      changePlayer();
    } else {
      // declare winner
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.getElementById('current-'+ activePlayer).textContent = 0;
      //document.querySelector(`.btn-roll`).setAttribute("Style", "display: none;");
      //document.querySelector(`.btn-hold`).setAttribute("Style", "display: none;");
      document.querySelector(`.dice`).style.display = `none`;
      document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
      document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
      gameActive = false;
    }
  }
});

// changePlayer
function changePlayer() {
  if (activePlayer == 0) {
    roundScores = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScores;
    // changePlayer by reseting activePlayer and active classes from one player to another
    activePlayer = 1;
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector(`.dice`).style.display = `none`;
    return activePlayer;
  } else {
    roundScores = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScores;
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector(`.dice`).style.display = `none`;
    activePlayer = 0;
    return activePlayer;
  }
}

function init() {
  scores = [0, 0];
  roundScores = 0;
  activePlayer = 0;
  dice = 0;
  gameActive = true;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  // hides dice on before start of game
  document.querySelector(`.dice`).style.display = `none`;
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  //document.querySelector(`.btn-roll`).setAttribute("Style", "display: block;");
  //document.querySelector(`.btn-hold`).setAttribute("Style", "display: block;");
}
