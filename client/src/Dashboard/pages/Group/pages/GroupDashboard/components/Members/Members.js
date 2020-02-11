import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Typography, Card, Button, Grid, TextField } from "@material-ui/core";

import styles from "./Members.style.js";
import * as actions from "../../../../../../../actions";

class Members extends React.Component {
    constructor(props) {
        super(props);

        this.state = { filter: "" };
    }

    handleFilterChange = evt => {
        this.setState({ filter: evt.target.value });
    };

    render() {
        let { group, classes } = this.props;
        let { filter } = this.state;
        let filterExp = RegExp(filter, "i");

        return (
            <div id="members">
                <div className={classes.spaceBetween}>
                    <Typography style={{ alignSelf: "flex-end" }} variant="h4">
                        All Members
                    </Typography>
                    <TextField
                        label="Filter"
                        type="search"
                        margin="normal"
                        value={this.state.filter}
                        onChange={this.handleFilterChange}
                    />
                </div>
                <Grid container>
                    {group.members
                        .filter(m => filterExp.test(m.name))
                        .map(m => (
                            <Grid key={m.name} item sm={3}>
                                <MemberCard member={m} classes={classes} />
                            </Grid>
                        ))}
                </Grid>
            </div>
        );
    }
}

const StandingLabel = ({ standing, classes, style }) => (
    <span className={classes.standing + " " + classes[standing]} style={style}>
        {standing.substr(0, 1).toUpperCase() + standing.substr(1)}
    </span>
);

const MemberCard = ({ classes, member }) => (
    <Card className={classes.card}>
        <img
            src="https://via.placeholder.com/150"
            className={classes.img}
            alt="User Profile"
        />
        <div className={classes.spaceBetween} style={{ padding: 10 }}>
            <div>
                <Typography>{member.name}</Typography>
                <Typography>Subgroup</Typography>
            </div>
            <div className={classes.right}>
                <div>
                    <StandingLabel classes={classes} standing="good" />
                </div>
                <Button variant="contained" color="secondary">
                    Details
                </Button>
            </div>
        </div>
    </Card>
);

function mapStateToProps({ group }) {
    return { group };
}

export default connect(
    mapStateToProps,
    actions
)(withStyles(styles, { withTheme: true })(Members));
