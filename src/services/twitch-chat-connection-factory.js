const tmi = require("tmi.js");

export default class TwitchChatConnectionFactory {

    createClient = () => {
        return new tmi.client({
            connection: {
                secure: true,
                reconnect: true
            },
            channels: [ process.env.TWITCH_CHANNEL ]
        });
    }

}