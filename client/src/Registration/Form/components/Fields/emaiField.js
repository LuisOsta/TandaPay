import React from "react";
import TextField from "./styled/TextField";
import { Field } from "react-final-form";
import { isEmail } from "validator";
const validate = (value) => {
	if (value !== undefined && isEmail(value)) {
		return undefined;
	} else {
		return "Invalid Email";
	}
};
function EmailField() {
	return (
		<Field
			name="email"
			required
			label="Email"
			type="email"
			id="email"
			component={TextField}
			validate={validate}
		/>
	);
}

export default EmailField;
