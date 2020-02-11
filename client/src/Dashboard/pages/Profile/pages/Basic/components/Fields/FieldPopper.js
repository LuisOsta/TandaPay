import React from "react";
import { Popper, Typography, Paper, Fade, withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    zIndex: "2"
  },
  paper: {
    maxWidth: "50%",
    padding: theme.spacing(2)
  }
});
const values = {
  disabled: "Cannot edit your password",
  able: "Password must be at least 8 characters long"
};
const FieldPopper = props => {
  const { id, open, anchorEl, classes, disabled } = props;
  const text = disabled ? values["disabled"] : values["able"];
  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      transition
      disablePortal={true}
      className={classes.root}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.paper}>
            <Typography variant="body1">{text}</Typography>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default withStyles(styles, { withTheme: true })(FieldPopper);
