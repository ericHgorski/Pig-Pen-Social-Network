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
    setPhoto(arg) {
        this.userInfo.image_url.setState({ image_url: arg });
    }

    render() {
        const { first, last, image_url } = this.state.userInfo;
        console.log("image_url :>> ", image_url);
        return (
            <div>
                <h1>Welcome to your user profile.</h1>
                <button className="button" onClick={() => this.toggleModal()}>
                    Change profile picture.
                </button>

                <ProfilePic first={first} last={last} image_url={image_url} />

                {this.state.uploaderIsVisible && (
                    <Uploader
                        toggleModal={this.toggleModal}
                        setPhoto={this.setPhoto}
                    />
                )}
            </div>
        );
    }
}
