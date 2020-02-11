import React from "react";

import { Form } from "react-final-form";
import { withStyles, Grid, Divider, Button } from "@material-ui/core";
import { EmailField, NameField, PasswordField, PhoneField } from "../Fields/";
import styles from "../form.style";

const EnhancedForm = props => {
  const { user, classes, onSubmit } = props;
  const { name, email, phone, googleID, facebookID } = user;
  // boolean check if the user signed up with google or facebook
  const usedOauth = googleID !== undefined || facebookID !== undefined;
  return (
    <Form onSubmit={onSubmit} initialValues={{ name, email, phone }}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container className={classes.formContainer}>
            <Grid item xs={12}>
              <NameField />
            </Grid>
            <Grid item xs={12} className={classes.divider}>
              <Divider />
            </Grid>
            {renderPasswordArea(usedOauth)}
            <Grid item xs={12} className={classes.divider}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <EmailField disabled={usedOauth} />
            </Grid>
            <Grid item xs={12}>
              <PhoneField />
            </Grid>
            <Grid item xs={12} className={classes.buttonGroup}>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
};

const renderPasswordArea = usedOauth => {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <PasswordField
          label="Old Password"
          name="oldPassword"
          disabled={usedOauth}
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordField
          label="New Password"
          name="newPassword"
          disabled={usedOauth}
        />
      </Grid>
      <Grid item xs={12}>
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          disabled={usedOauth}
        />
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles, { withTheme: true })(EnhancedForm);
