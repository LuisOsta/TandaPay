import React from "react";
import TextField from "./styled/TextField";
import { Field } from "react-final-form";

const validate = (value) => {
	const valid = value !== undefined && value.length >= 8;
	if (valid) {
		return undefined;
	} else {
		return "Invalid Password";
	}
};
function PasswordField() {
	return (
		<Field
			name="password"
			required
			label="Password"
			type="password"
			id="password"
			component={TextField}
			validate={validate}
		/>
	);
}

export default PasswordField;
