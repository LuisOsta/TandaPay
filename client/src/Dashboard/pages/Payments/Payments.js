import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Switch, Route } from "react-router-dom";
import PaymentOverview from "./pages/PaymentOverview/PaymentOverview";
import PaymentNew from "./pages/PaymentNew/PaymentNew";
import PaymentReview from "./pages/PaymentReview/PaymentReview";
import styles from "../../../Navigation/SideBar/sidebar.style";
const Main = props => {
  const { classes } = props;
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <Route exact path="/admin/payments" component={PaymentOverview} />
        <Route exact path="/admin/payments/new" component={PaymentNew} />
        <Route exact path="/admin/payments/:id" component={PaymentReview} />
      </Switch>
    </main>
  );
};

export default withStyles(styles, { withTheme: true })(Main);
