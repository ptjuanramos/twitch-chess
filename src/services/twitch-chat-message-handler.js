export default class TwitchChatMessageHandler {

    isMessageAMove = (message, moveValidator) => {
        let move = message.split(",");
        if (move && move.length === 2) {
            return moveValidator({ from: move[0], to: move[1] });
        }

        return false;
    }

    handleMove = (client, moveHandler, moveValidator) => {
        if (client) {
            client.on("message", (channel, tags, message, self) => {
                let isCorrectChannel = channel === process.env.TWITCH_CHANNEL;

                if (self) return;
                if (isCorrectChannel && this.isMessageAMove(message, moveValidator)) {
                    moveHandler(message);
                }
            });
        }
    }

}