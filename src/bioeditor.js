import React, { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        console.log("props in BioEditor :>> ", props);
        this.state = { editMode: false, draftBio: null };
        console.log("this.props.bio :>> ", this.props.bio);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    setBio() {
        this.setState({
            editMode: false,
        });
        axios.post("/save-bio", this.state).then(({ data }) => {
            this.props.saveBio(data.bio);
            console.log(data.bio);
        });
        // console.log("data in setBio, bioeditor :>> ", result.data.draftBio);
        // this.props.saveBio(result);
    }
    catch(e) {
        console.log("error in setBio in bioeditor: ", e);
    }

    // Render for three cases: 1) No bio is set, 2) bio is set, 3) bio is being edited
    render() {
        return (
            <>
                {this.props.bio && (
                    <div id="edit-bio">
                        Your bio: {this.props.bio}
                        <button
                            className="button"
                            onClick={() =>
                                this.setState({
                                    editMode: true,
                                })
                            }
                        >
                            Edit Bio.
                        </button>
                    </div>
                )}
                {!this.props.bio && (
                    <div id="add-bio">
                        <div
                            id="bio"
                            onClick={() =>
                                this.setState({
                                    editMode: true,
                                })
                            }
                        >
                            Your bio: {this.props.bio}
                        </div>
                    </div>
                )}
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
                    </div>
                )}
            </>
        );
    }
}
