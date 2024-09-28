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

  // let emptyArray = initArray([]);

  const [gameState, setGameState] = useState({
    playerMovesArray: initArray([]),
    gamePiece: "X",
    position: "",
    isGameOver: false,
  })
  
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

  function isWinner(currentPlayer) {

    let movesArray = gameState.playerMovesArray;
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
  function isBoardFull() {
    return(!gameState.playerMovesArray.includes("-"));
  }
  
  function updateCell(index) {
    //
    let newArray = [...gameState.playerMovesArray];

    newArray[index] = gameState.gamePiece;
    
    setGameState(prevState => ({
      ...prevState,
      playerMovesArray: newArray,
    }));
  }
  function switchPlayers(tempToken) {
    setGameState(prevState=>({
      ...prevState,
      gamePiece: tempToken === "X" ? "O" : "X",
    }))
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

  function handeCellClick(input) {
    console.log(input);
    if (isCellEmpty(input)) {
      updateCell(input);
      if (isWinner(gameState.gamePiece)) {
        // declare winner
        // console.log(`${gameState.gamePiece} wins!`);
        let winningMessage = `${gameState.gamePiece} wins!`;
        console.log(winningMessage);
        setGameState(prevState => ({
          ...prevState,
          isGameOver: true,
        }));
        alert(winningMessage);
        return;
      } else if (isBoardFull()) {
        // declare Cat's Game
        // console.log("Cat's Game");
        let message = "Board is Full, Cat's Game";
        console.log(message);
        // setIsGameOver(true);
        setGameState(prevState => ({
          prevState,
          isGameOver: true,
        }));
        alert(message);
        return;
      }
      switchPlayers(gameState.gamePiece);
    } else {
      console.log("Space Taken");
      alert("Space taken, please choose and empty space.");
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    let input = gameState.position.trim();
    // console.log(e);
    // let input = e -1;
    // check for valid input
    if (isNaN(input) )
      if (input < 0 || input > 8 ) {
        alert("Please choose position 1 - 9");
        // setPosition("");
        setGameState(prevState => ({
          ...prevState,
          position: "",
        }));       
        return;
      }
    let newArray = [...gameState.playerMovesArray];
    console.log("Form Submitted, Player played a turn");
    let index = input - 1;
    let tempToken = gameState.gamePiece;
    if (newArray[index] !== "-") {
      alert("Space taken, please choose and empty space.");
      // setPosition("");
      setGameState(prevState => ({
        ...prevState,
        position: "",
      }));
      return;
    }
    // Set X piece on board
    newArray[index] = tempToken;
    // setPlayerMovesArray(newArray);
    setGameState(prevState => ({
      ...prevState,
      playerMovesArray: newArray,
    }))
    // check if winner
    if (isWinner(tempToken, newArray)) {
      let winningMessage = `${tempToken} wins!`;
      console.log(winningMessage);
      setGameState(prevState => ({
        ...prevState,
        isGameOver: true,
      }));
      alert(winningMessage);
      return;
    };
    setGameState(prevState => ({
      ...prevState,
      position: "",
    }))
    //If no winner switch to next player
    tempToken = (tempToken === "X") ? "O" : "X";
    //TODO: this should no longer be necessary as we check for open moves in After X move
    if (isBoardFull(newArray)) {
      let message = "Board is Full, Cat's Game";
      console.log(message);
      // setIsGameOver(true);
      setGameState(prevState => ({
        prevState,
        isGameOver: true,
      }));
      alert(message);
      return;
    } else{
      // O players turn (computer)
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
      // setIsGameOver(true);
      setGameState(prevState => ({
        ...prevState,
        isGameOver: true,
      }));
      alert(winningMessage);
      return;
    };
    // setGamePiece(tempToken === "X" ? "O" : "X"); 
    if (isBoardFull(newArray)) {
      let message = "Board is Full, Cat's Game";
      console.log(message);
      // setIsGameOver(true);
      setGameState(prevState => ({
        prevState,
        isGameOver: true,
      }));
      alert(message);
      return;
    }
    setGameState(prevState=>({
      ...prevState,
      gamePiece: tempToken === "X" ? "O" : "X",
    }))
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
          handleSubmit={handleSubmit}
          />
        : 
          <GameOver handleGameResetSubmit={handleGameResetSubmit} />
        }
      </main>
    </div>
  );
}

export default App;
