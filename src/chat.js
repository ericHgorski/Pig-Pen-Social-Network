import React, { useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import ReactEmoji from "react-emoji";

const useStyles = makeStyles(() => ({
    chatBox: {
        overflowY: "scroll",
        height: "400px",
        border: "black solid 2px",
        margin: "20px",
        padding: "10px",
    },
    chatHeader: {
        border: "1px solid grey",
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: "#F786AA",
    },
    chatContainer: {
        border: "1px solid grey",
        display: "flex",
    },
    newMessageText: {
        resize: "none",
        width: "300px",
        height: "150px",
        display: "flex",
        justifyContent: "center",
    },
    avatar: {
        marginRight: "5px",
    },
    header: {
        display: "flex",
        justifyContent: "center",
    },
    timestamp: {
        color: "grey",
        fontSize: "14px",
    },
    names: {
        marginRight: "5px",
        color: "white",
    },
    newMessageTextContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
}));

export default function Chat() {
    const elemRef = useRef();
    const classes = useStyles();
    const publicChatMessages = useSelector(
        (state) => state && state.publicChatMessages
    );
    // Send new message on enter key and ensure that message has non white-space content
    const keyCheck = (e) => {
        if (e.key == "Enter" && e.target.value.replace(/\s/g, "").length > 0) {
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
            <Typography className={classes.header} variant="h1">
                OINK ROOM
            </Typography>
            <div className={classes.chatBox} ref={elemRef}>
                {publicChatMessages &&
                    publicChatMessages.map((user) => (
                        <div key={user.message_id}>
                            <div className={classes.chatHeader}>
                                <Avatar
                                    className={classes.avatar}
                                    src={user.image_url}
                                />
                                <Typography
                                    className={classes.names}
                                    variant="h5"
                                >
                                    {user.first} {user.last}
                                </Typography>
                                <Typography
                                    className={classes.timestamp}
                                    variant="h6"
                                >
                                    {" (" +
                                        user.created_at.slice(11, 19) +
                                        " on "}
                                    {" " + user.created_at.slice(5, 10) + ")"}
                                </Typography>
                            </div>
                            <div className={classes.chatContainer}>
                                <Typography variant="h5">
                                    {ReactEmoji.emojify(user.chat_message)}
                                </Typography>
                            </div>
                        </div>
                    ))}
            </div>
            <div className={classes.newMessageTextContainer}>
                <textarea
                    className={classes.newMessageText}
                    onKeyDown={keyCheck}
                    placeholder="Write a new message"
                ></textarea>
                <Button color="primary" onClick={keyCheck}>
                    SEND
                </Button>
            </div>
        </>
    );
}
