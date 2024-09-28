import React from "react";
// gamePiece,computerThinking,handleSubmit,position, setPosition
function PlayerConsole({ gameState, setGameState, computerThinking, handleSubmit}) {
  return (
    <div id="playerConsole">
      <p>It's {gameState.gamePiece}'s move. {!computerThinking ? "" : "Computer Thinking"} </p>    
      <p>Click a Square</p>
    </div>
  )
}

export default PlayerConsole;