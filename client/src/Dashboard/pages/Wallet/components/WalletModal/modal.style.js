const styles = theme => ({
  paper: {
    textAlign: "center",
    top: "30%",
    position: "absolute",
    margin: theme.spacing(0, 2, 0, 2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none",
    [theme.breakpoints.up("md")]: {
      left: "30%",
      minWidth: theme.spacing(30),
      margin: 0,
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(5, 0, 0, 0),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(5, 0, 0, 0),
  },
  field: {
    minWidth: theme.spacing(35),
  },
});

export default styles;
