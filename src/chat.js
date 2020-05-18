import React, { useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    chatBox: {
        overflowY: "scroll",
        height: "200px",
        border: "black solid 2px",
    },
}));

export default function Chat() {
    const elemRef = useRef();
    const classes = useStyles();
    const publicChatMessages = useSelector(
        (state) => state && state.publicChatMessages
    );

    console.log("publicChatMessages :>> ", publicChatMessages);

    const keyCheck = (e) => {
        console.log("e.key :>> ", e.key);
        if (e.key == "Enter") {
            e.preventDefault();
            socket.emit("newPublicChatMessage", e.target.value);
            e.target.value = "";
        }
    };
    // Automatically scroll to bottom of chat box for most recent messages
    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    });

    return (
        <>
            <Typography variant="h1">CHAT</Typography>
            <div className={classes.chatBox} ref={elemRef}>
                {publicChatMessages &&
                    publicChatMessages.map((user) => (
                        <div key={user.message_id}>
                            <Avatar src={user.image_url}></Avatar>
                            <Typography variant="h5">
                                {user.first} {user.last}: {user.chat_message}
                            </Typography>
                        </div>
                    ))}
            </div>
            <textarea
                id="chat-box"
                onKeyDown={keyCheck}
                placeholder="Write a new message"
            ></textarea>
        </>
    );
}
