import React, { Component } from "react";
import axios from "./axios";
import Uploader from "./Uploader";
import Profile from "./Profile";
import Chat from "./Chat";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import Friends from "./Friends";
import Navbar from "./Navbar";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
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
                    <Navbar />

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                userInfo={this.state.userInfo}
                                uploaderStatus={this.state.uploaderIsVisible}
                                toggleUploader={() => this.toggleUploader()}
                                saveBio={(text) => this.saveBio(text)}
                            />
                        )}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader setImage={(url) => this.setImage(url)} />
                    )}
                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />
                    <Route path="/users" render={() => <FindPeople />} />
                    <Route path="/friends" render={() => <Friends />} />
                    <Route path="/chat" render={() => <Chat />} />
                </>
            </BrowserRouter>
        );
    }
}
