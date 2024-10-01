/*-------------------------------- Constants --------------------------------*/
const handleClick = (event) => {
  if (event.target.classList.contains("sqr")) {
    const squareIndex = event.target.id;
    placePiece(squareIndex);
    checkWin();
    checkForTie();
    switchPlayer();
    render();
  }
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let winner = false;
let tie = false;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");

/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
  messageEl.innerText = "Loading Complete. Start playing!";
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((newTurn, index) => {
    squareEls[index].innerText = newTurn;
  });
}

function placePiece(index) {
  return (board[index] = turn);
}

squareEls.forEach((squareEl) => {
  squareEl.addEventListener("click", handleClick);
});

function switchPlayer() {
  if (winner === true) {
    return; // no need to switch if there's a winner
  } else {
    turn = turn === "X" ? "O" : "X";
  }
}

function checkWin() {
  for (winningCombo of winningCombos) {
    if (
      board[winningCombo[0]] === turn &&
      board[winningCombo[1]] === turn &&
      board[winningCombo[2]] === turn
    ) {
      winner = true;
    }
  }
}

function checkForTie() {
  for (let i = 0; i < board.length; i++) {
    tie = true;
    if (board[i] === "") {
      tie = false;
      break;
    }
  }
}

function updateMessage() {
  if (winner === false && tie === false) {
    messageEl.textContent = `It's ${turn} turn`;
  } else if (winner === false && tie === true) {
    messageEl.textContent = " It's a tie!";
  } else {
    messageEl.textContent = `${turn} has won. Congratulations!`;
  }
}

/*----------------------------- Event Listeners -----------------------------*/
init();
resetBtnEl.addEventListener("click", init);
