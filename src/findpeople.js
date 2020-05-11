import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    // On mount, show three most recent users, if user searches,
    // show users that match with search. Also ignore if return is out of order.
    useEffect(() => {
        let ignore;
        (() => {
            axios
                .get("/api/users/" + (recentUsers || "newUsers"))
                .then(({ data }) => {
                    if (!ignore) {
                        setUsers(data.rows);
                    }
                });
        })();
        return () => {
            ignore = true;
        };
    }, [userSearch]);

    return (
        <>
            <input
                onChange={(e) => {
                    setUserSearch(e.target.value);
                }}
            />
            {users.map((user) => (
                <div className="find-people-user" key={user.id}>
                    <Link to={"/user/" + user.id}>
                        <h3>
                            {user.first} {user.last}
                        </h3>
                        <img src={user.image_url}></img>
                    </Link>
                </div>
            ))}
            {!users.length && <div>No results found</div>}
        </>
    );
}
