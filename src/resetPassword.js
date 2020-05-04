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
            console.log("data :>> ", data);
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
            <div onChange={(e) => this.handleChange(e)}>
                {this.state.step == 1 && (
                    <div>
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
