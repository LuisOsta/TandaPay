import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { PageHeader } from "../../../../components/";
import styles from "./advanced.style";
import { WalletProviders, Notifications } from "./components/";

const headerText = "My Profile";
const headerButtons = [
  {
    text: "GO BACK",
    type: "blue",
    url: "/admin/profile/"
  }
];
const AdvancedSettings = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <PageHeader title={headerText} buttons={headerButtons} />
      <Grid container className={classes.container}>
        <Notifications />
        <WalletProviders />
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(AdvancedSettings);
