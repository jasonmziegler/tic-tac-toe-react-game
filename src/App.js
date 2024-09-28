import { useState } from "react";
import './index.css';
import './App.css';

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

  const [gameState, setGameState] = useState({
    playerMovesArray: initArray([]),
    gamePiece: "X",
    position: "",
    isGameOver: false,
  })
 
  // const [ messageLog, setMessageLog ] = useState([]);
  let computerThinking = false;
  
 function handleGameResetSubmit() {
  console.log("Game Reset");
  setGameState(({
    playerMovesArray: initArray([]),
    gamePiece: "X",
    position: "",
    isGameOver: false,
  }));
 }

  function isWinner(currentPlayer, updatedArray) {

    let movesArray = updatedArray;
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

  function isCellEmpty(index) {
    return (gameState.playerMovesArray[index] === "-") ?  true :  false;
  }

  function isBoardFull(updatedArray) {
    return(!updatedArray.includes("-"));
  }
  
  function updateCell(index) {
    let newArray = [...gameState.playerMovesArray];
    newArray[index] = gameState.gamePiece;
    return newArray;
  }
  function switchPlayers(tempToken) {
    return tempToken === "X" ? "O" : "X";
  }
  function makeComputerMove(newArray, tempToken) {
    computerThinking = true;
      // while computerThinking true calculate positions
      let index;
      while (computerThinking) {
        // computer chooses a random position
        index = Math.floor(Math.random() * 9);
        console.log(index);
        // simulate computer thinking
        setTimeout(1000);
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
  function isEndGame(updatedArray, newGamePiece) {
    let message = "";
    let isGameOver;
    if (isWinner(newGamePiece, updatedArray)) {
      // console.log(`${gameState.gamePiece} wins!`);
      message = `${newGamePiece} wins!`;
      // declare winner
      isGameOver =  true;
    } else if (isBoardFull(updatedArray)) { // else if check board full
      // declare Cat's Game
      message = "Board is Full, Cat's Game";
      // alert(message);
      // console.log(message);
      isGameOver = true;
    } else {
      isGameOver = false;
    }
    return {message: message, isGameOver: isGameOver};
  }

  function handeCellClick(input) {
    console.log(input);
    let message = "";
    if (isCellEmpty(input)) {
      let updatedArray = updateCell(input);
      let newGamePiece = gameState.gamePiece;
      let isGameOver = false;
      //check for winner or cat's game
      let result = isEndGame(updatedArray,newGamePiece);
      message = result.message;
      isGameOver = result.isGameOver;
      if (!isGameOver) {
        // else switch players
        newGamePiece = switchPlayers(newGamePiece);
        // computer's Move
        updatedArray = makeComputerMove(updatedArray, newGamePiece);
        let result = isEndGame(updatedArray,newGamePiece);
        message = result.message;
        isGameOver = result.isGameOver;
        if (!isGameOver) {
          newGamePiece = switchPlayers(newGamePiece);
        }
      }
      // set state all at once
      setGameState((prevState) => ({
          ...prevState,
          playerMovesArray: updatedArray,
          gamePiece: newGamePiece,
          isGameOver: isGameOver,
        }));
        if (message !== "") {
          console.log(message);
          alert(message);
        }
    } else {
      message = "Space taken, please choose and empty space.";
      console.log(message);
      alert(message);
    }
  }

  return (
    <div className="App">
      <Header />
      <main>
        <GameBoard 
        playerMovesArray={gameState.playerMovesArray}
        onCellClick={handeCellClick}/>
        {(!gameState.isGameOver) ? 
          <PlayerConsole 
          gameState={gameState}
          setGameState={setGameState}
          computerThinking={computerThinking}
          />
        : 
          <GameOver handleGameResetSubmit={handleGameResetSubmit} />
        }
      </main>
    </div>
  );
}

export default App;
