import React from "react";
import "./GameBoard.css";

function GameBoard({playerMovesArray, onCellClick}) {
  console.log(playerMovesArray);
  // const row1 = playerMovesArray.slice(0,3).join(" ");
  // const row2 = playerMovesArray.slice(3,6).join(" ");
  // const row3 = playerMovesArray.slice(6,9).join(" ");
  // console.log(playerMovesArray);
  return (
    <div id="gameBoard">
        {/* <p>{row1}</p>
        <p>{row2}</p>
        <p>{row3}</p> */}

        {playerMovesArray.map((cellValue, index) => (
          <div
          key={index}
          className="game-cell"
          onClick={() => onCellClick(index)}>
            {cellValue !== "-" ? cellValue:"-"}
          </div>
        ))}
      </div>
  )

}

export default GameBoard;