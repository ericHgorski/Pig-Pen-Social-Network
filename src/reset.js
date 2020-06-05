import React, { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LogoBig from "./LogoBig";

const useStyles = makeStyles(() => ({
    flexContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        margin: "20px",
        justifyContent: "center",
        height: "60vh",
    },
    flexItem: {
        marginTop: "30px",
    },
    button: {
        marginTop: "20px",
        textDecoration: "none",
    },
    header: {
        color: "black",
        // textShadow: "1px 1px 1px hotpink",
        fontWeight: "lighter",
    },
}));

export default function ResetPassword() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState(false);
    const [mailError, setMailError] = useState(false);
    const [codeError, setCodeError] = useState(false);
    const [fields, setFields] = useState({});
    const classes = useStyles();

    const handleChange = ({ target }) => {
        setFields({ ...fields, [target.name]: target.value });
    };

    const submitEmail = () => {
        axios.post("/reset/start", fields).then(({ data }) => {
            if (data.success) {
                setStep(2);
            } else if (data.noEmailFound) {
                setMailError(true);
            } else {
                setError(true);
            }
        });
    };

    const submitResetCode = () => {
        axios.post("/reset/verify", fields).then(({ data }) => {
            if (data.success) {
                setStep(3);
            } else {
                setCodeError(true);
            }
        });
    };

    return (
        <>
            {step == 1 && (
                <div
                    className={classes.flexContainer}
                    onChange={(e) => handleChange(e)}
                >
                    <LogoBig />

                    <Typography className={classes.header} variant="h2">
                        Reset Your Password
                    </Typography>

                    <Input
                        className={classes.flexItem}
                        name="email"
                        placeholder="Your email"
                        type="email"
                    ></Input>
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.button}
                        onClick={submitEmail}
                    >
                        Submit
                    </Button>
                    <Link className={classes.button} to="/login">
                        <Button>Login</Button>
                    </Link>
                    {error && (
                        <Typography color="error">
                            Something went wrong!
                        </Typography>
                    )}
                    {mailError && (
                        <Typography color="error">
                            This email was not found.
                        </Typography>
                    )}
                </div>
            )}
            {step == 2 && (
                <div
                    className={classes.flexContainer}
                    onChange={(e) => handleChange(e)}
                >
                    <LogoBig />
                    <Typography variant="h3">Enter Your Reset Code</Typography>
                    <Input
                        className={classes.flexItem}
                        name="resetCode"
                        autoComplete="off"
                        placeholder="reset code"
                        type="text"
                    ></Input>
                    <Input
                        className={classes.flexItem}
                        name="newPassword"
                        autoComplete="off"
                        placeholder="your new password"
                        type="text"
                    ></Input>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        onClick={submitResetCode}
                    >
                        SUBMIT
                    </Button>
                    {codeError && (
                        <Typography color="error">
                            The code you entered was invalid.
                        </Typography>
                    )}
                </div>
            )}
            {step == 3 && (
                <div className={classes.flexContainer}>
                    <Typography variant="h2">Success!</Typography>
                    <Link to="/login" className={classes.button}>
                        <Button color="primary" variant="contained">
                            Login with your new password
                        </Button>
                    </Link>
                </div>
            )}
        </>
    );
}
