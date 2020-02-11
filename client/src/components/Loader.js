import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: "1",
    padding: theme.spacing(3),
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));
const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography variant="h1">Loading...</Typography>
      </main>
    </div>
  );
};

export default Loader;
