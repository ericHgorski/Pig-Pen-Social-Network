import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function FindPeople() {
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

    //STYLING
    const useStyles = makeStyles(() => ({
        user: {
            border: "1px solid black",
        },
        link: {
            textDecoration: "none",
            color: "black",
        },
    }));
    const classes = useStyles();

    return (
        <>
            <Input
                placeholder="SEARCH USERS"
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            {users.map((user) => (
                <div className={classes.user} key={user.id}>
                    <Link className={classes.link} to={"/user/" + user.id}>
                        <Typography variant="h5">
                            {user.first} {user.last}
                        </Typography>
                        <img src={user.image_url}></img>
                    </Link>
                </div>
            ))}
            {!users.length && (
                <Typography color="error">No results found</Typography>
            )}
        </>
    );
}
