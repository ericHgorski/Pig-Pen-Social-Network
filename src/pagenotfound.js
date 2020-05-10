import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <>
            <h1>404</h1>
            <h2>We couldn't find that page.</h2>
            <Link to="/">Click here to go back to your profile.</Link>
        </>
    );
}
