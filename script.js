let currentPlayer = 'Player 1';
let selectedFields = [];
let fieldsPlayer1 = [];
let fieldsPlayer2 = [];
let counter = 0;
let circle = document.getElementsByClassName('circle');
let cross = document.getElementsByClassName('cross');
let fields = document.getElementsByTagName('td');
let checkIfWinner = ['', []];
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function selectField(id) {
  if (!selectedFields[id]) {
    setVariables(id);
    renderFieldSelection(id);
    checkForWin();
    changeCurrentPlayer();
  }
}

function setVariables(id) {
  selectedFields[id] = currentPlayer;
  counter++;
  if (currentPlayer == 'Player 1') {
    fieldsPlayer1.push(id);
    checkIfWinner[0] = currentPlayer;
    checkIfWinner[1] = fieldsPlayer1;
  } else {
    fieldsPlayer2.push(id);
    checkIfWinner[0] = currentPlayer;
    checkIfWinner[1] = fieldsPlayer2;
  }
}

/* renders the current players field selection and sets the checkIfWinner-variable for later checkForWin */
function renderFieldSelection(id) {
  fields[id].classList.remove('hover');
  if (currentPlayer == 'Player 1') {
    cross[id].classList.remove('d-none');
  } else {
    circle[id].classList.remove('d-none');
  }
}

function checkForWin() {
  if (hasFullRow() > -1) {
    let indexOfWinningCombination = hasFullRow();
    renderWinnerLine(indexOfWinningCombination);
    /* gameOver(); */
    setTimeout(() => {
      gameOver('win');
    }, 400);
  } else {
    checkIfGameOver();
  }
}

/* checks if the current player has a full row ( = winningCombination)
 ** returns the index of the winning combination in the variable winningCombination */
function hasFullRow() {
  let indexOfWinningCombination = winningCombinations.findIndex((combination) => playerHasFullCombination(combination));
  return indexOfWinningCombination;
}

/* checks if the selected fields of the current player ( = checkIfWinner) contain all the numbers of the winningCombination
 ** returns true or false */
function playerHasFullCombination(combination) {
  return combination.every((number) => checkIfWinner[1].includes(number));
}

function checkIfGameOver() {
  if (counter == 9) {
    gameOver('nowin');
  }
}

function gameOver(status) {
  document.getElementById('game-over').classList.remove('minimize');
  if (status === 'win') {
    document.getElementById('game-over-text').innerHTML = `${checkIfWinner[0]} wins!`;
  } else {
    document.getElementById('game-over-text').innerHTML = `Game Over!`;
  }
}


/* changes the current player and shows the current player on the boards player panel */
function changeCurrentPlayer() {
  if (currentPlayer == 'Player 1') {
    currentPlayer = 'Player 2';
    document.getElementById('player-1').classList.add('inactive');
    document.getElementById('player-2').classList.remove('inactive');
  } else {
    currentPlayer = 'Player 1';
    document.getElementById('player-1').classList.remove('inactive');
    document.getElementById('player-2').classList.add('inactive');
  }
}

function restart() {
  document.getElementById('winner-line').classList.add('winner-line-0');
  document.getElementById('game-over').classList.add('minimize');
  resetVariables();
  resetBoard();
}

function resetVariables() {
  selectedFields = [];
  fieldsPlayer1 = [];
  fieldsPlayer2 = [];
  currentPlayer = 'Player 1';
  counter = 0;
}

function resetBoard() {
  for (i = 0; i < 9; i++) {
    circle[i].classList.add('d-none');
    cross[i].classList.add('d-none');
    fields[i].classList.add('hover');
  }
  document.getElementById('player-1').classList.remove('inactive');
  document.getElementById('player-2').classList.add('inactive');
}

function renderWinnerLine(index) {
  let line = document.getElementById('winner-line');
  line.classList.remove('winner-line-0');
  if (index <= 2) {
    line.style.top = 'calc(50% + ((100% + 2px) *' + index + '))';
    line.style.left = 'calc(12.5% + 3px)';
    line.style.transform = 'translateY(-50%)';
  }
  if (index >= 3 && index <= 5) {
    line.style.transform = 'rotate(90deg)';
    line.style.top = 'calc(12.5% - 3px)';
    line.style.left = 'calc(50% + (100% + 2px) *' + (index - 3) + ')';
  }
  if (index == 6) {
    line.style.top = '30%';
    line.style.left = '30%';
    line.style.width = '350%';
    line.style.transform = 'translateY(-5px) rotate(45deg)';
  }
  if (index == 7) {
    line.style.top = '270%';
    line.style.left = '30%';
    line.style.width = '350%';
    line.style.transform = 'rotate(-45deg)';
  }
}

/* function checkForWin() {
  if (hasFullRow()) {
    let winner = hasFullRow();
    showWinner(winner);
  }
} */

/* function hasFullRow() {
  let winner;
  if (selectedFields[0] == selectedFields[1] && selectedFields[1] == selectedFields[2] && selectedFields[0]) {
    winner = selectedFields[0];
  }
  if (selectedFields[3] == selectedFields[4] && selectedFields[4] == selectedFields[5] && selectedFields[3]) {
    winner = selectedFields[3];
  }
  if (selectedFields[6] == selectedFields[7] && selectedFields[7] == selectedFields[8] && selectedFields[6]) {
    winner = selectedFields[6];
  }
  if (selectedFields[0] == selectedFields[3] && selectedFields[3] == selectedFields[6] && selectedFields[0]) {
    winner = selectedFields[0];
  }
  if (selectedFields[1] == selectedFields[4] && selectedFields[4] == selectedFields[7] && selectedFields[1]) {
    winner = selectedFields[1];
  }
  if (selectedFields[2] == selectedFields[5] && selectedFields[5] == selectedFields[8] && selectedFields[2]) {
    winner = selectedFields[2];
  }
  if (selectedFields[0] == selectedFields[4] && selectedFields[4] == selectedFields[8] && selectedFields[0]) {
    winner = selectedFields[0];
  }
  if (selectedFields[2] == selectedFields[4] && selectedFields[4] == selectedFields[6] && selectedFields[2]) {
    winner = selectedFields[2];
  }

  if (winner) {
    return winner;
  }
} */
