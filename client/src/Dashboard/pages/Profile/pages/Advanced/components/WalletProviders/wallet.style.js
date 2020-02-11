const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      width: "inherit",
      margin: theme.spacing(5, 0, 0, 0)
    }
  },
  card: {
    width: "70%",
    padding: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  divider: {
    width: "100%",
    color: "black"
  },
  providers: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column"
  }
});

export default styles;
