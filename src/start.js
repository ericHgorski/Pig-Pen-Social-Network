import React from "react";
import ReactDOM from "react-dom";
import Logout from "./logout";
import Welcome from "./welcome";

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (userIsLoggedIn) {
    elem = <Logout />;
} else {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));
