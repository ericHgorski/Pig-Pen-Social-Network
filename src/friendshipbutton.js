import React, { useState, useEffect } from "react";
import axios from "./axios";
import Button from "@material-ui/core/Button";

export default function FriendshipButton({ otherId }) {
    const [buttonText, setButtonText] = useState("");

    // On mounting, get proper button display text from data base and set it.
    useEffect(() => {
        console.log("The butt has mounted.");
        axios
            .get(`/api/friend-status/${otherId}`)
            .then(({ data }) => {
                setButtonText(data.text);
            })
            .catch((err) => {
                console.log("Error in friend-status axios get request: ", err);
            });
    }, []);
    // On button press, send current buttonText to route and determine response, and set new button text.
    function submit() {
        axios
            .post(`/api/friendship/${otherId}`, {
                text: buttonText,
            })
            .then(({ data }) => {
                setButtonText(data.text);
            })
            .catch((err) => {
                console.log("Error in axios.post /friendship: ", err);
            });
    }
    // useEffect(() => {
    //     console.log("buttonText :>> ", buttonText);
    //     console.log(buttonText == "UNFRIEND" ? "secondary" : "secondary");

    //     if (!buttonText) {
    //         return null;
    //     }
    // }, []);

    // FIGURE OUT WAY TO MAKE BUTTON COLOR CHANGE DEPENDING ON BUTTON TEXT
    return (
        <div>
            <Button
                // color={buttonText == "unfriend" ? "secondary" : "primary"}
                onClick={submit}
            >
                {buttonText}
            </Button>
        </div>
    );
}
