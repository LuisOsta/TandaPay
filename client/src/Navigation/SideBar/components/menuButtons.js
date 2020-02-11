import React from "react";
import {
	List,
	ListItem,
	withStyles,
	ListItemIcon,
	ListItemText
} from "@material-ui/core";
import clsx from "clsx";
import { Link, withRouter } from "react-router-dom";
import { nav, extra } from "./buttonConfig";
import styles from "./buttons.style";
const menuButtons = (props) => {
	const { classes, type } = props;
	const menuItems = type === "nav" ? nav.menuItems : extra.menuItems;
	const itemProps = type === "nav" ? nav.itemProps : extra.itemProps;
	const path = props.location.pathname.split("/");
	const routeSelected = path[2] === undefined ? "" : path[2];
	return (
		<List>
			{menuItems.map((text, index) => (
				<Link
					to={`/admin/${itemProps[text].url}`}
					className={classes.link}
					key={index}
				>
					<ListItem
						button
						key={text}
						className={clsx({
							[classes.selected]: itemProps[text].url === routeSelected
						})}
					>
						<ListItemIcon>{itemProps[text].icon}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				</Link>
			))}
		</List>
	);
};
export default withRouter(withStyles(styles, { withTheme: true })(menuButtons));
