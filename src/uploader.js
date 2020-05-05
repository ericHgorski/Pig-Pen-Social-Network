import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader mounted");
    }

    render() {
        return (
            <div>
                <h2>uploader Component</h2>
            </div>
        );
    }
}
