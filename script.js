let currentPlayer = 'Player 1';
let selectedFields = { occupiedBy: [], fields: document.getElementsByTagName('td') };
let fieldsPlayer1 = { fieldNumbers: [], crossShapes: document.getElementsByClassName('cross') };
let fieldsPlayer2 = { fieldNumbers: [], circleShapes: document.getElementsByClassName('circle') };
let counter = 0;
let checkIfWinner = { gameOver: false, name: '', fieldNumbers: [] };
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

/**
 * Onclick-event. Executed when player selects a field.
 * @param {number} id - The field number.
 */
function selectField(id) {
  if (!selectedFields['occupiedBy'][id] && !checkIfWinner['gameOver']) {
    setVariables(id);
    renderFieldSelection(id);
    checkIfWinner['gameOver'] = checkForWin();
    if (!checkIfWinner['gameOver']) {
      changeCurrentPlayer();
    }
  }
}

function setVariables(id) {
  selectedFields['occupiedBy'][id] = currentPlayer;
  counter++;
  if (currentPlayer == 'Player 1') {
    fieldsPlayer1['fieldNumbers'].push(id);
    checkIfWinner['name'] = currentPlayer;
    checkIfWinner['fieldNumbers'] = fieldsPlayer1['fieldNumbers'];
  } else {
    fieldsPlayer2['fieldNumbers'].push(id);
    checkIfWinner['name'] = currentPlayer;
    checkIfWinner['fieldNumbers'] = fieldsPlayer2['fieldNumbers'];
  }
}

/**
 * Renders the current players field selection.
 * @param {number} id - The field number.
 */
function renderFieldSelection(id) {
  if (currentPlayer == 'Player 1') {
    fieldsPlayer1['crossShapes'][id].classList.remove('d-none');
  } else {
    fieldsPlayer2['circleShapes'][id].classList.remove('d-none');
  }
  selectedFields['fields'][id].classList.remove('hover');
}

function checkForWin() {
  if (indexOfFullRow() > -1) {
    renderWinnerLine(indexOfFullRow());
    setTimeout(() => {
      gameOver('win'); //shows game over-modal with winner
    }, 400);
    return true;
  } else {
    return checkIfGameOver();
  }
}

/**
 * Checks if current player has full row ( = winningCombination).
 * @return {number} - The index of the winning combination in the variable winningCombination.
 */
function indexOfFullRow() {
  return winningCombinations.findIndex(playerHasCombination);
}

/**
 * Checks if selected fields of current player contain all numbers of the winning combination that is beeing checked.
 * @param {array} combination - The combination of the variable winningCombinations that is beeing checked.
 * @return {boolean}
 * */
function playerHasCombination(combination) {
  return combination.every((number) => checkIfWinner['fieldNumbers'].includes(number));
}

/**
 * Checks if game over because all fields are occupied.
 * @return {boolean}
 */
function checkIfGameOver() {
  if (counter == 9) {
    gameOver('nowin');
    return true;
  } else {
    return false;
  }
}

/**
 * Shows game over-modal.
 * @param {string} status - The winning-status ('win' or 'nowin').
 */
function gameOver(status) {
  document.getElementById('game-over').classList.remove('minimize');
  if (status === 'win') {
    document.getElementById('game-over-text').innerHTML = `${checkIfWinner['name']} wins!`;
  } else {
    document.getElementById('game-over-text').innerHTML = `Game Over!`;
  }
}

/**
 * Changes the current player and shows the current player on the boards player-panel.
 */
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
  selectedFields['occupiedBy'] = [];
  fieldsPlayer1['fieldNumbers'] = [];
  fieldsPlayer2['fieldNumbers'] = [];
  currentPlayer = 'Player 1';
  counter = 0;
  checkIfWinner['gameOver'] = false;
}

function resetBoard() {
  for (i = 0; i < 9; i++) {
    fieldsPlayer1['crossShapes'][i].classList.add('d-none');
    fieldsPlayer2['circleShapes'][i].classList.add('d-none');
    selectedFields['fields'][i].classList.add('hover');
  }
  document.getElementById('player-1').classList.remove('inactive');
  document.getElementById('player-2').classList.add('inactive');
}

/**
 * Renders the line drawn when a player wins.
 * @param {number} index - The index of the winning combination in varable winningCombinations.
 */
function renderWinnerLine(index) {
  if (index <= 2) {
    drawLine('275%', 'calc(50% + ((100% + 2px) *' + index + '))', 'calc(12.5% + 3px)', -50, 0);
  }
  if (index >= 3 && index <= 5) {
    drawLine('275%', 'calc(12.5% - 3px)', 'calc(50% + (100% + 2px) *' + (index - 3) + ')', 0, 90);
  }
  if (index == 6) {
    drawLine('350%', 'calc(30% - 3px)', '30%', -5, 45);
  }
  if (index == 7) {
    drawLine('350%', '270%', '30%', 0, -45);
  }
}

/**
 * Draws the winning-line with the parameters which it gets from renderWinnerLine(index).
 * @param {string} width - Line-width
 * @param {string} top - Top-distance to parent element
 * @param {string} left - Top-distance to parent element
 * @param {number} translate - Percentage for Y-translation
 * @param {number} rotate - Degree of rotation
 */
function drawLine(width, top, left, translate, rotate) {
  let line = document.getElementById('winner-line');
  line.style.width = width;
  line.style.top = top;
  line.style.left = left;
  line.style.transform = 'translateY(' + translate + '%) rotate(' + rotate + 'deg)';
  line.classList.remove('winner-line-0');
}
