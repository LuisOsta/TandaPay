import React from "react";
import {
    Grid,
    Typography,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    withStyles
} from "@material-ui/core";
import axios from "axios";

import styles from "./notifications.style";

const API_BASE = process.env.REACT_APP_API_BASE;

class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.api = axios.create({
            baseURL: API_BASE,
            headers: {
                Authorization:
                    "Bearer " + document.cookie.match(/x-auth=(\S+);?/)[1]
            }
        });

        this.state = {
            notifs: [],
            saving: null
        };
    }

    componentDidMount() {
        this.load().catch(console.error);
    }

    async load() {
        let notifs = (await this.api.get("/user/settings")).data;
        this.setState({ notifs });
    }

    async save() {
        this.setState({ saving: true });
        await this.api.put("/user/settings", this.state.notifs);
        this.setState({ saving: "done" });
    }

    render() {
        let { classes } = this.props;
        let { notifs, saving } = this.state;

        return (
            <Grid item xs={12} sm={7} className={classes.container}>
                <Paper>
                    <div className={classes.spaceBetween}>
                        <Typography className={classes.heading} variant="h5">
                            Notifications
                        </Typography>
                        <Typography
                            className={
                                classes.heading + " " + classes.saveStatus
                            }
                            variant="body2"
                        >
                            {saving === true ? "Saving..." : null}
                            {saving === "done" ? "Saved" : null}
                        </Typography>
                    </div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Notification</TableCell>
                                <TableCell>SMS</TableCell>
                                <TableCell>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notifs
                                .map(n => n.code)
                                .filter(unique)
                                .map(this.renderRow)}
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        );
    }

    renderRow = code => {
        let sms = this.state.notifs.find(
            n => n.code === code && n.domain === "sms"
        );
        let email = this.state.notifs.find(
            n => n.code === code && n.domain === "email"
        );

        return (
            <TableRow key={code}>
                <TableCell>{NOTIFICATION_NAMES[code]}</TableCell>
                <TableCell>
                    {sms ? (
                        <Checkbox
                            checked={sms.value}
                            onChange={this.handleChange("sms", code)}
                        />
                    ) : null}
                </TableCell>
                <TableCell>
                    {email ? (
                        <Checkbox
                            checked={email.value}
                            onChange={this.handleChange("email", code)}
                        />
                    ) : null}
                </TableCell>
            </TableRow>
        );
    };

    renderRow = code => {
        let sms = this.state.notifs.find(
            n => n.code === code && n.domain === "sms"
        );
        let email = this.state.notifs.find(
            n => n.code === code && n.domain === "email"
        );

        return (
            <TableRow key={code}>
                <TableCell>{NOTIFICATION_NAMES[code]}</TableCell>
                <TableCell>
                    {sms ? (
                        <Checkbox
                            checked={sms.value}
                            onChange={this.handleChange("sms", code)}
                        />
                    ) : null}
                </TableCell>
                <TableCell>
                    {email ? (
                        <Checkbox
                            checked={email.value}
                            onChange={this.handleChange("email", code)}
                        />
                    ) : null}
                </TableCell>
            </TableRow>
        );
    };

    handleChange = (domain, code) => evt => {
        let notif = this.state.notifs.find(
            n => n.code === code && n.domain === domain
        );
        notif.value = !notif.value;
        this.setState(this.state, () => this.save().catch(console.error));
    };
}

const NOTIFICATION_NAMES = {
    premium_paid: "Premium Paid",
    claim_created: "Claim Created",
    claim_updated: "Claim Updated",
    claim_approved: "Claim Approved"
};

function unique(item, pos, arr) {
    return arr.indexOf(item) === pos;
}

export default withStyles(styles, { withTheme: true })(Notifications);
