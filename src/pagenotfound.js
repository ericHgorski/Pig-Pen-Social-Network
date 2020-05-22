import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    notFoundContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
    },
    button: {
        textDecoration: "none",
        color: "white",
    },
}));

export default function PageNotFound() {
    const classes = useStyles();

    return (
        <div className={classes.notFoundContainer}>
            <Typography variant="h2">404</Typography>
            <Typography variant="h4">We could not find that page.</Typography>

            <Button variant="contained" color="primary">
                <Link to="/" className={classes.button}>
                    Go back to your profile
                </Link>
            </Button>
        </div>
    );
}
