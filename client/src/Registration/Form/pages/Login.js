import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-final-form";
//redux
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  Button,
  Grid,
  withStyles,
  Avatar,
  Typography
} from "@material-ui/core";
import { LockOpenOutlined } from "@material-ui/icons";
import { EmailField, PasswordField } from "../components/Fields";

import styles from "../styles/form.style";

class Login extends React.Component {
  onSubmit = values => {
    const { email, password } = values;
    this.props.logIn({ email, password });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.form}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Form onSubmit={this.onSubmit}>
          {({ handleSubmit }) => (
            <form className={classes.formFix}>
              <EmailField />
              <PasswordField />
              <Button
                variant="contained"
                color="secondary"
                className={classes.submit}
                type="submit"
                onClick={handleSubmit}
              >
                LOG IN
              </Button>
              {this.renderExtra()}
            </form>
          )}
        </Form>
      </div>
    );
  }

  renderExtra = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Link to="/admin" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link to="/admin" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    );
  };
}

export default connect(
  null,
  actions
)(withStyles(styles, { withTheme: true })(Login));
