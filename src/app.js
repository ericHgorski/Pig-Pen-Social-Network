import React, { Component } from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Logout from "./logout";
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            editingMode: false,
        };
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

    saveBio(text) {
        console.log("bioText in save bio in app js:>> ", text);
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                bio: text,
            },
        });
    }

    render() {
        return (
            <BrowserRouter>
                <>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                userInfo={this.state.userInfo}
                                toggleUploader={() => this.toggleUploader()}
                                saveBio={(text) => this.saveBio(text)}
                            />
                        )}
                    />
                    <Route exact path="/user/:id" component={OtherProfile} />

                    {this.state.uploaderIsVisible && (
                        <Uploader setImage={(url) => this.setImage(url)} />
                    )}
                    <Logout />
                </>
            </BrowserRouter>
        );
    }
}
