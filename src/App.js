import React, { useState } from "react";
import "./App.css";
// Lines 5-8: Bring in chessboard and chess.js stuff
import Chessboard from "chessboardjsx";
const Chess = require("chess.js");


const App = () => {

  const [nextMovePlayer, setNextMovePlayer] = useState('b');

  const [gameIsOver, setGameIsOver] = useState(false);
  
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move) => {
    if (chess.move(move)) {
      setFen(chess.fen());
    }

    if (chess.game_over()) {
      handleGameOver();
    }

  };

  const handleGameOver = () => {
    if (chess.game_over()) {
      setGameIsOver(true);
      setNextMovePlayer(chess.turn());
    }
  }

  return (
    <div className="flex-center">
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })
        }
      />
      <div class="panel panel-default">
        <div class="panel-heading">
          <b>Game is Over</b>
        </div>

        <div class="panel-body">
          Panel content
        </div>
      </div>
    </div>
  );
}

export default App;