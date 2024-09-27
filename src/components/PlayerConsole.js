import React from "react";

function PlayerConsole({gamePiece,computerThinking,handleSubmit,position, setPosition}) {
  return (
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
  )
}

export default PlayerConsole;