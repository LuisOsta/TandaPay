import React from "react";
import { Grid, Card, withStyles, Typography, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import * as actions from "../../../../../../actions";
import { haveSettingsChanged } from "./settings.util";
import styles from "./form.style";
import Form from "./Form/Form";

/**
 * @summary - The responsability of this component is to provide the current profile info(except the password information) and allows the user to update them.
 * It will create a snackbar appropriate the to the outcome of their update.
 * If an error occurs it will specify it there. Furthermore it will only allow users to update profile information they are allowed to update.
 * Thus is a user signs up with google/facebook, thus the passsword fields will be disabled.
 * @type {React.Component}
 * @param {Object} props It will receive the user (from the redux store), the material ui classes, and the action creator to update the settings
 */
const SettingsForm = props => {
  const { classes, user, updateSettings } = props;
  const { enqueueSnackbar } = useSnackbar();

  /**
   * @summary When the user updates their profile, it will first check if they've updated their profile.
   * Then make the API call if they have made changes. Afterwards it will check for errors from the API call.
   * It will create a snackbar depending on the aforementioned results
   * @param {Object} body - it will contain the name, email, phone and password submitted by the form. These inputs may have not been changed.
   */
  const onSubmit = async body => {
    const {
      name,
      email,
      phone,
      oldPassword,
      newPassword,
      confirmPassword
    } = body;
    const hasChanged = haveSettingsChanged(body, user);
    if (!hasChanged) {
      return enqueueSnackbar("No changes have been made.", { variant: "info" });
    }

    if (oldPassword && !newPassword && !confirmPassword) {
      return enqueueSnackbar(
        "To change your password, provide a new one and confirm it",
        { variant: "warning" }
      );
    }
    //new password and confirmed must match
    if (newPassword !== confirmPassword) {
      return enqueueSnackbar(
        "Your new password does not match the confirmed one",
        { variant: "error" }
      );
    }
    const [, error] = await updateSettings({
      name,
      email,
      phone,
      oldPassword,
      newPassword
    });
    if (error) {
      return enqueueSnackbar(`Error occurred updating your profile: ${error}`, {
        variant: "error"
      });
    } else {
      return enqueueSnackbar("Your profile has been successfully updated", {
        variant: "success"
      });
    }
  };
  return (
    <Grid item xs={12} sm={6} className={classes.cardContainer}>
      <Card className={classes.basic}>
        <Typography variant="h6" className={classes.title}>
          UPDATE PROFILE
        </Typography>
        <Divider />
        <Form user={user} onSubmit={onSubmit} />
      </Card>
    </Grid>
  );
};

function mapStateToProps({ user }) {
  return { user };
}
export default connect(
  mapStateToProps,
  actions
)(withStyles(styles, { withTheme: true })(SettingsForm));
