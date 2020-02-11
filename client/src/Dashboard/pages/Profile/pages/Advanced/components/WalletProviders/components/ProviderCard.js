import React from "react";
import {
  Card,
  withStyles,
  CardContent,
  Button,
  CircularProgress,
  Typography
} from "@material-ui/core";
import clsx from "clsx";
import styles from "./provider.style";

/**
 * @summary
 * @param {Object} props
 */
const ProviderCard = props => {
  const { name, IconSrc, handleClick, classes, selected, loading } = props;
  return (
    <Card className={classes.card}>
      <img
        src={IconSrc}
        className={classes.img}
        alt={name}
        title={name}
        aria-label={name}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" className={classes.highlight}>
          {name.toLowerCase() === "metamask" ? "Advanced Users" : "Recommended"}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClick}
          className={clsx(classes.connect, {
            [classes.connected]: selected === name.toLowerCase()
          })}
        >
          {loading === true && name.toLowerCase() === selected && (
            <CircularProgress className={classes.loader} />
          )}
          {selected === name.toLowerCase() && loading === false
            ? "Connected"
            : loading === false && "Connect"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(ProviderCard);
