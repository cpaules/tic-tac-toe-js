// Given more time, I would have made a TicTacToe class and a Player class with class and instance methods rather than a 
// simple script. I would have also added css to make it nicer looking with animations

var turn = 0
var winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function player() {
  return turn % 2 === 0 ? "X" : "O"
}

function updateState(square) {
  $(square).text(player())
}

function setMessage(message) {
  $("#message").text(message)
}

// returns true when a player has won
function checkWinner() {
  // get the current board
  let curr_board = []
  for(let i = 0; i < 9; i++){
    let square = $("td")[i].innerHTML
    curr_board.push(square)
  }
  // loop through the winningCombos and check if the board matches a combination and if the space isnt an empty space
  for (var i = 0; i < winningCombos.length; i++) {
    if(curr_board[winningCombos[i][0]] === curr_board[winningCombos[i][1]] && curr_board[winningCombos[i][1]] === curr_board[winningCombos[i][2]] && curr_board[winningCombos[i][0]] !== "" ){
      setMessage(`Player ${curr_board[winningCombos[i][0]]} Won!`)
      return true
    }
  }
  return false
}

function doTurn(square) {
  updateState(square)
  turn++
  if (checkWinner()) {
    resetBoard()
  } else if (turn === 9) {
    setMessage("Tie game.")
    resetBoard()
  }
}

function resetBoard() {
  $('td').empty()
  turn = 0
}

function attachListeners() {
  $('td').on('click', function() { 
    if (!checkWinner() && !$.text(this)) {
      doTurn(this)
    };
  })
}

$(document).ready(function(){
  attachListeners()
})