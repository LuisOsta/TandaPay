import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import styles from "../../Navigation/SideBar/sidebar.style";
const Wallet = (props) => {
	const { classes } = props;
	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Typography variant="h2">Wallet Pages</Typography>
		</main>
	);
};

export default withStyles(styles, { withTheme: true })(Wallet);