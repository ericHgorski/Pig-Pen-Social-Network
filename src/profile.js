import React from "react";
import ProfilePic from "./profilepic";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        console.log("props in profile component:", props);
        console.log("this.props", this.props);
    }

    componentDidMount() {
        console.log("props in component did mount", this.props);
    }

    render() {
        return (
            <>
                <h1>Profile component</h1>
                {/* <ProfilePic first={first} last={last} image_url={image_url} /> */}
            </>
        );
    }
}
