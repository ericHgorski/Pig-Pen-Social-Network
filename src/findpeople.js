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
        async function getMatchingUsers() {
            try {
                const { data } = await axios.get(
                    "/api/matching-users",
                    userSearch
                );
                console.log(data);
            } catch (e) {
                console.log("error in getMatchingUsers axios get: ", e);
            }
        }
        getMatchingUsers();
    }, [userSearch]);

    return (
        <>
            {users.map((user) => (
                <div className="find-people-user" key={user.id}>
                    {user.first} {user.last}
                    <img src={user.image_url}></img>
                </div>
            ))}
            <input
                onChange={(e) => {
                    setUserSearch(e.target.value);
                }}
            />
        </>
    );
}
