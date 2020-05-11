import React from "react";
import Logo from "./logo";
import Logout from "./logout";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavbar = styled.div`
    height: 15vh;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    margin: 10px;
`;

export default function Navbar() {
    return (
        <StyledNavbar>
            <Logout />
            <Link to="/">My Profile</Link>
            <Link to="/users">Find Friends</Link>
            <Logo />
        </StyledNavbar>
    );
}
