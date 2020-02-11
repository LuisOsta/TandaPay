import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import styles from "../../../Navigation/SideBar/sidebar.style";
import BasicSettings from "./pages/Basic/BasicSettings";
import AdvancedSettings from "./pages/Advanced/AdvancedSettings";
const Profile = props => {
    const { classes } = props;

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
                <Route exact path="/admin/profile" component={BasicSettings} />
                <Route
                    exact
                    path="/admin/profile/advanced"
                    component={AdvancedSettings}
                />
            </Switch>
        </main>
    );
};

export default withStyles(styles, { withTheme: true })(Profile);
