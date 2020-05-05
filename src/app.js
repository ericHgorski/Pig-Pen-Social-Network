import React from "react";
import Presentational from "./presentational";
import Uploader from "./uploader";
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("app mounted");

        // get info with axios request /user and add to state
    }
    render() {
        return (
            <div>
                <h1>Hello from app</h1>
                <Presentational />
                <Uploader />
            </div>
        );
    }
}
