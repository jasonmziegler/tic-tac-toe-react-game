import { useState } from "react";

function App() {
  let emptyArray = []
  function initArray(emptyArray) {
    for (let i=0; i<9; i++) {
      emptyArray.push("-");
    }
    return emptyArray;
  }
  emptyArray = initArray(emptyArray);

  let [playerMovesArray, setPlayerMovesArray] = useState(emptyArray);
  let [position, setPosition] = useState(1);
  let [gamePiece, setGamePiece] = useState("X");
  // let [computerThinking, setComputerThinking] = useState(false);
  let computerThinking = false;

  function handleSubmit(e) {
    e.preventDefault();
    function isWinner(currentPlayer, movesArray) {
      if (movesArray[0] === currentPlayer && movesArray[1] === currentPlayer && movesArray[2] ===currentPlayer) {
        //top row win
        console.log("top row win");
        return true;
      } else if (movesArray[0] === currentPlayer && movesArray[3] === currentPlayer && movesArray[6] ===currentPlayer) {
        //left col win
        console.log("left col win");
        return true;
      } else if (movesArray[0] === currentPlayer && movesArray[4] === currentPlayer && movesArray[8] ===currentPlayer) {
        // top left diagonal win \
        console.log("top left diagonal win \ ");
        return true;
      } else if (movesArray[1] === currentPlayer && movesArray[4] === currentPlayer && movesArray[7] ===currentPlayer) {
        // middle column win
        console.log("middle column win");
        return true;
      } else if (movesArray[2] === currentPlayer && movesArray[5] === currentPlayer && movesArray[8] ===currentPlayer) {
        //right col win
        console.log("right col win");
        return true;
      } else if (movesArray[3] === currentPlayer && movesArray[4] === currentPlayer && movesArray[5] ===currentPlayer) {
        //middle row win
        console.log("middle row win");
        return true;
      } else if (movesArray[6] === currentPlayer && movesArray[7] === currentPlayer && movesArray[8] ===currentPlayer) {
        //bottom row win
        console.log("bottom row win");
        return true;
      } else if (movesArray[6] === currentPlayer && movesArray[4] === currentPlayer && movesArray[2] ===currentPlayer) {
        // bottom left diagonal win /
        console.log("bottom left diagonal win /");
        return true;
      } else {
        return false;
      }
    }
    let newArray = [...playerMovesArray];
    console.log("Form Submitted, Player played a turn");
    let index = position - 1;
    let tempToken = gamePiece;

    // check for valid input
    if (position < 0 || position > 9 ) {
      alert("Please choose position 1 - 9");
      setPosition("");
      return;
    }

    if (newArray[index] !== "-") {
      alert("Space taken, please choose and empty space.");
      setPosition("");
      return;
    }
    
    // don't need splice can just set array directly with index
    //newArray.splice(index, 1, gamePiece);
    newArray[index] = tempToken;
    setPlayerMovesArray(newArray);
    setPosition("");
    // TODO: check win condition
    // if no win condition check for valids "Cat's Game"
    // if open move and no win condition
    // switch players
    // setGamePiece(gamePiece === "X" ? "O" : "X";); 
    tempToken = (tempToken === "X") ? "O" : "X";
    // How to deal with full array no moves left? array.includes(value)
    //TODO: this should no longer be necessary as we check for open moves in After X move
    if (newArray.includes("-")) {
      // O players turn (computer)
      // TODO: remove and then reuse the position variable
      computerThinking = true;
      // while computerThinking true calculate positions?
      while (computerThinking) {
          // computer chooses a random position
        position = Math.floor(Math.random() * 9);
        console.log(position);
        index = position;
        // simulate computer thinking
        setTimeout(100);

        //check if position is empty 
        console.log("computer choice: ",newArray[index])
        if (newArray[index] === "-") {
          // if empty update position with gamepiece
          newArray[index] = tempToken; 
          // set computer thinking to false / break while loop
          computerThinking = false;
        }
      }   
    } else {
      console.log("No moves left")
    }
    setPlayerMovesArray(newArray);
    setGamePiece(tempToken === "X" ? "O" : "X"); 
    // check win condition
    // check if any valid moves
  }

  const row1 = playerMovesArray.slice(0,3).join(" ");
  const row2 = playerMovesArray.slice(3,6).join(" ");
  const row3 = playerMovesArray.slice(6,9).join(" ");
  console.log(playerMovesArray);

  return (
    <div className="App">
      <header>
        <h1>Tic Tac Toe React Game</h1>
      </header>
      <div id="gameBoard">
        <p>{row1}</p>
        <p>{row2}</p>
        <p>{row3}</p>
      </div>
      <div id="playerConsole">
        <h2>playerConsole</h2>
        <p>It's {gamePiece}'s move. {!computerThinking ? "" : "Computer Thinking"} </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="position">Position 1-9</label>
          <input 
          type="text"
          value={position}
          id="position"
          onChange={(e) => setPosition(e.target.value)}
          />
          <button>End Turn</button>
        </form>
      </div>
    </div>
  );
}

export default App;
