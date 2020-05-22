import React, { useState, useEffect } from "react";
import axios from "./axios";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    deleteButton: {
        position: "fixed",
        bottom: "0",
        right: "0",
    },
    link: {
        textDecoration: "none",
        color: "red",
    },
}));

export default function DeleteAccount() {
    const classes = useStyles();

    function deleteAccount() {
        alert("Your account was successfully deleted. Click 'OK' to continue.");
        axios
            .get("/delete-account")
            .then(({ data }) => {
                if (data.success) {
                    console.log("successful account deletion.");
                }
            })
            .catch((err) => {
                console.log(
                    "There was an error when trying to delete your account: ",
                    err
                );
            });
    }

    return (
        <>
            <Button
                onClick={deleteAccount}
                className={classes.deleteButton}
                color="secondary"
            >
                <a className={classes.link} href="/logout">
                    DELETE MY ACCOUNT
                </a>
            </Button>
        </>
    );
}
