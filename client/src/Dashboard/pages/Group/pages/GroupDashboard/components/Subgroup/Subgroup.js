import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Typography, Button } from "@material-ui/core";

import styles from "./Subgroup.style.js";
import * as actions from "../../../../../../../actions";

const Subgroup = ({ classes }) => (
    <div>
        <Typography variant="h4">Subgroup</Typography>
        <div className={classes.main}>
            <BigText className={classes.item}>
                It looks like you haven't joined a subgroup yet
            </BigText>
            <Button
                className={classes.item}
                color="primary"
                variant="contained"
            >
                Join One Now
            </Button>
        </div>
    </div>
);

const BigText = withStyles(styles, { withTheme: true })(
    ({ classes, children, className }) => (
        <div className={classes.bigText + " " + className}>{children}</div>
    )
);

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    actions
)(withStyles(styles, { withTheme: true })(Subgroup));
