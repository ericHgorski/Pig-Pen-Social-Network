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
    flexItem: {
        marginTop: "30px",
    },
    button: {
        marginTop: "5px",
        textDecoration: "none",
    },
    tagLine: {
        fontStyle: "italic",
        color: "hotpink",
        marginTop: "10px",
    },
    header: {
        color: "black",
        textShadow: "1px 1px 1px hotpink",
    },
}));

export default function Login() {
    const [error, setError] = useState(false);
    const [fields, setFields] = useState({});
    const classes = useStyles();

    const handleChange = ({ target }) => {
        setFields({ ...fields, [target.name]: target.value });
    };

    const submitLogin = () => {
        axios.post("/login", fields).then(({ data }) => {
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
                Welcome to Pig Pen
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
                name="email"
                autoComplete="off"
                placeholder="Email"
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
                onClick={submitLogin}
            >
                Login
            </Button>
            <Link to="/" className={classes.button}>
                <Button> Register</Button>
            </Link>
            <Link to="/reset/start" className={classes.button}>
                <Button>Forgot your password?</Button>
            </Link>
        </div>
    );
}
