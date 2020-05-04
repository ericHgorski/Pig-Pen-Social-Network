import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
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
                className="login-container"
            >
                <h3>Login</h3>
                {this.state.error && <div>Oops something went wrong!</div>}
                <input
                    name="email"
                    autoComplete="off"
                    placeholder="email"
                    type="email"
                />
                <input
                    name="password"
                    autoComplete="off"
                    placeholder="password"
                    type="password"
                />
                <button className="button" onClick={() => this.submit()}>
                    Login
                </button>
                <Link to="/">Click here to Register</Link>
                <Link to="/reset">Click here to reset your password</Link>
            </div>
        );
    }
}
