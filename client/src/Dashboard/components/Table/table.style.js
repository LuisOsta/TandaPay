import { darken } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      maxWidth: theme.spacing(70),
      margin: "auto",
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: theme.spacing(35),
    },
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  status: {
    fontWeight: "bold",
    textAlign: "left",
  },
  pending: {
    color: theme.palette.warning.dark,
  },
  denied: {
    color: theme.palette.error.dark,
  },
  approved: {
    color: theme.palette.secondary.dark,
  },
  button: {
    backgroundColor: theme.palette.button.main,
    color: "white",
    borderRadius: "0",
    "&:hover": {
      backgroundColor: darken(theme.palette.button.main, 0.2),
    },
  },
  amount: {
    color: theme.palette.money.main,
    fontWeight: "bold",
  },
  pagination: {
    height: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default styles;
