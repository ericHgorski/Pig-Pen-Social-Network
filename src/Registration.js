import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";
import Logo from "./logo";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

export default class Registration extends React.Component {
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
        axios.post("/register", this.state).then(({ data }) => {
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
                <Logo />

                <Typography variant="h2">Registration</Typography>
                {this.state.error && (
                    <Typography color="error">
                        Oops something went wrong!
                    </Typography>
                )}
                <Input
                    name="first"
                    autoComplete="off"
                    placeholder="FIRST"
                    type="text"
                />
                <Input
                    name="last"
                    autoComplete="off"
                    placeholder="LAST"
                    type="text"
                />
                <Input
                    name="email"
                    autoComplete="off"
                    placeholder="EMAIL"
                    type="email"
                />
                <Input
                    name="password"
                    autoComplete="off"
                    placeholder="PASSWORD"
                    type="password"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.submit()}
                >
                    Register
                </Button>
                <Link to="/login">
                    <Button variant="contained">Login</Button>
                </Link>
            </div>
        );
    }
}
