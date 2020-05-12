import React, { useState, useEffect } from "react";
import axios from "./axios";
import Button from "@material-ui/core/Button";

export default function FriendshipButton({ otherId }) {
    const [buttonText, setButtonText] = useState("");
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
    return (
        <div>
            <Button onClick={submit}>{buttonText}</Button>
        </div>
    );
}
