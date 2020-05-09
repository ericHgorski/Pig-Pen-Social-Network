import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        console.log("props in BioEditor :>> ", props);
        this.state = { editMode: false, draftBio: null, bioError: false };
        console.log("this.props.bio :>> ", this.props.bio);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    toggleBioEditor() {
        this.setState({
            editMode: !this.state.editMode,
        });
    }

    setBio() {
        this.setState({
            editMode: false,
        });
        axios
            .post("/save-bio", this.state)
            .then(({ data }) => {
                if (data.success == true) {
                    this.props.saveBio(this.state.draftBio);
                }
            })
            .catch((e) => console.log("Error in axios/post/save-bio: ", e));
    }

    // Render for three cases: 1) No bio is set, 2) bio is set, 3) bio is being edited
    render() {
        return (
            <>
                {this.state.editMode && (
                    <div id="edit-bio">
                        <textarea
                            name="draftBio"
                            defaultValue={this.props.bio}
                            onChange={(e) => this.handleChange(e)}
                        ></textarea>
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
                )}
                {this.props.bio && !this.state.editMode && (
                    <div id="edit-bio">
                        Your bio: {this.props.bio}
                        <button
                            className="button"
                            onClick={() => this.toggleBioEditor()}
                        >
                            EDIT BIO
                        </button>
                    </div>
                )}
                {!this.props.bio && !this.state.editMode && (
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
