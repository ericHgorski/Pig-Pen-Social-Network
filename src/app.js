import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Logout from "./logout";
import Profile from "./profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            userInfo: {},
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.setPhoto = this.setPhoto.bind(this);
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
        console.log("...this.state in app render", { ...this.state });
        return (
            <div>
                <h1>Welcome to your user profile.</h1>
                <button className="button" onClick={() => this.toggleModal()}>
                    Change picture.
                </button>

                <Profile
                    // onClick={this.toggleModal}
                    userInfo={{ ...this.state.userInfo }}
                    // image_url={image_url}
                    // toggleModal={this.toggleModal}
                />

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
