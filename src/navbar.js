import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none",
        color: "#A14A76",
    },
    title: {
        flexGrow: 1,
        fontFamily: "cursive",
        fontSize: "30px",
    },

    navbar: {
        backgroundColor: "#F786AA;",
    },
}));

export default function SearchAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.navbar}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        The Pig Pen
                    </Typography>
                    <Button>
                        <Link className={classes.link} to="/">
                            My Profile
                        </Link>
                    </Button>
                    <Button>
                        <Link className={classes.link} to="/chat">
                            OINK ROOM
                        </Link>
                    </Button>
                    <Button>
                        <Link className={classes.link} to="/friends">
                            Friends
                        </Link>
                    </Button>
                    <Button>
                        <Link className={classes.link} to="/users">
                            Find People
                        </Link>
                    </Button>
                    <Button>
                        <a className={classes.link} href="/logout">
                            Logout
                        </a>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
