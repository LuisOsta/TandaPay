const styles = theme => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  title: {
    color: "black",
  },
  content: {
    flexGrow: "1",
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  buttonContainer: {
    display: "flex",
  },
  button: {
    width: theme.spacing(20),
    backgroundColor: theme.palette.button.main,
    color: "white",
    borderRadius: "0",
    "&:hover": {
      backgroundColor: theme.palette.button.dark,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(3),
    },
  },
  divider: {
    width: "100%",
    color: "black",
    marginTop: theme.spacing(3),
  },
  claimContainer: {
    justifyContent: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },
  img: {
    height: theme.spacing(20),
    backgroundColor: "darkgrey",
    width: "100%",
  },
});

export default styles;
