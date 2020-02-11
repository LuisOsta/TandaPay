import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { PageHeader } from "../../../../components/";
import * as actions from "../../../../../actions";
import styles from "./new.style.js";
import FileUpload from "./components/FileUpload";
import SummaryField from "./components/SummaryField";

class ClaimNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            summary: "",
        };
    }
    handleClaimSubmit = () => {
        const { files, summary } = this.state;
        this.props.createClaim(summary, files);
        this.props.history.push("/admin/claims");
    };
    displayGuide = guideURL => {
        window.open(guideURL, "_blank");
    };

    handleFileUpload = event => {
        this.setState({
            files: event.target.files,
        });
    };

    handleSummaryUpdate = event => {
        this.setState({
            summary: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        const { summary, files } = this.state;
        const headerButtons = [
            {
                text: "VIEW GUIDE",
                type: "blue",
                handleClick: this.displayGuide,
            },
            { text: "CANCEL", type: "red", url: "/admin/claims" },
            {
                text: "SUBMIT",
                type: "green",
                handleClick: this.handleClaimSubmit,
                disabled: summary === "" || files.length === 0,
            },
        ];
        return (
            <React.Fragment>
                <PageHeader title="Create New Claim" buttons={headerButtons} />
                <Grid container className={classes.container}>
                    <SummaryField
                        value={summary}
                        handleUpdate={this.handleSummaryUpdate}
                    />
                    <FileUpload
                        onUpload={this.handleFileUpload}
                        files={files}
                    />
                </Grid>
            </React.Fragment>
        );
    }
}

export default withRouter(
    connect(
        null,
        actions
    )(withStyles(styles, { withTheme: true })(ClaimNew))
);
