const styles = (theme) => ({
	buttonGroup: {
		textAlign: "center",
		margin: theme.spacing(5, 0, 2, 0)
	},
	button: {
		width: theme.spacing(15)
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
	}
});

export default styles;
