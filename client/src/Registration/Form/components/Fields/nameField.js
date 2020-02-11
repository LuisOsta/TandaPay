import React from "react";
import TextField from "./styled/TextField";
import { Field } from "react-final-form";

const validate = (value) => {
	const valid = value !== undefined;
	if (valid) {
		return undefined;
	} else {
		return "You must provide a name.";
	}
};
function PasswordField() {
	return (
		<Field
			name="name"
			required
			label="Name"
			type="text"
			id="name"
			component={TextField}
			validate={validate}
		/>
	);
}

export default PasswordField;
