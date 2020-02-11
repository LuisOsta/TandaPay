const styles = theme => ({
  container: {
    width: "70%",
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: "0"
    }
  },
  card: {
    position: "relative",
    overflow: "inherit"
  },
  content: {
    textAlign: "right",
    paddingRight: theme.spacing(3)
  },
  iconWrapper: {
    display: "inline-block",
    padding: theme.spacing(2),
    position: "absolute",
    top: "-20px",
    left: "5px"
  },
  warning: {
    backgroundImage: "linear-gradient(to bottom right, #FBD857, #A78402)"
  },
  info: {
    backgroundImage: "linear-gradient(to bottom right, #89C1F2, #1F215E)"
  },
  wallet: {
    backgroundImage: "linear-gradient(to bottom right, #89C98C, #355D36)"
  },
  icon: {
    color: "white",
    fontSize: "3em"
  },
  amountText: {
    margin: theme.spacing(2, 0, 0, 0),
    fontWeight: "bold"
  },
  moneyText: {
    color: theme.palette.money.main
  },
  infoText: {
    color: theme.palette.primary.light
  }
});

export default styles;
