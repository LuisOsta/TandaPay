import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import { PageHeader } from "../../../../components/";
import styles from "./basic.style";
import SettingsForm from "./components/SettingsForm";
import ProfileCard from "./components/ProfileCard";
const headerText = "My Profile";
const headerButtons = [
  {
    text: "ADVANCED SETTINGS",
    type: "blue",
    url: "/admin/profile/advanced"
  }
];
const BasicSettings = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <PageHeader title={headerText} buttons={headerButtons} />
      <Grid container className={classes.container}>
        <ProfileCard />
        <SettingsForm />
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(BasicSettings);
