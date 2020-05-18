import * as io from "socket.io-client";

import { recentPublicChat, addPublicMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("recentPublicChat", (msgs) => {
            store.dispatch(recentPublicChat(msgs));
        });

        socket.on("addPublicChatMessage", (msg) => {
            store.dispatch(addPublicMessage(msg));
        });
    }
};
// when user preses enter key, emit information to the server, and do a database insert
