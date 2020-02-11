import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router-dom";
import styles from "./claims.style";
import ClaimsOverview from "./pages/ClaimsOverview";
import ClaimReview from "./pages/ClaimReview/ClaimReview";
import ClaimNew from "./pages/ClaimNew/ClaimNew";

class Claims extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Switch>
					<Route exact path="/admin/claims" component={ClaimsOverview} />
					<Route exact path="/admin/claims/new" component={ClaimNew} />
					<Route exact path="/admin/claims/:id" component={ClaimReview} />
				</Switch>
			</main>
		);
	}
}
export default withStyles(styles, { withTheme: true })(Claims);
