import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
// import { SearchIcon } from "@material-ui/icons/Search";
import LogoSmall from "./logoSmall";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

// const useStyles = makeStyles(() => ({
//     root: {
//         flexGrow: 1,
//     },
//     title: {
//         flexGrow: 1,
//         display: "none",
//     },
//     search: {
//         position: "relative",
//         borderRadius: "20px",
//         backgroundColor: "hotpink",
//         "&:hover": {
//             backgroundColor: "red",
//         },
//         marginLeft: 0,
//         width: "100%",
//     },
//     searchIcon: {
//         padding: "10px",
//         height: "100%",
//         position: "absolute",
//         pointerEvents: "none",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     inputRoot: {
//         color: "inherit",
//     },
//     inputInput: {
//         padding: "10px",
//         width: "100%",
//     },
// }));

// export default function NavBar() {
//     const classes = useStyles();

//     return (
//         <div className={classes.root}>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         edge="start"
//                         className={classes.menuButton}
//                         color="inherit"
//                         aria-label="open drawer"
//                     ></IconButton>
//                     <Typography className={classes.title} variant="h6" noWrap>
//                         The Pig Pen
//                     </Typography>
//                     <div className={classes.search}>
//                         <div className={classes.searchIcon}>
//                             <SearchIcon />
//                         </div>
//                         <InputBase
//                             placeholder="Search…"
//                             classes={{
//                                 root: classes.inputRoot,
//                                 input: classes.inputInput,
//                             }}
//                             inputProps={{ "aria-label": "search" }}
//                         />
//                     </div>
//                 </Toolbar>
//             </AppBar>
//         </div>
//     );
// }

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        display: "flex",
    },
    navbar: {
        backgroundColor: "rgb(255, 180, 201)",
        // border: "white 3px solid",
        // backgroundImage: "linear - gradient(315deg, #e899dc 0%, #d387ab 74%)",
    },
    title: {
        flexGrow: 1,
        fontFamily: "cursive",
    },
    link: {
        textDecoration: "none",
        color: "white",
    },
    logoHorizontallyCenter: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        // paddingRight: "15%",
    },
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.navbar}>
                    <Typography className={classes.title} variant="h4">
                        The Pig Pen
                    </Typography>
                    <div className={classes.logoHorizontallyCenter}>
                        <LogoSmall className={classes.logo} />
                    </div>
                    <Button>
                        <Link className={classes.link} to="/">
                            My Profile
                        </Link>
                    </Button>
                    <Button>
                        <Link className={classes.link} to="/chat">
                            Chat
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
