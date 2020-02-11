import React from "react";
import { TextField } from "@material-ui/core/";

export default ({
	input: { name, onChange, value, ...restInput },
	meta,
	...rest
}) => (
	<TextField
		{...rest}
		name={name}
		fullWidth
		variant={"outlined"}
		helperText={meta.touched ? meta.error : undefined}
		error={meta.error && meta.touched}
		InputProps={restInput}
		onChange={onChange}
		value={value}
		margin="normal"
	/>
);
