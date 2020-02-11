import React from "react";
import { TextField, withStyles } from "@material-ui/core/";
import styles from "../../form.style";
export default withStyles(styles, { withTheme: true })(
  ({
    classes,
    input: { name, onChange, value, type, InputProps, ...restInput },
    meta,
    ...rest
  }) => (
    <TextField
      color="primary"
      {...rest}
      name={name}
      type={type}
      variant={"outlined"}
      helperText={meta.touched ? meta.error : undefined}
      error={meta.error && meta.touched}
      onChange={onChange}
      value={value}
      fullWidth
      margin="normal"
      inputProps={restInput}
    />
  )
);
