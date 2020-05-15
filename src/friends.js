import React, { useEffect } from "react";
import { receiveWantToBeFriends, acceptFriend, unfriend } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
    user: {
        border: "1px lightpink solid",
        borderRadius: "10%",
        display: "flex",
        justifyContent: "center",
        width: "300px",
        margin: "15px",
        padding: "5px",
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

export default function Friends() {
    const classes = useStyles();
    const dispatch = useDispatch();
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

    useEffect(() => {
        dispatch(receiveWantToBeFriends());
    }, []);

    if (!wantToBeFriends) {
        return null;
    }

    return (
        <>
            {wantToBeFriends.length == 0 && alreadyFriends.length == 0 && (
                <Typography variant="h5">
                    Rats! You don't have any friends yet. Check out the Find
                    People page to get started.
                </Typography>
            )}
            {wantToBeFriends.length != 0 && (
                <Typography variant="h5"> WANT TO BE FRIENDS </Typography>
            )}
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
                    <Button onClick={() => dispatch(acceptFriend(user.id))}>
                        Accept Friend Request
                    </Button>
                </>
            ))}
            {alreadyFriends.length != 0 && (
                <Typography variant="h5"> ALREADY FRIENDS </Typography>
            )}
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
                    <Button onClick={() => dispatch(unfriend(user.id))}>
                        Unfriend
                    </Button>
                </>
            ))}
        </>
    );
}
