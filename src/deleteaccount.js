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
}));

export default function DeleteAccount() {
    const classes = useStyles();
    async function deleteAccount() {
        try {
            const { data } = await axios.get("/delete-account");
            console.log("data from delete account :>> ", data);
        } catch (err) {
            console.log("Error in axios/get/delete-account: ", err);
        }
    }

    return (
        <>
            <Button className={classes.deleteButton} color="secondary">
                DELETE MY ACCOUNT
            </Button>
        </>
    );
}
