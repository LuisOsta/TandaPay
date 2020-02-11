const styles = (theme) => ({
	topSection: {
		marginTop: theme.spacing(3)
	},
	card: {
		padding: theme.spacing(3),
		margin: theme.spacing(0, 3),
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
	},
	profileContainer: {
		display: "flex"
	},
	userInfo: {
		display: "flex",
		flexDirection: "column",
		marginLeft: theme.spacing(7)
	},
	img: {
		height: theme.spacing(30),
		backgroundColor: "darkgrey",
		width: "100%",
		borderRadius: theme.spacing(1)
	},
	amountContainer: {
		alignSelf: "flex-end"
	},
	amount: {
		color: theme.palette.money.main,
		fontWeight: "bold"
	},
	container: {
		display: "flex",
		padding: "0"
	}
});

export default styles;
