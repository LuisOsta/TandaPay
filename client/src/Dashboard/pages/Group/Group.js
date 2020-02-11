import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";

import { GroupCreator, GroupDashboard, InviteMember } from "./pages";
import { withGroup, withoutGroup } from "./components/HOCs.js";
import styles from "./group.style.js";

const Wrapper = withStyles(styles, { withTheme: true })(
    ({ children, classes }) => {
        return (
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        );
    }
);

const Group = () => (
    <Wrapper>
        <Switch>
            <Route
                exact
                path="/admin/groups"
                component={withGroup(GroupDashboard)}
            />
            <Route
                exact
                path="/admin/groups/new"
                component={withoutGroup(GroupCreator)}
            />
            <Route
                exact
                path="/admin/groups/invite"
                component={withGroup(InviteMember)}
            />
        </Switch>
    </Wrapper>
);

export default Group;
