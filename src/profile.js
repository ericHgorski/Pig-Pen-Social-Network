import React, { Component } from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import Typography from "@material-ui/core/Typography";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Wait for userInfo object to be set before rendering
    render() {
        if (!this.props.userInfo) {
            return null;
        }
        const { first, last, image_url, bio } = this.props.userInfo;
        return (
            <>
                <Typography variant="h2">
                    Hi there {first} {last}.
                </Typography>
                <ProfilePic
                    toggleUploader={this.props.toggleUploader}
                    first={first}
                    last={last}
                    image_url={image_url}
                />
                <BioEditor saveBio={this.props.saveBio} bio={bio} />
            </>
        );
    }
}
