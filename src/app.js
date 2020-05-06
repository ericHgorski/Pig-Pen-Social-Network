import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Logout from "./logout";

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
    setPhoto(imgUrl) {
        this.setState({
            uploaderIsVisible: false,
            userInfo: {
                ...this.state.userInfo,
                image_url: imgUrl,
            },
        });
    }

    render() {
        const { first, last, image_url } = this.state.userInfo;
        return (
            <div>
                <h1>Welcome to your user profile.</h1>
                <button className="button" onClick={() => this.toggleModal()}>
                    Change picture.
                </button>
                <ProfilePic first={first} last={last} image_url={image_url} />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        toggleModal={this.toggleModal}
                        setPhoto={this.setPhoto}
                    />
                )}
                <Logout />
            </div>
        );
    }
}
