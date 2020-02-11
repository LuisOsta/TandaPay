import React from "react";
import { Button, withStyles, Grid } from "@material-ui/core";
import clsx from "clsx";
import styles from "./button.style";

class ButtonGroup extends React.Component {
	render() {
		const { handleNext, handlePrevious, classes, page, disabled } = this.props;
		return (
			<Grid container className={classes.buttonGroup}>
				<Grid item xs={6} className={classes.cancelButton}>
					<Button
						variant="contained"
						className={clsx(classes.button, classes.cancel)}
						onClick={handlePrevious}
					>
						{page === 0 ? "Cancel" : "Previous"}
					</Button>
				</Grid>
				<Grid item xs={6} className={classes.nextButton}>
					<Button
						variant="contained"
						color="primary"
						disabled={disabled}
						className={clsx(classes.button, classes.next)}
						onClick={handleNext}
					>
						{page === 0 ? "Next" : "Save"}
					</Button>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles, { withTheme: true })(ButtonGroup);
