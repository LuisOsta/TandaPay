import React from "react";
import { withStyles, Card, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import clsx from "clsx";
import moment from "moment";
import styles from "./card.styles";
const ClaimCard = (props) => {
	const { classes, claim } = props;
	return (
		<Card className={classes.card}>
			<img src={claim.imageURL} className={classes.img} alt="User Profile" />
			<div className={classes.container}>
				<Typography className={classes.name}>{claim.name}</Typography>
				<Typography className={classes.amount}>$ {claim.amount}</Typography>
			</div>
			<Typography variant="caption">
				{moment(claim.createdAt).format("MM/DD/YYYY")}
			</Typography>
			<div className={classes.container}>
				<Typography
					className={clsx(classes.status, {
						[classes.pending]: claim.status === "pending",
						[classes.denied]: claim.status === "denied",
						[classes.approved]: claim.status === "approved"
					})}
				>
					{claim.status.toUpperCase()}
				</Typography>
				<Button
					variant="contained"
					className={classes.button}
					to={`/admin/claims/${claim.objectID}`}
					component={RegLink}
				>
					REVIEW
				</Button>
			</div>
		</Card>
	);
};

const RegLink = React.forwardRef((props, ref) => (
	<Link innerRef={ref} {...props} />
));

export default withStyles(styles, { withTheme: true })(ClaimCard);
