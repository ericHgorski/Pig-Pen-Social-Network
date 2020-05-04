import React from "react";
import Registration from "./Registration";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";
import ResetPassword from "./resetPassword";

export default function Welcome() {
    return (
        <div>
            <h1 className="header">Welcome to BookFace</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset/start" component={ResetPassword} />
                </div>
            </HashRouter>
        </div>
    );
}
