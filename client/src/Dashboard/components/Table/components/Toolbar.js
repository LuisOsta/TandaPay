import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import {
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  Button
} from "@material-ui/core";
import { lighten, makeStyles, darken } from "@material-ui/core/styles";

import { FilterList as FilterListIcon } from "@material-ui/icons/";
const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  actions: {
    color: theme.palette.text.secondary,
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    }
  },
  title: {
    flex: "0 0 auto",
    flexGrow: "1"
  },
  button: {
    minWidth: theme.spacing(20),
    backgroundColor: theme.palette.button.main,
    color: "white",
    borderRadius: "0"
  },
  green: {
    backgroundColor: theme.palette.button.main,
    "&:hover": {
      backgroundColor: darken(theme.palette.button.main, 0.1)
    }
  },
  red: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: darken(theme.palette.error.main, 0.1)
    }
  },
  blue: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: darken(theme.palette.primary.main, 0.1)
    }
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, title, buttons } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {title}
          </Typography>
        )}
      </div>
      <div className={classes.actions}>
        <Tooltip title="Filter list">
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        {buttons &&
          buttons.map((button, index) => {
            return (
              <Button
                variant="contained"
                key={index}
                to={button.url}
                component={RegLink}
                className={clsx({
                  [classes.button]: true,
                  [classes.red]: button.type === "red",
                  [classes.blue]: button.type === "blue",
                  [classes.green]: button.type === "green"
                })}
              >
                {button.text}
              </Button>
            );
          })}
      </div>
    </Toolbar>
  );
};

const RegLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));
export default EnhancedTableToolbar;
