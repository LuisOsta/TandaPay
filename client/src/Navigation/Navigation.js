import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Tooltip,
	withStyles
} from "@material-ui/core";
import { Menu, Person, ExitToApp } from "@material-ui/icons";

import * as actions from "../actions";
import SideBar from "./SideBar/SideBar";
import styles from "./SideBar/sidebar.style";
class Navigation extends React.Component {
	state = {
		open: false
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleLogOut = () => {
		this.props.logOut();
	};
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: this.state.open
					})}
				>
					<Toolbar disableGutters={!this.state.open}>
						{this.renderMenuIcon()}
						{this.renderTitle()}
						{this.renderProfile()}
						{this.renderLogout()}
					</Toolbar>
				</AppBar>
				<SideBar
					onDrawerClose={this.handleDrawerClose}
					open={this.state.open}
				/>
			</div>
		);
	}

	renderLogout = () => {
		const { classes } = this.props;
		return (
			<Tooltip title="Logout">
				<IconButton
					className={classes.logOut}
					color="inherit"
					onClick={this.handleLogOut}
					aria-label="Logout"
				>
					<ExitToApp />
				</IconButton>
			</Tooltip>
		);
	};

	renderMenuIcon = () => {
		const { classes } = this.props;
		return (
			<IconButton
				color="inherit"
				aria-label="Open drawer"
				onClick={this.handleDrawerOpen}
				className={clsx(classes.menuButton, {
					[classes.hide]: this.state.open
				})}
			>
				<Menu />
			</IconButton>
		);
	};
	renderTitle = () => {
		const { classes } = this.props;
		return (
			<Typography variant="h6" color="inherit" noWrap className={classes.title}>
				Tanda Pay Dashboard
			</Typography>
		);
	};
	renderProfile = () => {
		const { classes } = this.props;
		return (
			<Tooltip title="My Profile">
				<Link to="/admin/profile" className={classes.link}>
					<IconButton color="inherit">
						<Person />
					</IconButton>
				</Link>
			</Tooltip>
		);
	};
}

Navigation.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};

export default connect(
	null,
	actions
)(withStyles(styles, { withTheme: true })(Navigation));
