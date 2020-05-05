import React from "react";

export default class Logout extends React.Component {
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
