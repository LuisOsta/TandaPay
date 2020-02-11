const styles = theme => ({
  container: {
    margin: theme.spacing(5, 0, 0, 0)
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(5, 0, 0, 0)
    }
  },
  overview: {
    width: "80%",
    height: theme.spacing(30)
  },
  basic: {
    width: "70%",
    minHeight: theme.spacing(60),
    padding: theme.spacing(0, 0, 2, 0),
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  title: {
    margin: theme.spacing(2),
    fontWeight: "bold"
  },
  divider: {
    margin: theme.spacing(2, 0, 2, 0),
    maxWidth: "80%"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end"
  },
  formContainer: {
    width: "80%",
    margin: "auto",
    justifyContent: "center"
  },
  field: {
    boxShadow: "2px 2px 2px lightgray"
  }
});

export default styles;
