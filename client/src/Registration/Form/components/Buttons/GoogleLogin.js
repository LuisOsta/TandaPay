import React from "react";
import { withStyles, Link } from "@material-ui/core";
import { GoogleLoginButton } from "react-social-login-buttons";
import styles from "./button.style";
function GoogleLogin(props) {
	const { classes } = props;
	return (
		<GoogleLoginButton>
			<Link href={"/auth/google"} color="inherit" className={classes.link}>
				Sign In With Google
			</Link>
		</GoogleLoginButton>
	);
}

export default withStyles(styles, { withTheme: true })(GoogleLogin);
