import React from "react";
import Logo from "./logo";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    navbar: {
        backgroundColor: "#e899dc",
        backgroundImage: "linear - gradient(315deg, #e899dc 0%, #d387ab 74%)",
    },
    title: {
        flexGrow: 1,
        fontFamily: "cursive",
    },
    link: {
        textDecoration: "none",
        color: "white",
    },
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.navbar}>
                    <Typography className={classes.title} variant="h4">
                        Pig Pen
                    </Typography>
                    <Button>
                        <Link className={classes.link} to="/">
                            My Profile
                        </Link>
                    </Button>
                    <Button>
                        <Link className={classes.link} to="/users">
                            Find Friends
                        </Link>
                    </Button>
                    <Button>
                        <a className={classes.link} href="/logout">
                            Logout
                        </a>
                    </Button>
                    <Logo />
                </Toolbar>
            </AppBar>
        </div>
    );
}
