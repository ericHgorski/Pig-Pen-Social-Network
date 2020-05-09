import React, { Component } from "react";
import axios from "./axios";

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { userInfo: {} };
    }

    async componentDidMount() {
        const { data } = await axios.get(
            `/api/user/${this.props.match.params.id}`,
            this.state
        );
        console.log("data :>> ", data);
        this.setState({ userInfo: data });
    }

    render() {
        const { bio, image_url, first, last } = this.state.userInfo;
        return (
            <>
                <div className="profile">
                    <h2>
                        {first} {last}
                    </h2>
                    <p>{bio}</p>
                    <img src={image_url}></img>
                </div>
            </>
        );
    }
}

export default OtherProfile;
