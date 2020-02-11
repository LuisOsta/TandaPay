import React from "react";
import { Grid, withStyles, Typography } from "@material-ui/core";

import ClaimCard from "../ClaimCard/ClaimCard";

import styles from "./recent.style.js";
const RecentClaims = props => {
  const { classes, claims } = props;
  return (
    <Grid container className={classes.claimContainer} spacing={2}>
      {claims.map((claim, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <ClaimCard claim={claim} />
        </Grid>
      ))}
      {claims.length === 0 && (
        <Typography variant="h4">You have made no claims</Typography>
      )}
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(RecentClaims);
