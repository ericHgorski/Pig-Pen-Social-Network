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
    login: {
        marginTop: "5px",
        textDecoration: "none",
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
            <Logo />

            <Typography variant="h2">Register</Typography>
            {error && (
                <Typography color="error">
                    Oops something went wrong!
                </Typography>
            )}
            <Input
                className={classes.flexItem}
                name="first"
                autoComplete="off"
                placeholder="first name"
                type="text"
            />
            <Input
                className={classes.flexItem}
                name="last"
                autoComplete="off"
                placeholder="last name"
                type="text"
            />
            <Input
                className={classes.flexItem}
                name="email"
                autoComplete="off"
                placeholder="email address"
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
