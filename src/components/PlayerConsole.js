import React from "react";
// gamePiece,computerThinking,handleSubmit,position, setPosition
function PlayerConsole({ gameState, setGameState, computerThinking, handleSubmit}) {
  return (
    <div id="playerConsole">
        <h2>playerConsole</h2>
        <p>It's {gameState.gamePiece}'s move. {!computerThinking ? "" : "Computer Thinking"} </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="position">Position 1-9</label>
          <input 
          type="text"
          value={gameState.position}
          id="position"
          onChange={(e) => setGameState(
            prevState =>({
              ...prevState,
              position: e.target.value,
            })
          )}
          />
          <button>End Turn</button>
        </form>
      </div>
  )
}

export default PlayerConsole;