import React, { useState } from "react";
import axios from "./axios";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    textArea: {
        marginTop: "20px",
        marginLeft: "10px",
        gridColumn: "1 / -1 ",
        fontSize: "15px",
        maxWidth: "300px",
        resize: "none",
    },
    bioEditorContainer: {
        display: "grid",
        gridTemplateRows: "180px 30px",
        gridTemplateColumns: "150px 75px",
        gap: "5px",
    },
    buttons: {
        marginLeft: "10px",
        gridRow: 2,
    },
    editButton: {
        marginLeft: "46%",
        marginTop: "20px",
    },
}));

export default function BioEditor(props) {
    const [editMode, setEditMode] = useState(false);
    const [draftBio, setDraftBio] = useState(null);
    const [newBio, setNewBio] = useState(null);
    const classes = useStyles();

    const onChangeHandler = ({ target }) => {
        setDraftBio(target.value);
    };

    async function setBio() {
        setEditMode(!editMode);
        try {
            const { data } = await axios.post("/save-bio", { draftBio });
            if (data.success) {
                setNewBio(data.newBio);
                props.saveBio(data.newBio);
            }
        } catch (err) {
            console.log("Error in axios/post/save-bio: ", err);
        }
    }

    return (
        <>
            {editMode ? (
                <div className={classes.bioEditorContainer}>
                    <TextareaAutosize
                        className={classes.textArea}
                        name="draftBio"
                        defaultValue={props.bio}
                        onChange={onChangeHandler}
                        rowsMin={8}
                        placeholder="Max 500 characters"
                    />
                    <Button
                        className={classes.buttons}
                        variant="contained"
                        color="primary"
                        onClick={setBio}
                    >
                        SAVE BIO
                    </Button>
                    <Button
                        className={classes.buttons}
                        variant="contained"
                        onClick={() => setEditMode(false)}
                    >
                        CANCEL
                    </Button>
                </div>
            ) : props.bio ? (
                <Typography variant="h6">
                    About me: {newBio || props.bio}
                    <br></br>
                    <Button
                        className={classes.editButton}
                        variant="contained"
                        color="primary"
                        onClick={() => setEditMode(!editMode)}
                    >
                        EDIT BIO
                    </Button>
                </Typography>
            ) : (
                <>
                    <Button
                        onClick={setBio}
                        className={classes.buttons}
                        variant="contained"
                        color="primary"
                    >
                        ADD BIO
                    </Button>
                </>
            )}
        </>
    );
}
