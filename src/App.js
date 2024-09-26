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
  

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Form Submitted, Player played a turn");
    let index = position - 1;

    // check for valid input
    if (position < 0 || position > 9 ) {
      alert("Please choose position 1 - 9");
      setPosition("");
      return;
    }

    if (playerMovesArray[index] !== "-") {
      alert("Space taken, please choose and empty space.");
      setPosition("");
      return;
    }
    let newArray = [...playerMovesArray];

    // don't need splice can just set array directly with index
    //newArray.splice(index, 1, gamePiece);
    newArray[index] = gamePiece;
    setPlayerMovesArray(newArray);
    setPosition("");
    setGamePiece(gamePiece === "X" ? "O" : "X");
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
        <p>It's {gamePiece}'s move. </p>
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
