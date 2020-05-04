import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Logout extends React.Component {
    constructor() {
        super();
    }

    submit() {
        axios.post("/logout", this.state).then(() => {
            console.log("button clicked");
            location.replace("/Welcome");
        });
    }

    render() {
        return (
            <button className="button" onClick={() => this.submit()}>
                Logout
            </button>
        );
    }
}
