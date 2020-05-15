import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    flexContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        margin: "20px",
        flexWrap: "wrap",
    },
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
    names: {
        textTransform: "capitalize",
    },
}));

export default function FindPeople() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    // On mount, show three most recent users, if user searches,
    // show users that match with search. Also ignore if return is out of order.
    useEffect(() => {
        let ignore;
        (() => {
            axios
                .get("/api/users/" + (search || "noSearch"))
                .then(({ data }) => {
                    if (!ignore) {
                        setUsers(data.rows);
                    }
                });
        })();
        return () => {
            ignore = true;
        };
    }, [search]);

    return (
        <>
            <Input
                placeholder="SEARCH FOR FRIENDS"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <div className={classes.flexContainer}>
                {users.map((user) => (
                    <div className={classes.user} key={user.id}>
                        <Link className={classes.link} to={"/user/" + user.id}>
                            <Typography className={classes.names} variant="h5">
                                {user.first} {user.last}
                            </Typography>
                            <Avatar
                                className={classes.avatar}
                                src={user.image_url}
                            ></Avatar>
                        </Link>
                    </div>
                ))}
            </div>

            {!users.length && (
                <Typography color="error">No results found</Typography>
            )}
        </>
    );
}
