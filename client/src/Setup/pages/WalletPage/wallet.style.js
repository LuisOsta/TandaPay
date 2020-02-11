const styles = (theme) => ({
	area: {
		margin: theme.spacing(5, 0),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	buttonGroup: {
		textAlign: "center",
		margin: theme.spacing(2)
	},
	button: {
		width: theme.spacing(15)
	},
	highlight: {
		color: theme.palette.warning.main,
		fontWeight: "bold",
		margin: theme.spacing(0, 0, 3, 0),
		textAlign: "center"
	},
	cancel: {
		backgroundColor: theme.palette.error.main,
		color: "white",
		"&:hover": {
			backgroundColor: theme.palette.error.light
		}
	},
	next: {
		backgroundColor: theme.palette.secondary.main,
		color: "white",
		"&:hover": {
			backgroundColor: theme.palette.secondary.light
		}
	},
	card: {
		padding: theme.spacing(3),
		margin: theme.spacing(0, 3),
		width: theme.spacing(40),
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	},
	cardContent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	img: {
		height: theme.spacing(20)
	},
	connect: {
		width: "100%"
	},
	connected: {
		backgroundColor: theme.palette.primary.main,
		color: "white",
		"&:hover": {
			backgroundColor: theme.palette.primary.dark
		}
	},
	loader: {
		color: "white"
	}
});

export default styles;
