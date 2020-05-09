import React, { Component } from "react";

export default class Logout extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="logout-btn">
                <a href="/logout">Logout</a>
            </div>
        );
    }
}
