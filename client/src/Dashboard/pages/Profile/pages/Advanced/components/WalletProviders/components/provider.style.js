const styles = theme => ({
  highlight: {
    color: theme.palette.warning.main,
    fontWeight: "bold",
    margin: theme.spacing(0, 0, 3, 0),
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(3),
    margin: theme.spacing(3, 3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(3, 0, 0, 0)
    }
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    height: theme.spacing(20)
  },
  connect: {
    width: "100%"
  },
  connected: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  },
  loader: {
    color: "white"
  }
});

export default styles;
