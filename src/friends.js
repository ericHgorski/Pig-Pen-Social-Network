import React, { useEffect } from "react";
import { receiveWantToBeFriends } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import FriendshipButton from "./friendshipbutton";

export default function Friends() {
    const wantToBeFriends = useSelector(
        (state) =>
            state.wantToBeFriends &&
            state.wantToBeFriends.filter((user) => !user.accepted)
    );
    const alreadyFriends = useSelector(
        (state) =>
            state.wantToBeFriends &&
            state.wantToBeFriends.filter((user) => user.accepted)
    );

    const useStyles = makeStyles(() => ({
        user: {
            border: "1px black solid",
            width: "300px",
            "&:hover": {
                backgroundColor: "lightpink",
                opacity: "0.8",
            },
        },
        link: {
            textDecoration: "none",
            color: "black",
        },
        avatar: {
            width: "200px",
            height: "200px",
        },
    }));
    const classes = useStyles();

    useEffect(() => {
        useDispatch(receiveWantToBeFriends());
    }, []);

    if (!wantToBeFriends) {
        return null;
    }

    return (
        <>
            <Typography variant="h5"> WANT TO BE FRIENDS </Typography>
            {wantToBeFriends.map((user) => (
                <>
                    <div className={classes.user} key={user.id}>
                        <Link className={classes.link} to={`/user/${user.id}`}>
                            <Typography variant="h3">
                                {user.first} {user.last}
                            </Typography>
                            <Avatar
                                className={classes.avatar}
                                src={user.image_url}
                            ></Avatar>
                        </Link>
                    </div>
                    <FriendshipButton otherId={user.id} />
                </>
            ))}
            <Typography variant="h5"> ALREADY FRIENDS </Typography>
            {alreadyFriends.map((user) => (
                <>
                    <div className={classes.user} key={user.id}>
                        <Link className={classes.link} to={`/user/${user.id}`}>
                            <Typography variant="h3">
                                {user.first} {user.last}
                            </Typography>
                            <Avatar
                                className={classes.avatar}
                                src={user.image_url}
                            ></Avatar>
                        </Link>
                    </div>
                    <FriendshipButton otherId={user.id} />
                </>
            ))}
        </>
    );
}
