import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography } from "@material-ui/core/";

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing(5),
		borderRadius: theme.spacing(1),
		boxShadow: "1px 1px 5px darkgrey"
	}
}));

export default function SimpleTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	function handleChange(event, newValue) {
		setValue(newValue);
	}

	return (
		<div className={classes.root}>
			<Tabs value={value} onChange={handleChange}>
				<Tab label="Documents" />
				<Tab label="Images" />
				<Tab label="Guide" />
			</Tabs>
			{value === 0 && <TabContainer>Item One</TabContainer>}
			{value === 1 && <TabContainer>Item Two</TabContainer>}
			{value === 2 && <TabContainer>Item Three</TabContainer>}
		</div>
	);
}
