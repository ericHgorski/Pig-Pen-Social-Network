import React, { useState, useEffect } from "react";
import axios from "./axios";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";

export default function BioEdtior(props) {
    const [editMode, setEditMode] = useState(false);
    const [draftBio, setDraftBio] = useState(null);

    const onChangeHandler = (e) => {
        setDraftBio(e.target.value);
    };

    function toggleBioEditor() {
        setEditMode(!editMode);
    }

    async function setBio() {
        toggleBioEditor();
        try {
            const { data } = await axios.post("/save-bio", { draftBio });
            if (data.success) {
                setDraftBio(data.newBio);
            }
        } catch (err) {
            console.log("Error in axios/post/save-bio: ", err);
        }
    }

    return (
        <>
            <div id="bio-editor-container">
                {editMode ? (
                    <div id="edit-bio">
                        <TextareaAutosize
                            name="draftBio"
                            defaultValue={props.bio}
                            onChange={onChangeHandler}
                            rowsMin={8}
                            placeholder="Max 500 characters"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={setBio}
                        >
                            SAVE BIO
                        </Button>
                        <Button variant="contained" onClick={toggleBioEditor}>
                            CANCEL
                        </Button>
                    </div>
                ) : props.bio ? (
                    <Typography>
                        About me: {draftBio || props.bio}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleBioEditor}
                        >
                            EDIT BIO
                        </Button>
                    </Typography>
                ) : (
                    <div id="add-bio">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleBioEditor}
                        >
                            Add Bio
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
