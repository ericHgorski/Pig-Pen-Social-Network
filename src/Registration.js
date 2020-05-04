import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
                <h3>Registration</h3>
                {this.state.error && <div>Oops something went wrong!</div>}
                <input
                    name="first"
                    autoComplete="off"
                    placeholder="first"
                    type="text"
                />
                <input
                    name="last"
                    autoComplete="off"
                    placeholder="last"
                    type="text"
                />
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
                    Register
                </button>
                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}
