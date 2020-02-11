import React from "react";
import { withStyles, Link } from "@material-ui/core";
import { FacebookLoginButton } from "react-social-login-buttons";
import styles from "./button.style";
function FacebookLogin(props) {
	const { classes } = props;
	return (
		<FacebookLoginButton>
			<Link href={"/auth/facebook"} color="inherit" className={classes.link}>
				Sign In With Facebook
			</Link>
		</FacebookLoginButton>
	);
}

export default withStyles(styles, { withTheme: true })(FacebookLogin);
