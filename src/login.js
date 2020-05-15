import React, { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import Logo from "./logo";
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
            <Logo />
            <Typography variant="h2">Login</Typography>
            {error && (
                <Typography color="error">
                    Oops something went wrong!
                </Typography>
            )}
            <Input
                className={classes.flexItem}
                name="email"
                autoComplete="off"
                placeholder="email"
                type="email"
            />
            <Input
                className={classes.flexItem}
                name="password"
                autoComplete="off"
                placeholder="password"
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
