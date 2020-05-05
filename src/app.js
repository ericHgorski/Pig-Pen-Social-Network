import React from "react";
import axios from "./axios";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            userInfo: {},
        };
    }

    componentDidMount() {
        axios.get("/user", this.state).then(({ data }) => {
            this.setState({ userInfo: data });
        });
    }

    toggleModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    uploadPic() {
        // FormData required because of file upload.
        var formData = new FormData();
        formData.append("file", this.file);

        // Axios post request to send image data as response to be rendered by change to data images array.
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                console.log("data from uploadPic :>> ", data);
                this.userInfo.setState({ image_url: data });
            })
            .catch(function (err) {
                console.log("error in post /upload: ", err);
            });
    }

    render() {
        const { first, last, imageUrl } = this.state.userInfo;
        return (
            <div>
                <h1>Welcome to your user profile.</h1>
                <button className="button" onClick={() => this.toggleModal()}>
                    Change profile picture.
                </button>

                <ProfilePic first={first} last={last} imageUrl={imageUrl} />

                {this.state.uploaderIsVisible && (
                    <Uploader methodInApp={this.methodInApp} />
                )}
            </div>
        );
    }
}
