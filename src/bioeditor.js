import React, { Component } from "react";
import axios from "./axios";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false, draftBio: null, bioError: false };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleBioEditor() {
        this.setState({
            editMode: !this.state.editMode,
        });
    }

    async setBio() {
        this.setState({
            editMode: false,
        });
        try {
            const { data } = await axios.post("/save-bio", this.state);
            if (data.success == true) {
                this.props.saveBio(this.state.draftBio);
            }
        } catch (e) {
            console.log("Error in axios/post/save-bio: ", e);
        }
    }

    // Render for three cases: 1) No bio is set, 2) bio is set, 3) bio is being edited
    render() {
        return (
            <>
                {this.state.editMode ? (
                    <div id="edit-bio">
                        <TextareaAutosize
                            name="draftBio"
                            defaultValue={this.props.bio}
                            onChange={(e) => this.handleChange(e)}
                            rowsMin={8}
                            placeholder="Max 500 characters"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => this.setBio(e)}
                        >
                            SAVE BIO
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => this.toggleBioEditor()}
                        >
                            CANCEL
                        </Button>
                    </div>
                ) : this.props.bio ? (
                    <div id="edit-bio">
                        Your bio: {this.props.bio}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.toggleBioEditor()}
                        >
                            EDIT BIO
                        </Button>
                    </div>
                ) : (
                    <div id="add-bio">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => this.toggleBioEditor()}
                        >
                            Add Bio
                        </Button>
                    </div>
                )}
            </>
        );
    }
}
