import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super();
        this.state = {
            file: null,
        };
        console.log("props :>> ", props);
        console.log("this.state :>> ", this.state);
    }

    componentDidMount() {
        console.log("uploader mounted!");
    }

    handleChange(e) {
        console.log("e.target.files[0] :>> ", e.target.files[0]);
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
                console.log("props in uploadpic :>> ", this.props);
                console.log("data :>> ", data.image_url);
                this.props.setPhoto(data.image_url);
                this.props.toggleModal();
            })
            .catch(function (err) {
                console.log("error in post /upload: ", err);
            });
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
                <button className="button" onClick={(e) => this.uploadPic(e)}>
                    UPLOAD
                </button>
            </div>
        );
    }
}
