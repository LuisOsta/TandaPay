import React from "react";
import { Grid, Typography, Card, withStyles } from "@material-ui/core";
import moment from "moment";
import styles from "../review.style";
const ProfileCard = (props) => {
	const { classes, claim } = props;
	return (
		<Grid item xs={12} sm={6} className={classes.profileContainer}>
			<Card className={classes.card}>
				<Grid container>
					<Grid item xs={12} sm={5} className={classes.container}>
						<img
							src={claim.imageURL}
							className={classes.img}
							alt="User Profile"
						/>
					</Grid>
					<Grid item xs={12} sm={7} className={classes.container}>
						<div className={classes.userInfo}>
							<Typography>{claim.name}</Typography>
							<Typography variant="caption">
								{moment(claim.createdAt).format("MM/DD/YYYY")}
							</Typography>
							<Typography>USER STANDING</Typography>
						</div>
						<div className={classes.amountContainer}>
							<Typography variant="h5" className={classes.amount}>
								$ {claim.amount} claim
							</Typography>
						</div>
					</Grid>
				</Grid>
			</Card>
		</Grid>
	);
};

export default withStyles(styles, { withTheme: true })(ProfileCard);
