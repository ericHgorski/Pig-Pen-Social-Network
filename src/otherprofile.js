import PageNotFound from "./pagenotfound.js";
import FriendshipButton from "./friendshipbutton.js";
import axios from "./axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
    flexContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        margin: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    avatar: {
        width: "400px",
        height: "400px",
    },
    bio: {
        width: "400px",
    },
}));

export default function OtherProfile(props) {
    const [userInfo, setUserInfo] = useState({});
    const [userNotFound, setUserNotFound] = useState("");
    const classes = useStyles();

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
        <div className={classes.flexContainer}>
            {userNotFound && <PageNotFound />}

            {!userNotFound && (
                <div className="profile">
                    <Typography variant="h2">
                        {first} {last}
                    </Typography>
                    <Typography className={classes.bio} variant="h5">
                        {bio}
                    </Typography>
                    <img width="300" src={image_url || "../default.png"}></img>
                    <FriendshipButton otherId={props.match.params.id} />
                </div>
            )}
        </div>
    );
}
