import React, { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import LogoBig from "./logoBig";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    flexContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        margin: "20px",
    },
    "& input:invalid": {
        border: "2px dashed red",
    },
    flexItem: {
        marginTop: "30px",
    },
    tagLine: {
        color: "hotpink",
        marginTop: "10px",
        fontSize: "15px",
    },
    login: {
        marginTop: "5px",
        textDecoration: "none",
    },
    header: {
        color: "black",
        fontWeight: "lighter",
    },
}));

export default function Registration() {
    const [error, setError] = useState(false);
    const [fields, setFields] = useState({});
    const classes = useStyles();

    const handleChange = ({ target }) => {
        setFields({ ...fields, [target.name]: target.value });
    };

    const submitRegistration = () => {
        axios.post("/register", fields).then(({ data }) => {
            if (data.success) {
                location.replace("/");
            } else {
                setError(true);
            }
        });
    };

    return (
        <div
            onChange={(e) => handleChange(e)}
            className={classes.flexContainer}
        >
            <LogoBig />

            <Typography className={classes.header} variant="h2">
                Join Pig Pen
            </Typography>
            <Typography className={classes.tagLine} variant="h6">
                Where Friends of Pigs go Hog Wild
            </Typography>
            {error && (
                <Typography color="error">
                    Oops something went wrong!
                </Typography>
            )}
            <Input
                className={classes.flexItem}
                name="first"
                autoComplete="off"
                placeholder="First name"
                type="text"
            />
            <Input
                className={classes.flexItem}
                name="last"
                autoComplete="off"
                placeholder="Last name"
                type="text"
            />
            <Input
                className={classes.flexItem}
                name="email"
                autoComplete="off"
                placeholder="Email address"
                type="email"
            />
            <Input
                className={classes.flexItem}
                name="password"
                autoComplete="off"
                placeholder="Password"
                type="password"
            />
            <Button
                className={classes.flexItem}
                variant="contained"
                color="primary"
                onClick={submitRegistration}
            >
                Register
            </Button>
            <Link to="/login" className={classes.login}>
                <Button>Login</Button>
            </Link>
        </div>
    );
}
