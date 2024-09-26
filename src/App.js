import { useEffect, useState } from "react";

function App() {
  let emptyArray = []
  function initArray(emptyArray) {
    for (let i=0; i<9; i++) {
      emptyArray.push(undefined);
    }
    return emptyArray;
  }
  emptyArray = initArray(emptyArray);

  let [playerMovesArray, setPlayerMovesArray] = useState(emptyArray);
  let [row1, setRow1] = useState("");
  let [row2, setRow2] = useState("");
  let [row3, setRow3] = useState("");
  let [position, setPosition] = useState(0);
  let [gamePiece, setGamePiece] = useState("O");
  console.log(playerMovesArray);
  
  useEffect( () => {
    setRow1(toString(playerMovesArray[0]) + " " + toString(playerMovesArray[1]) + " " + toString(playerMovesArray[2]));
  setRow2(toString(playerMovesArray[3]) + " " + toString(playerMovesArray[4]) + " " + toString(playerMovesArray[5]));
  setRow3(toString(playerMovesArray[6]) + " " + toString(playerMovesArray[7]) + " " + toString(playerMovesArray[8]));
  }, [playerMovesArray]);

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Form Submitted, Player played a turn");
    let index = position - 1;
    let newArray = [...playerMovesArray];

    newArray.splice(index, 1, gamePiece);
    setPlayerMovesArray(newArray);
  }
  
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="position">Position 1-9</label>
          <input 
          type="text"
          value={position}
          id="position"
          onChange={(e) => setPosition(e.target.value)}
          />
          <label htmlFor="gamePiece">gamePiece 1-9</label>
          <input 
          type="text"
          value={gamePiece}
          id="gamePiece"
          onChange={(e) => setGamePiece(e.target.value)}
          />
          <button>End Turn</button>
        </form>
      </div>
    </div>
  );
}

export default App;
