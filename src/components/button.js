import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    background: linear-gradient(to bottom, #74ad5a 5%, #68a54b 100%);
    background-color: #6aa150;
    font-size: 14px;
    font-weight: bold;
    border: 1px solid #34661b;
    cursor: pointer;
    color: #ffffff;
    max-width: 100px;
`;

const Button = ({ children }) => {
    return <StyledButton>{children}</StyledButton>;
};

export default Button;
