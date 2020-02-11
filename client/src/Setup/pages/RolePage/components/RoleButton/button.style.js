const styles = (theme) => ({
	area: {
		margin: theme.spacing(5, 0),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	icon: {
		fontSize: theme.spacing(15),
		color: "darkgrey"
	},
	iconSelected: {
		color: theme.palette.primary.main
	},
	iconButton: {
		borderColor: "lightgrey",
		borderStyle: "solid",
		border: theme.spacing(0.3),
		padding: theme.spacing(3),
		margin: theme.spacing(3)
	},
	buttonSelected: {
		borderColor: theme.palette.primary.main
	},
	caption: {
		textAlign: "center",
		color: "darkgrey"
	}
});

export default styles;
