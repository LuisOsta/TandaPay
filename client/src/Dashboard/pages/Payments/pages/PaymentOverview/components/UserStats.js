import React from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import StatCard from "./StatCard/StatCard";
import useStyles from "./stats.style";

const stats = [
  {
    title: "Wallet Funds",
    type: "wallet",
    format: "$"
  },
  {
    title: "Upcoming Payment",
    type: "payment",
    format: "$"
  },
  {
    title: "Group Claims",
    type: "claims",
    format: "#"
  }
];
const UserStats = props => {
  const classes = useStyles(props);
  const { claims, group, ethereum } = props;
  return (
    <Grid container className={classes.container} spacing={6}>
      {stats.map((stat, index) => {
        const data =
          stat.type === "wallet"
            ? ethereum
            : stat.type === "payment"
            ? group
            : claims;
        return <StatCard stat={stat} key={index} data={data} />;
      })}
    </Grid>
  );
};

function mapStateToProps({ claims, group, ethereum }) {
  return { claims, group, ethereum };
}

export default connect(
  mapStateToProps,
  null
)(UserStats);
