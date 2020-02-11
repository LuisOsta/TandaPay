import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./InviteMember.style.js";
import * as actions from "../../../../../actions";
import { PageHeader } from "../../../../components";

class InviteMember extends React.Component {
    constructor(props) {
        super(props);

        this.state = { email: "", done: false };
    }

    isSubmittable() {
        return /^\S+@\S+\.\S+$/.test(this.state.email);
    }

    render() {
        let { classes } = this.props;
        return (
            <React.Fragment>
                {this.state.done ? <Redirect to="/admin/groups" /> : null}
                <PageHeader
                    title="Invite Member"
                    buttons={[
                        {
                            text: "Cancel",
                            type: "red",
                            url: "/admin/groups"
                        }
                    ]}
                />
                <div className={classes.form}>
                    <TextField
                        className={classes.item}
                        variant="outlined"
                        label="Member Email"
                        onChange={this.handleChange}
                        value={this.state.email}
                    />
                    <Button
                        className={classes.item}
                        variant="contained"
                        color="secondary"
                        disabled={!this.isSubmittable()}
                        onClick={this.handleSubmit}
                    >
                        Invite
                    </Button>
                </div>
            </React.Fragment>
        );
    }

    handleChange = evt => {
        this.setState({ email: evt.target.value.trim() });
    };

    handleSubmit = async () => {
        await this.props.inviteMember(this.state.email);
        this.setState({ email: "" });
        await new Promise(res => setTimeout(res, 1000));
        this.setState({ done: true });
    };
}

const secretaryOnly = Component => props =>
    props.user.role === "secretary" ? (
        <Component {...props} />
    ) : (
        <Redirect to="/admin/groups" />
    );

function mapStateToProps({ group }) {
    return { group };
}

export default connect(
    mapStateToProps,
    actions
)(withStyles(styles, { withTheme: true })(secretaryOnly(InviteMember)));
