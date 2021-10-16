import React, { useState, useEffect } from "react";

import Chessboard from "chessboardjsx";
import TwitchChatConnectionFactory from "../services/twitch-chat-connection-factory";
import TwitchChatMessageHandler from "../services/twitch-chat-message-handler";

const Chess = require("chess.js");

const connectionFactory = new TwitchChatConnectionFactory();
const chatMessageHandler = new TwitchChatMessageHandler();

const ReactiveChessBoard = () => {
    const [client, setClient] = useState(null);
    const [nextMovePlayer, setNextMovePlayer] = useState('b');
    const [gameIsOver, setGameIsOver] = useState(false);

    const [chess] = useState(new Chess());
    const [fen, setFen] = useState(chess.fen());
    

    useEffect(() => {
        setClient(connectionFactory.createClient());
    }, []);

    useEffect(() => {
        if (client) {
            chatMessageHandler.connect(client);

            chatMessageHandler
                .handleMove(client, moveHandler, (move) => true); // change lambda function after PR approval in chess.js
        }
    }, [client]);

    const moveHandler = (move) => {
        if (chess.move(move)) {
            setFen(chess.fen());
        }

        handleGameOver();
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
                    moveHandler({
                        from: move.sourceSquare,
                        to: move.targetSquare,
                        promotion: "q",
                    })
                }
            />
            <div class="panel panel-default">
                <div className="panel-heading">
                    <b>Game is Over</b>
                </div>
            </div>
        </div>
    );
}

export default ReactiveChessBoard;