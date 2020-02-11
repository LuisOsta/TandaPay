import React from "react";
import { withStyles, IconButton, Typography, Grid } from "@material-ui/core";
import { Person, AssignmentTurnedIn } from "@material-ui/icons";
import clsx from "clsx";
import styles from "./button.style";
class RoleButton extends React.Component {
  render() {
    const { classes, handleClick, role, type } = this.props;
    return (
      <Grid item xs={12} sm={6} className={classes.area}>
        <IconButton
          className={clsx(classes.iconButton, {
            [classes.buttonSelected]: role === type
          })}
          onClick={handleClick}
        >
          {type === "secretary" ? (
            <AssignmentTurnedIn
              className={clsx(classes.icon, {
                [classes.iconSelected]: role === type
              })}
            />
          ) : (
            <Person
              className={clsx(classes.icon, {
                [classes.iconSelected]: role === type
              })}
            />
          )}
        </IconButton>
        <Typography variant="caption" className={classes.caption}>
          {type === "secretary" ? "As a secretary" : "As a policyholder"}
        </Typography>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RoleButton);
