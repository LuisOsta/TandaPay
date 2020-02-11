import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  withStyles
} from "@material-ui/core";
import {
  Warning as WarningIcon,
  Info as InfoIcon,
  MonetizationOn as MoneyIcon
} from "@material-ui/icons";
import clsx from "clsx";
import styles from "./card.style";
import { getStats } from "./stats.utils";

/**
 * @summary The Stat Card component receives a data source and stat type, which it will use to determine the exact information
 * and format it will use to display the relevant statistics.
 * In the event that it receives new props, it will recalculate the statistics that it needs to display. In order to allow the wallet balance to be shown,
 * the getStats function, and the lifecycle methods that use it must be async/await.
 * @type {React.Component}
 * ! @note - this should be refactored into a Hooks in the future if possible
 */
class StatCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      extra: ""
    };
  }

  /**
   * @summary the componentDidmount method will retrieve the stat and data objects received via props
   * and calculate the 'amount' and 'extra' properties that need to be shown to the user
   * It will then update state accordingly. It has to be async in order to be compatible with getting the DAI balance of the user
   */
  async componentDidMount() {
    const { stat, data } = this.props;
    const [amount, extra] = await getStats(stat.type, data);
    this.setState({
      amount,
      extra
    });
  }

  /**
   * @summary the componentDidUpdate works the same as the componentDidMount except
   * that in addition to retrieving the data it must allow do a basic check of the props
   * in order to determine whether it needs to actually re-calculate the properties.
   */
  async componentDidUpdate(prevProps) {
    const { stat, data } = this.props;
    if (data !== prevProps.data) {
      const [amount, extra] = await getStats(stat.type, data);
      this.setState({
        amount,
        extra
      });
    }
  }
  render() {
    const { stat, classes } = this.props;
    const { amount, extra } = this.state;
    return (
      <Grid item xs={12} md={4}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <StatIcon type={stat.type} classes={classes} />
            <Typography variant="body1">{stat.title}</Typography>
            <Typography
              variant="h5"
              className={clsx(classes.amountText, {
                [classes.moneyText]: stat.format === "$" && amount !== "N/A",
                [classes.infoText]: stat.format === "#" && amount !== "N/A"
              })}
            >
              {amount !== "N/A" && stat.format} {amount || "0"}
            </Typography>
          </CardContent>
          <CardActions>
            <Typography variant="caption">{extra || "LOADING INFO"}</Typography>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

const StatIcon = props => {
  const { type, classes } = props;
  switch (type) {
    case "wallet": {
      return (
        <div className={clsx(classes.iconWrapper, classes.wallet)}>
          <MoneyIcon className={classes.icon} />
        </div>
      );
    }
    case "payment": {
      return (
        <div className={clsx(classes.iconWrapper, classes.warning)}>
          <WarningIcon className={classes.icon} />
        </div>
      );
    }
    case "claims": {
      return (
        <div className={clsx(classes.iconWrapper, classes.info)}>
          <InfoIcon className={classes.icon} />
        </div>
      );
    }
    default:
      return null;
  }
};
export default withStyles(styles, { withTheme: true })(StatCard);
