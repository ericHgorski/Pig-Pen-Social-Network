import React, { Component } from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Logout from "./logout";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            editingMode: false,
        };
        this.setImage = this.setImage.bind(this);
    }

    async componentDidMount() {
        const { data } = await axios.get("/user", this.state);
        this.setState({ userInfo: data });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }
    setImage(imgUrl) {
        this.setState({
            uploaderIsVisible: false,
            userInfo: {
                ...this.state.userInfo,
                image_url: imgUrl,
            },
        });
    }

    saveBio(bioText) {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                bio: bioText,
            },
        });
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <>
                        <h1>Welcome to your user profile.</h1>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    userInfo={this.state.userInfo}
                                    last={this.state.last}
                                    imageUrl={this.state.imageUrl}
                                    toggleUploader={() => this.toggleUploader()}
                                    saveBio={() => this.saveBio()}
                                    bio={this.state.bio}
                                />
                            )}
                        />

                        {this.state.uploaderIsVisible && (
                            <Uploader
                                toggleUploader={this.toggleUploader}
                                setImage={this.setImage}
                            />
                        )}
                        <Logout />
                    </>
                </BrowserRouter>
            </>
        );
    }
}
