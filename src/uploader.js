import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

import axios from "./axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }

    handleChange(e) {
        this.setState({
            file: e.target.files[0],
        });
    }

    uploadPic() {
        // FormData required because of file upload.
        var formData = new FormData();
        formData.append("file", this.state.file);

        // Axios post request to send image data as response to be rendered by change to data images array.
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                this.props.setImage(data.image_url);
            })
            .catch((err) => {
                console.log("error in post /upload: ", err);
            });
    }

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    border: "pink dotted 3px",
                    padding: "30px",
                }}
            >
                <input
                    style={{ width: "300px" }}
                    type="file"
                    name="file"
                    accept="image/*"
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    className="button"
                    onClick={(e) => this.uploadPic(e)}
                >
                    UPLOAD
                </Button>
            </div>
        );
    }
}
