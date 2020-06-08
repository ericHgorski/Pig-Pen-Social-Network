import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(() => ({
    search: {
        position: "relative",
        border: "2px solid grey",
        backgroundColor: "rgba(255, 180, 201, 0.2)",
        "&:hover": {
            backgroundColor: "rgba(255, 180, 201, 0.5)",
        },
        margin: "20px",
        width: "300px",
        left: "20px",
    },
    input: {
        paddingLeft: "30px",
        width: "100%",
        color: "black",
    },
    searchIcon: {
        paddingRight: "90px",
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    flexContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        margin: "20px",
        flexWrap: "wrap",
    },
    user: {
        border: "2px lightgrey solid",
        boxSizing: "border-box",
        borderRadius: "10%",
        display: "flex",
        justifyContent: "center",
        width: "300px",
        margin: "15px",
        padding: "5px",
        textAlign: "center",
        "&:hover": {
            backgroundColor: "#FFA8A9",
            opacity: "0.8",
            border: "black 2px solid",
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
    flexItem: {
        display: "flex",
        justifySelf: "center",
    },
    searchField: {
        textTransform: "capitalize",
        width: "200px",
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
            <div className={classes.searchContainer}>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        placeholder="Search…"
                        className={classes.input}
                    />
                </div>
            </div>
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
