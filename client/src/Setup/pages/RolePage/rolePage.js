import React from "react";
import { Grid, Typography, withStyles } from "@material-ui/core";
import { RoleButton, CodeField } from "./components";
import ButtonGroup from "../components/ButtonGroup/";
import styles from "./role.style";
class RolePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			role: props.role,
			accessCode: props.accessCode
		};
	}

	render() {
		const { classes } = this.props;
		const { role, accessCode } = this.state;
		const formCompleted =
			role === "secretary" || (role === "policyholder" && accessCode);
		return (
			<div>
				<Typography variant="h3" className={classes.title}>
					How will you be using TandaPay?
				</Typography>
				<Grid container>
					<RoleButton
						handleClick={this.onPolicyClick}
						role={role}
						type="policyholder"
					/>
					<RoleButton
						handleClick={this.onSecretaryClick}
						role={role}
						type="secretary"
					/>
				</Grid>
				{role === "policyholder" && (
					<CodeField
						accessCode={accessCode}
						handleCodeChange={this.handleCodeChange}
					/>
				)}

				<ButtonGroup
					handleNext={this.handleNext}
					handlePrevious={this.props.previousPage}
					page={0}
					disabled={!formCompleted}
				/>
			</div>
		);
	}

	handleNext = () => {
		const { role, accessCode } = this.state;
		this.props.onPageSubmit(role, accessCode);
	};

	handleCodeChange = (event) => {
		this.setState({
			accessCode: event.target.value
		});
	};
	onPolicyClick = () => {
		const { role } = this.state;
		if (role !== "policyholder") {
			this.setState({
				role: "policyholder"
			});
		}
	};

	onSecretaryClick = () => {
		const { role } = this.state;
		if (role !== "secretary") {
			this.setState({
				role: "secretary"
			});
		}
	};
}

export default withStyles(styles, { withTheme: true })(RolePage);
