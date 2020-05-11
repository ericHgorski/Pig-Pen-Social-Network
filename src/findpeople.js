import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    useEffect(() => {
        async function getRecentUsers() {
            try {
                const { data } = await axios.get("/api/users");
                setUsers(data.rows);
            } catch (e) {
                console.log("error in find people axios get: ", e);
            }
        }
        getRecentUsers();
    }, []);

    useEffect(() => {
        axios
            .post("/api/matching-users", { userSearch })
            .then(({ data }) => console.log(data.rows))
            .catch((err) => console.log("error in getMatching users: ", err));
    }, [userSearch]);

    return (
        <>
            <input
                onChange={(e) => {
                    setUserSearch(e.target.value);
                }}
            />
            {!userSearch &&
                users.map((user) => (
                    <div className="find-people-user" key={user.id}>
                        {user.first} {user.last}
                        <img src={user.image_url}></img>
                    </div>
                ))}
            {/* {userSearch &&
                userSearch.map((userFromSearch) => (
                    <div className="find-people-user" key={userFromSearch.id}>
                        {userFromSearch.first} {userFromSearch.last}
                        <img src={userFromSearch.image_url}></img>
                    </div>
                ))} */}
        </>
    );
}
