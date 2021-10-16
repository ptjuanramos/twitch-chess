export default class TwitchChatMessageHandler {

    getMove = (message) => {
        let move = message.split(",");
        
        if(!move && move.length !== 2)
            return null;
        
        return { from: move[0], to: move[1] };
    }

    isMessageAMove = (message, moveValidator) => {
        let move = this.getMove(message);
        if (move) {
            return moveValidator(move);
        }

        return false;
    }

    connect = (client) => {
        client.connect();
        return this;
    }

    handleMove = (client, moveHandler, moveValidator) => {
        if (client) {
            client.on("message", (channel, tags, message, self) => {
                let isCorrectChannel = channel === "#ptjuanramos";

                if (self) return;
                if (isCorrectChannel && this.isMessageAMove(message, moveValidator)) {
                    moveHandler(this.getMove(message));
                }
            });
        }
    }

}