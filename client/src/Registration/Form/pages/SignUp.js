import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-final-form";
//redux
import { connect } from "react-redux";
import * as actions from "../../../actions";
import {
  Button,
  Grid,
  TextField,
  withStyles,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  Avatar,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import styles from "../styles/form.style";
import { EmailField, PasswordField, NameField } from "../components/Fields";

class SignUp extends React.Component {
  onSubmit = values => {
    const { name, email, password } = values;
    this.props.signUp({ name, email, password });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.form}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Form onSubmit={this.onSubmit}>
          {({ handleSubmit }) => (
            <form className={classes.formFix}>
              <NameField />
              <EmailField />
              <PasswordField />
              <Button
                variant="contained"
                className={classes.submit}
                type="submit"
                onClick={handleSubmit}
              >
                SIGN UP
              </Button>
              {this.renderExtra()}
            </form>
          )}
        </Form>
      </div>
    );
  }

  renderRoleForm = () => {
    const { role } = this.state;
    const { classes } = this.props;
    return (
      <Grid container>
        <FormControl component="fieldset" className={classes.FormControl}>
          <FormLabel component="legend">
            Will you be a secretary or policyholder?
          </FormLabel>
          <RadioGroup
            aria-label="User Role"
            name="user-role"
            className={classes.group}
            value={role}
            onChange={this.handleRoleChange}
          >
            <FormControlLabel
              value="secretary"
              control={<Radio />}
              label="Secretary"
            />

            <FormControlLabel
              value="policyholder"
              control={<Radio />}
              label="Policyholder"
            />
            {this.renderAccessField()}
          </RadioGroup>
        </FormControl>
      </Grid>
    );
  };

  renderAccessField = () => {
    const { accessCode, role } = this.state;

    if (role !== "policyholder") {
      return;
    } else {
      return (
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="access-code"
          label="Access Code"
          name="access code"
          autoComplete="access code"
          onChange={this.handleCodeChange}
          value={accessCode}
        >
          Access Code
        </TextField>
      );
    }
  };

  renderExtra = () => {
    return (
      <Grid container>
        <Grid item xs>
          <Link to="/admin" variant="body2">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
    );
  };
}

export default connect(
  null,
  actions
)(withStyles(styles, { withTheme: true })(SignUp));
