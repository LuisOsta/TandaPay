import React from "react";
import { withStyles, TextField } from "@material-ui/core";
import styles from "./code.style";
function CodeField(props) {
	const { accessCode, handleCodeChange, classes } = props;
	return (
		<TextField
			id="access-code"
			label="Access Code"
			type="text"
			value={accessCode}
			onChange={handleCodeChange}
			margin="normal"
			variant="outlined"
			className={classes.access}
		/>
	);
}

export default withStyles(styles, { withTheme: true })(CodeField);
