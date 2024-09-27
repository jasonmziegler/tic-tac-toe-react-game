import React from "react";

function GameOver({handleGameResetSubmit}) {
  return (
    <div id="gameOver"> 
      <h2>GameOver</h2>
      <button onClick={handleGameResetSubmit}>Reset Game, Play Again?</button>
    </div>
  )
}

export default GameOver;
