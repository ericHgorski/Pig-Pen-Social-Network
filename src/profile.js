import React from "react";
import ProfilePic from "./profilepic";
import BioEditor from "./bioeditor";
import DeleteAccount from "./deleteaccount";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function Profile(props) {
    console.log("props :>> ", props);
    // Wait until userInfo is defined before rendering.
    if (!props.userInfo) {
        return null;
    }
    const { first, last, image_url, bio } = props.userInfo;
    return (
        <>
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
                    style={{ margin: "10px" }}
                    variant="contained"
                >
                    Add a new photo
                </Button>
            )}

            {!props.uploaderStatus && (
                <BioEditor saveBio={props.saveBio} bio={bio} />
            )}
            <DeleteAccount />
        </>
    );
}
