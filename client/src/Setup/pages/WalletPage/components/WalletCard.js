import React from "react";
import {
	withStyles,
	Grid,
	Card,
	CardContent,
	Typography,
	Button,
	CircularProgress
} from "@material-ui/core";
import clsx from "clsx";
import styles from "./card.style";
class WalletCard extends React.Component {
	render() {
		const {
			classes,
			IconSrc,
			handleClick,
			type,
			loading,
			selected
		} = this.props;
		return (
			<Grid item xs={12} sm={6} className={classes.area}>
				<Card className={classes.card}>
					<img
						src={IconSrc}
						className={classes.img}
						alt={type}
						title={type}
						aria-label={type}
					/>

					<CardContent className={classes.cardContent}>
						<Typography variant="h6" className={classes.highlight}>
							{type === "metamask" ? "Advanced Users" : "Recommended"}
						</Typography>
						<Button
							variant="outlined"
							color="primary"
							onClick={handleClick}
							className={clsx(classes.connect, {
								[classes.connected]: selected === type
							})}
						>
							{loading === true && (
								<CircularProgress className={classes.loader} />
							)}
							{selected === type && loading === false
								? "Connected"
								: loading === false && "Connect"}
						</Button>
					</CardContent>
				</Card>
			</Grid>
		);
	}
}
export default withStyles(styles, { withTheme: true })(WalletCard);
