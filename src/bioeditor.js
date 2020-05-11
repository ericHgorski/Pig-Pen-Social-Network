import React, { Component } from "react";
import Button from "./styled/button";
import axios from "./axios";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    background-color: whitesmoke;
    height: 80px;
    width: 200px;
    color: black;
    font-size: large;
`;

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
                        <StyledTextarea
                            name="draftBio"
                            defaultValue={this.props.bio}
                            onChange={(e) => this.handleChange(e)}
                        ></StyledTextarea>
                        <button
                            className="button"
                            onClick={(e) => this.setBio(e)}
                        >
                            SAVE BIO
                        </button>
                        <button
                            className="button"
                            onClick={() => this.toggleBioEditor()}
                        >
                            CANCEL
                        </button>
                    </div>
                ) : this.props.bio ? (
                    <div id="edit-bio">
                        Your bio: {this.props.bio}
                        <button
                            className="button"
                            onClick={() => this.toggleBioEditor()}
                        >
                            EDIT BIO
                        </button>
                    </div>
                ) : (
                    <div id="add-bio">
                        <button
                            className="button"
                            id="bio"
                            onClick={() => this.toggleBioEditor()}
                        >
                            Add Bio
                        </button>
                    </div>
                )}
            </>
        );
    }
}
