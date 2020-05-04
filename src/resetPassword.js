import React from "react";
import axios from "./axios";

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
        axios.post("/reset", this.state).then(({ data }) => {
            console.log("data :>> ", data.success);
            // if (data.success == true) {
            //     location.replace("/");
            // } else {
            //     this.setState({
            //         error: true,
            //     });
            // }
        });
    }

    render() {
        return (
            <div>
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
