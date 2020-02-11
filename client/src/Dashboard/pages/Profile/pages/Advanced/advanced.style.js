const styles = theme => ({
  container: {
    margin: theme.spacing(5, 0, 0, 0),
    alignItems: "flex-start",
    [theme.breakpoints.down("md")]: {
      maxWidth: theme.spacing(38)
    }
  }
});

export default styles;
