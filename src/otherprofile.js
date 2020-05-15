import PageNotFound from "./pagenotfound.js";
import FriendshipButton from "./friendshipbutton.js";
import axios from "./axios";
import React, { useState, useEffect } from "react";

export default function OtherProfile(props) {
    const [userInfo, setUserInfo] = useState({});
    const [userNotFound, setUserNotFound] = useState("");

    useEffect(() => {
        axios
            .get(`/api/user/${props.match.params.id}`, userInfo)
            .then(({ data }) => {
                // If logged in user tries to visit own profile, redirect to profile component
                if (props.match.params.id == data.loggedInUserId) {
                    props.history.push("/");
                } else if (data.userNotFound) {
                    setUserNotFound(true);
                } else {
                    setUserInfo(data);
                }
            });
    });

    const { bio, image_url, first, last } = userInfo;

    return (
        <>
            {userNotFound && <PageNotFound />}

            {!userNotFound && (
                <div className="profile">
                    <h2>
                        {first} {last}
                    </h2>
                    <p>{bio}</p>
                    <img src={image_url || "../default.png"}></img>
                    <FriendshipButton otherId={props.match.params.id} />
                </div>
            )}
        </>
    );
}
