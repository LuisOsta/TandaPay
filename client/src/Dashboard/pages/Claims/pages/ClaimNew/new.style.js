const styles = (theme) => ({
	summary: {
		width: "80%",
		margin: "0",
		[theme.breakpoints.down("xs")]: {
			width: "100%"
		}
	},
	button: {
		margin: theme.spacing(1)
	},
	input: {
		display: "none"
	},
	container: {
		marginTop: theme.spacing(5)
	}
});

export default styles;
