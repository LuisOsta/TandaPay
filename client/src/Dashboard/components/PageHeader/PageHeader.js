import React from "react";
import {
  Grid,
  withStyles,
  Typography,
  Button,
  Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";
import clsx from "clsx";
import styles from "./header.style";
const PageHeader = props => {
  const { classes, title, buttons = [], role } = props;
  const titleSize = 12 - 2 * buttons.length;
  const buttonSize = buttons == null ? 0 : 2 * buttons.length;
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} md={titleSize}>
          <Typography variant="h3" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        {buttonSize > 0 && (
          <Grid
            item
            xs={12}
            md={buttonSize}
            className={classes.buttonContainer}
          >
            {buttons.map((button, index) => {
              if (button.role === "secretary" && role === "policyholder") {
                return null;
              }
              if (button.url !== undefined) {
                return (
                  <Button
                    variant="contained"
                    className={clsx({
                      [classes.buttonGreen]: button.type === "green",
                      [classes.buttonRed]: button.type === "red",
                      [classes.buttonBlue]: button.type === "blue"
                    })}
                    to={button.url}
                    component={RegLink}
                    key={index}
                  >
                    {button.text}
                  </Button>
                );
              } else {
                return (
                  <Button
                    variant="contained"
                    className={clsx({
                      [classes.buttonGreen]: button.type === "green",
                      [classes.buttonRed]: button.type === "red",
                      [classes.buttonBlue]: button.type === "blue"
                    })}
                    disabled={button.disabled}
                    key={index}
                    onClick={button.handleClick}
                  >
                    {button.text}
                  </Button>
                );
              }
            })}
          </Grid>
        )}
      </Grid>
      <Divider className={classes.divider} />
    </React.Fragment>
  );
};

const RegLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

export default withStyles(styles, { withTheme: true })(PageHeader);
