import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("uploader mounted!");
    }

    methodInUploader() {
        this.props.uploadPic();
    }
    handleChange(e) {
        // Selects the file that was just uploaded.
        console.log("handleChange has been called");
        this.file = e.target.files[0];
    }
    render() {
        return (
            <div>
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                />
                <button className="button" onClick={this.props.uploadPic}>
                    UPLOAD
                </button>
            </div>
        );
    }
}
