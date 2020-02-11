const styles = (theme) => ({
	link: {
		textDecoration: "none",
		color: "inherit"
	},
	selected: {
		borderLeft: `${theme.spacing(0.5)}px solid ${theme.palette.warning.dark}`
	}
});

export default styles;
