import React, { Component } from "react";
import PageNotFound from "./pagenotfound.js";
import FriendshipButton from "./friendshipbutton.js";
import axios from "./axios";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { userInfo: {}, userNotFound: false };
    }

    async componentDidMount() {
        const { data } = await axios.get(
            `/api/user/${this.props.match.params.id}`,
            this.state
        );
        // If logged in user tries to visit own profile, redirect to profile component
        if (this.props.match.params.id == data.loggedInUserId) {
            this.props.history.push("/");
        } else if (data.userNotFound) {
            this.setState({ userNotFound: true });
        } else {
            this.setState({ userInfo: data });
        }
    }

    render() {
        const { bio, image_url, first, last } = this.state.userInfo;
        return (
            <>
                {this.state.userNotFound && <PageNotFound />}
                <div className="profile">
                    <h2>
                        {first} {last}
                    </h2>
                    <p>{bio}</p>
                    <img src={image_url}></img>
                    <FriendshipButton otherId={this.props.match.params.id} />
                </div>
            </>
        );
    }
}

export default OtherProfile;
