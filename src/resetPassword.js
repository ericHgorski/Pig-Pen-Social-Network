import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            error: false,
            mailError: false,
            codeError: false,
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitEmail() {
        axios.post("/reset/start", this.state).then(({ data }) => {
            if (data.success == true) {
                this.setState({ step: 2 });
            } else if (data.noEmailFound) {
                this.setState({ mailError: true });
            } else {
                this.setState({ error: true });
            }
        });
    }
    submitResetCode() {
        axios.post("/reset/verify", this.state).then(({ data }) => {
            if (data.success == true) {
                this.setState({ step: 3 });
            } else {
                this.setState({ codeError: true });
            }
        });
    }

    render() {
        return (
            <div>
                <h1>RESET</h1>
                {this.state.step == 1 && (
                    <div onChange={(e) => this.handleChange(e)}>
                        <input
                            name="email"
                            placeholder="email"
                            type="email"
                        ></input>
                        <button
                            className="button"
                            onClick={() => this.submitEmail()}
                        >
                            Submit
                        </button>
                        <Link to="/login">Login</Link>
                        {this.state.error && <div>Something went wrong!</div>}
                        {this.state.mailError && (
                            <div>This email was not found.</div>
                        )}
                    </div>
                )}
                {this.state.step == 2 && (
                    <div onChange={(e) => this.handleChange(e)}>
                        <input
                            name="resetCode"
                            autoComplete="off"
                            placeholder="reset code"
                            type="text"
                        ></input>
                        <input
                            name="newPassword"
                            autoComplete="off"
                            placeholder="password"
                            type="text"
                        ></input>
                        <button
                            className="button"
                            onClick={() => this.submitResetCode()}
                        >
                            Submit
                        </button>
                        {this.state.codeError && (
                            <div>The code you entered was invalid.</div>
                        )}
                    </div>
                )}
                {this.state.step == 3 && (
                    <div>
                        <p>That worked great!</p>
                        <Link to="/login">
                            You can now login with your updated password
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}
