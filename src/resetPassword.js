import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit() {
        axios.post("/reset/start", this.state).then((resp) => {
            console.log("resp :>> ", resp);
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
                            autoComplete="off"
                            placeholder="email"
                            type="email"
                        ></input>
                        <button
                            className="button"
                            onClick={() => this.submit()}
                        >
                            Submit
                        </button>
                        <Link to="/login">Login</Link>
                    </div>
                )}
            </div>
        );
    }
}

/* 

                {this.state.step == 2 && (
                    <div onChange={(e) => this.handleChange(e)}>
                        <input
                            name="email"
                            autoComplete="off"
                            placeholder="email"
                            type="email"
                        ></input>
                        <h1>STEP 2 BITCH</h1>
                        <button
                            className="button"
                            onClick={() => this.submit()}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
} */
