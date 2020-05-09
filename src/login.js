import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
                <h3>Login</h3>
                {this.state.error && <div>Oops something went wrong!</div>}
                <input
                    name="email"
                    autoComplete="off"
                    placeholder="email"
                    type="email"
                />
                <br></br>
                <input
                    name="password"
                    autoComplete="off"
                    placeholder="password"
                    type="password"
                />
                <br></br>
                <button className="button" onClick={() => this.submit()}>
                    Login
                </button>
                <br></br>
                <Link to="/">Register</Link>
                <br></br>
                <Link to="/reset/start">Reset your password</Link>
            </div>
        );
    }
}
