import { useState } from "react";

import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import PlayerConsole from "./components/PlayerConsole";
import GameOver from "./components/GameOver";

function App() {
 
  function initArray(emptyArray) {
    for (let i=0; i<9; i++) {
      emptyArray.push("-");
    }
    return emptyArray;
  }

  // let emptyArray = initArray([]);

  const [gameState, setGameState] = useState({
    playerMovesArray: initArray([]),
    gamePiece: "X",
    position: "",
    isGameOver: false,
  })
  // const [playerMovesArray, setPlayerMovesArray] = useState(emptyArray);
  // const [position, setPosition] = useState(1);
  // const [gamePiece, setGamePiece] = useState("X");
  // const [isGameOver, setIsGameOver] = useState(false);
  // let [computerThinking, setComputerThinking] = useState(false);
  let computerThinking = false;
  /* 
  // 
  */
 function handleGameResetSubmit() {
  console.log("Game Reset");
  // setPlayerMovesArray(initArray([]));
  // setGamePiece("X");
  // setPosition("");
  // setIsGameOver(false);
  setGameState(({
    playerMovesArray: initArray([]),
    gamePiece: "X",
    position: "",
    isGameOver: false,
  }));
 }

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
  function isBoardFull(moveArray) {
    return(!moveArray.includes("-"));
  }
  
  function makeComputerMove(newArray, tempToken) {
    computerThinking = true;
      // while computerThinking true calculate positions?
      let index;
      while (computerThinking) {

        
          // computer chooses a random position
        index = Math.floor(Math.random() * 9);
        console.log(index);
        // index = position;
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
      return newArray;
  }

  function handleSubmit(e) {
    e.preventDefault();
    // check if winning board
    
    // determine if Cat's Game
    
    let newArray = [...gameState.playerMovesArray];
    console.log("Form Submitted, Player played a turn");
    let index = gameState.position - 1;
    let tempToken = gameState.gamePiece;

    // check for valid input
    if (index < 0 || index > 8 ) {
      alert("Please choose position 1 - 9");
      // setPosition("");
      setGameState(prevState => ({
        ...prevState,
        position: "",
      }));
      
      return;
    }

    if (newArray[index] !== "-") {
      alert("Space taken, please choose and empty space.");
      // setPosition("");
      setGameState(prevState => ({
        ...prevState,
        position: "",
      }));
      return;
    }
    
    // don't need splice can just set array directly with index
    //newArray.splice(index, 1, gamePiece);
    newArray[index] = tempToken;
    // setPlayerMovesArray(newArray);
    setGameState(prevState => ({
      ...prevState,
      playerMovesArray: newArray,
    }))
    if (isWinner(tempToken, newArray)) {
      let winningMessage = `${tempToken} wins!`;
      console.log(winningMessage);
      alert(winningMessage);
      // setIsGameOver(true);
      setGameState(prevState => ({
        ...prevState,
        isGameOver: true,
      }))
      return;
    };
    // setPosition("");
    setGameState(prevState => ({
      ...prevState,
      position: "",
    }))
    // TODO: Consider on setGameState a the end of this function
    //  check win condition
    // if no win condition check for valids "Cat's Game"
    // if open move and no win condition
    // switch players
    // setGamePiece(gamePiece === "X" ? "O" : "X";); 
    tempToken = (tempToken === "X") ? "O" : "X";
    // How to deal with full array no moves left? array.includes(value)
    //TODO: this should no longer be necessary as we check for open moves in After X move
    if (isBoardFull(newArray)) {
      let message = "Board is Full, Cat's Game";
      alert(message)
      console.log(message);
      // setIsGameOver(true);
      setGameState(prevState => ({
        prevState,
        isGameOver: true,
      }));
      return;
    } else{
      // O players turn (computer)
      // TODO: remove and then reuse the position variable
      newArray = makeComputerMove(newArray, tempToken);
    } 
    // setPlayerMovesArray(newArray);
    setGameState(prevState => ({
      ...prevState,
      playerMovesArray: newArray,
    }));
    // check win condition
    // check if any valid moves
    if (isWinner(tempToken, newArray)) {
      let winningMessage = `${tempToken} wins!`;
      console.log(winningMessage);
      alert(winningMessage);
      // setIsGameOver(true);
      setGameState(prevState => ({
        prevState,
        isGameOver: true,
      }));
      return;
    };
    // setGamePiece(tempToken === "X" ? "O" : "X"); 
    setGameState(prevState=>({
      ...prevState,
      gamePiece: tempToken === "X" ? "O" : "X",
    }))
  }

  
  return (
    <div className="App">
      <Header />
      <GameBoard playerMovesArray={gameState.playerMovesArray}/>
      {(!gameState.isGameOver) ? 
        <PlayerConsole 
        // gamePiece={gamePiece}
        // position={position}
        // setPosition={setPosition}
        gameState={gameState}
        setGameState={setGameState}
        computerThinking={computerThinking}
        handleSubmit={handleSubmit}
        />
      : 
        <GameOver handleGameResetSubmit={handleGameResetSubmit} />
      }
    </div>
  );
}

export default App;
