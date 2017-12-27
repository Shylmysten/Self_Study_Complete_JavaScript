/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gameActive, winningScore, lastDice;

// start game
init();

/**** NEW GAME ****/
// finds the button element for New Game and sets it to a variable
const newGame = document.querySelector('.btn-new');
// listens for click on New Game and resets all scores and activePlayer
newGame.addEventListener('click', init);

/**** Player rolls ****/
// finds the button element to roll the dice and places it in a variable
const rollDice = document.querySelector('.btn-roll');
// listens for click on roll dice, then rolls the dice and adds score to
// roundScore, placing it in the activePlayer'S current score box
  rollDice.addEventListener('click', function(event) {
    // makes the button unclickable if the game is over
    if (gameActive) {
      // 1. Roll the dice
      var dice = Math.floor(Math.random() * 6) + 1;
      var diceDom = document.querySelector(`.dice`);

      // 2. display the result
      diceDom.style.display = `block`;
      diceDom.src="dice-" + dice + ".png";

      // 3. Update the result if a 1 was not rolled
      if (dice === 6 && lastDice === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
      } else if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
          nextPlayer();
      }
      lastDice = dice;
    }
});

/**** Player Holds ****/
// finds the button element to roll Hold and places it in a variable
const playerHolds = document.querySelector('.btn-hold');
// listens for player to click hold, adds his roundScore to his global score
// and changes players.
playerHolds.addEventListener('click', function(event) {
  // checks the game state and makes the button unclickable if the game is over
  if (gameActive) {
    // Add current score to global score
    scores[activePlayer] += roundScore;
    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


    var input = document.querySelector('.final-score').value;
    // undefined, 0, null, "" are COERCED to false
    // ANYTHING else is COERCED to true

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check for a Winner
    if (scores[activePlayer] < winningScore) {
      nextPlayer();
    } else {
      /**** declare winner ****/
      // set Player name to WINNER!
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      // reset round score to 0
      document.getElementById('current-'+ activePlayer).textContent = 0;
      // hide the dice from the center of the UI
      document.querySelector(`.dice`).style.display = `none`;
      // Resets the active Panel to the declared winner
      document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
      document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
      // sets the game State to Game Over
      gameActive = false;
    }
  }
});

// Let User Sets Winning Score by setting input box and adding a listener to it
/*
document.querySelector('.final-score').addEventListener('change', function () {
  winningScore = parseInt(document.querySelector('.final-score').value);
},false);
*/




// changePlayer
function nextPlayer() {
  // resets the roundscore to 0
  roundScore = 0;
  // updates the UI to reflect that roundscore is 0 for both players
  document.getElementById('current-0').textContent = roundScore;
  document.getElementById('current-1').textContent = roundScore;
  // update the UI by toggling the active player class in each player panel
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // hides the dice so the next player has a clear table to roll on
  document.querySelector(`.dice`).style.display = `none`;
  // Change activePlayers using Ternary operator.
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
}

// Initialize/reset/start the Game
function init() {
  // Reset all variable values and Dom elements to 0
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector('.final-score').value = "";
  gameActive = true;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    // hides dice on before start of game
    document.querySelector(`.dice`).style.display = `none`;
    // Resets Player names so WINNER is no longer present
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // Removes active player class from both player panels before adding another
    // so there are not two added by mistake at next init();
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    // removes the class winner from player panels
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}
