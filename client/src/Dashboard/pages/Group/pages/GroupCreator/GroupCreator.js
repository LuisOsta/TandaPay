import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { PageHeader } from "../../../../components/";
import {
    Button,
    TextField,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import { connect } from "react-redux";

import styles from "./GroupCreator.style.js";
import * as actions from "../../../../../actions";
import Instructions from "./components/Instructions";

const API_BASE = process.env.REACT_APP_API_BASE;

class GroupCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            premium: "",
            fileID: null,
            hasReadInstructions: false,
            uploading: false,
            confirm: {
                premium_cost: false,
                coverage: false,
                claim_requirements: false,
                member_qualifications: false,
                dispute_guidelines: false
            }
        };
    }

    handleRead = evt => {
        this.setState({ hasReadInstructions: true });
    };

    handleFieldChange = evt => {
        this.setState({
            [evt.target.id]: evt.target.value
        });
    };

    handleUpload = async evt => {
        if (!evt.target.files[0]) return;
        try {
            this.setState({
                uploading: true,
                fileID: null
            });
            let id = await uploadFile(evt.target.files[0]);
            this.setState({ uploading: false, fileID: id });
        } catch(e) {
            this.setState({ uploading: false });
            console.error(e);
            alert(e);
        }
    };

    isSubmittable = () =>
        this.state.name &&
        this.state.fileID &&
        !isNaN(this.state.premium) &&
        this.state.premium > 0 &&
        !this.state.uploading &&
        this.hasConfirmedAll();

    hasConfirmedAll = () =>
        Object.values(this.state.confirm).reduce((c, a) => c && a, true);

    handleSubmit = evt => {
        if (!this.isSubmittable) return;
        this.props.createGroup(this.state);
    };

    handleConfirm = evt => {
        let { confirm } = this.state;
        confirm[evt.target.value] = !confirm[evt.target.value];
        this.setState({ confirm });
    };

    render() {
        let { hasReadInstructions } = this.state;
        return (
            <div >
                <PageHeader title="Create a Group" />
                {hasReadInstructions
                    ? this.renderForm()
                    : this.renderInstructions()}
            </div>
        );
    }

    renderForm() {
        let { groupName, premium } = this.state;

        return (
            <div className={this.props.classes.spaceAround}>
                <div className={this.props.classes.form}>
                    <Typography variant="h4">Group Properties</Typography>
                    <TextField
                        type="text"
                        id="name"
                        label="Group Name"
                        value={groupName}
                        onChange={this.handleFieldChange}
                        variant="outlined"
                        className={this.props.classes.formItem}
                    />
                    <TextField
                        type="text"
                        id="premium"
                        label="Monthly Premium"
                        value={premium}
                        onChange={this.handleFieldChange}
                        variant="outlined"
                        className={this.props.classes.formItem}
                    />
                    <div>
                        <Typography style={{ marginTop: 20 }} variant="h4">
                            Group Charter
                        </Typography>
                        {this.state.uploading ? <b>Uploading...</b> : null}
                        <div
                            className={
                                this.props.classes.formItem +
                                " " +
                                this.props.classes.files
                            }
                        >
                            <input
                                id="files"
                                type="file"
                                accept="application/pdf"
                                onChange={this.handleUpload}
                            />
                        </div>
                    </div>
                    {this.state.fileID ? this.renderConfirmation() : null}
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                        disabled={!this.isSubmittable()}
                        className={
                            this.props.classes.formItem +
                            " " +
                            this.props.classes.button
                        }
                    >
                        Create
                    </Button>
                </div>
            </div>
        );
    }

    renderInstructions() {
        return (
            <React.Fragment>
                <Instructions />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleRead}
                >
                    I Understand
                </Button>
            </React.Fragment>
        );
    }

    renderConfirmation() {
        let { confirm } = this.state;

        return (
            <FormGroup style={{ marginTop: 15 }}>
                <div style={{ fontWeight: "bold" }}>
                    The group charter documents contain:
                </div>
                <FormControlLabel
                    label="What determines the cost of a premium"
                    control={
                        <Checkbox
                            onChange={this.handleConfirm}
                            checked={confirm.premium_cost}
                            value="premium_cost"
                        />
                    }
                />
                <FormControlLabel
                    label="What kind of coverage is provided"
                    control={
                        <Checkbox
                            onChange={this.handleConfirm}
                            checked={confirm.coverage}
                            value="coverage"
                        />
                    }
                />
                <FormControlLabel
                    label="The requirements for a valid claim"
                    control={
                        <Checkbox
                            onChange={this.handleConfirm}
                            checked={confirm.claim_requirements}
                            value="claim_requirements"
                        />
                    }
                />
                <FormControlLabel
                    label="Qualifications to join the group"
                    control={
                        <Checkbox
                            onChange={this.handleConfirm}
                            checked={confirm.member_qualifications}
                            value="member_qualifications"
                        />
                    }
                />
                <FormControlLabel
                    label="What guidelines do communities use to resolve disputes"
                    control={
                        <Checkbox
                            onChange={this.handleConfirm}
                            checked={confirm.disupte_guidelines}
                            value="dispute_guidelines"
                        />
                    }
                />
            </FormGroup>
        );
    }
}

async function uploadFile(file) {
    let { url, id } = (await axios.post('/upload', {}, {
        baseURL: API_BASE,
        headers: {
            Authorization: "Bearer " + document.cookie.match(/x-auth=(\S+)/)[1]
        }
    })).data;

    await new Promise(r => setTimeout(r, 1000))

    await fetch(url, { method: 'PUT', body: file });

    return id;
}

function mapStateToProps({ group }) {
    return { group };
}

export default connect(
    mapStateToProps,
    actions
)(withStyles(styles, { withTheme: true })(GroupCreator));
