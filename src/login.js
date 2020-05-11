import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit() {
        axios.post("/login", this.state).then(({ data }) => {
            if (data.success == true) {
                location.replace("/");
            } else {
                this.setState({
                    error: true,
                });
            }
        });
    }

    render() {
        return (
            <div
                onChange={(e) => this.handleChange(e)}
                className="reg-container"
            >
                <Typography variant="h3">Login</Typography>
                {this.state.error && (
                    <Typography color="error">
                        Oops something went wrong!
                    </Typography>
                )}
                <Input
                    name="email"
                    autoComplete="off"
                    placeholder="email"
                    type="email"
                />
                <Input
                    name="password"
                    autoComplete="off"
                    placeholder="password"
                    type="password"
                />
                <Button
                    variant="contained"
                    color="primary"
                    className="button"
                    onClick={() => this.submit()}
                >
                    Login
                </Button>
                <Button variant="contained">
                    <Link to="/">Register</Link>
                </Button>

                <Button variant="contained">
                    <Link to="/reset/start">Reset your password</Link>
                </Button>
            </div>
        );
    }
}
