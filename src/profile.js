import React from "react";
import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";
import DeleteAccount from "./DeleteAccount";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    flexContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        margin: "20px",
        flexWrap: "wrap",
    },
}));

export default function Profile(props) {
    const classes = useStyles();

    // Wait until userInfo is defined before rendering.
    if (!props.userInfo) {
        return null;
    }
    const { first, last, image_url, bio } = props.userInfo;
    return (
        <div className={classes.flexContainer}>
            <Typography variant="h2">
                Welcome {first} {last}
            </Typography>

            <ProfilePic
                toggleUploader={props.toggleUploader}
                first={first}
                last={last}
                image_url={image_url}
            />
            {!image_url && (
                <Button
                    onClick={() => props.toggleUploader()}
                    variant="contained"
                >
                    Upload your first profile picture
                </Button>
            )}

            {!props.uploaderStatus && (
                <BioEditor saveBio={props.saveBio} bio={bio} />
            )}
            <DeleteAccount />
        </div>
    );
}
