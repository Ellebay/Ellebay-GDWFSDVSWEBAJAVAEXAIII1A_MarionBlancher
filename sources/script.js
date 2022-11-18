/* Initalize Variables */
var currentPlayer, round, global, die, currentGame, winningScore = 100, player0Name, player1Name;

const bntNewGame = document.getElementById('btn-new-game');
const btnRollDice = document.getElementById('btn-roll');
const btnHoldScore = document.getElementById('btn-hold');
const dice = document.getElementById('diceImg');
const namePlayer0 =  document.getElementById('player-name-0');
const namePlayer1 = document.getElementById('player-name-1');
const roundPlayer0 =  document.getElementById('player-current-score-0');
const globalPlayer0 = document.getElementById('player-total-score-0');
const roundPlayer1 =  document.getElementById('player-current-score-1');
const globalPlayer1 = document.getElementById('player-total-score-1');

const images = [
    "images/dice-1.svg",
    "images/dice-2.svg",
    "images/dice-3.svg",
    "images/dice-4.svg",
    "images/dice-5.svg",
    "images/dice-6.svg"
];

/* Function new Game */
function newGame () {

    /* initialize variable */
    global = [0, 0]
    currentPlayer = 0;
    round = 0;
    currentGame = true;
    
    /* Get players names */
    player0Name=prompt("Please enter Player 1 name");
    if (player0Name == null || player0Name == "") {
        namePlayer0.innerText  = "Player 1";
      } else {
        namePlayer0.innerText  = player0Name ;
      }
    
    player1Name=prompt("Please enter Player 2 name");
    if (player1Name == null || player1Name == "") {
        namePlayer1.innerText  = "Player 2";
    } else {
        namePlayer1.innerText  = player1Name ;
    }

    roundPlayer0.innerText = 0;
    roundPlayer1.innerText = 0;
    globalPlayer0.innerText = 0;
    globalPlayer1.innerText = 0;

    document.querySelector('.player-background-0').classList.remove('winner')
    document.querySelector('.player-background-1').classList.remove('winner')
    document.querySelector('.player-background-0').classList.remove('active')
    document.querySelector('.player-background-1').classList.remove('active')
    document.querySelector('.player-background-0').classList.add('active')
}

bntNewGame.addEventListener('click', NewGame);

function rollDice () {
    if (currentGame) {
        /* Get Random number & show the correct die image */
        die = getRandomInt() + 1;
        dice.src = (images[die - 1]);

        /* Update the score if die different from 1 */
        if (die !== 1 ) {
            /* Add score to current one */
            round += die ;
            document.getElementById('player-current-score-' + currentPlayer).innerText = round;
        } else {
            /* Stop current player game and change to next player */
            nextPlayer();
        }
    }
};

function holdScore () {
    if (currentGame) {
        //add current score to the global score
        global[currentPlayer] += round;

        //Update the global score 
        document.getElementById('player-total-score-' + currentPlayer).innerText = global[currentPlayer];

        // check if player win the game
        if (global[currentPlayer] >= winningScore) {
            console.log(namePlayer0.innerText);
            if (currentPlayer === 0) {
                namePlayer0.innerText = "Winner!";
            } else {
                namePlayer1.innerText = "Winner!";
            }

            document.querySelector('.player-background-' + currentPlayer).classList.add('winner');
            document.querySelector('.player-background-' + currentPlayer).classList.remove('active');
        
            
            currentGame = false;
        } else {
            //next player
            nextPlayer();
        }
    }
};

function nextPlayer() {
    //next player
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    round = 0;

    document.getElementById('player-current-score-0').innerText = '0';
    document.getElementById('player-current-score-1').innerText = '0';

    document.querySelector('.player-background-0').classList.toggle('active');
    document.querySelector('.player-background-1').classList.toggle('active');
};

/* Function get random integer */
function getRandomInt() {
    return Math.floor(Math.random() * 6);
}

/* Animation to roll the dice */
$(btnRollDice).click(function() {
    $('#diceImg').effect('shake', {times:3}, 500);
});

/* Roll Dice */
btnRollDice.addEventListener('click', rollDice);

/* Hold Dice */
btnHoldScore.addEventListener('click', holdScore);