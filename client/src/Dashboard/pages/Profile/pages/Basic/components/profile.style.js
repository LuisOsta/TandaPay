const styles = theme => ({
  cardContainer: {
    display: "flex",
    justifyContent: "center"
  },
  gridItem: {
    height: "inherit"
  },
  overview: {
    width: "80%",
    height: theme.spacing(30),
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(35),
      height: "inherit"
    }
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  profileContainer: {
    display: "flex",
    height: "100%",
    margin: theme.spacing(0, 0, 0, 5),
    flexDirection: "column",
    justifyContent: "space-around"
  },
  imageContainer: {
    height: "inherit",
    padding: theme.spacing(2)
  },
  subgroup: {
    color: theme.palette.warning.main,
    fontWeight: "bold"
  },
  standing: {
    color: theme.palette.secondary.light,
    fontWeight: "bold"
  },
  img: {
    height: "100%"
  }
});

export default styles;
