import React from "react";
import { TextField, withStyles } from "@material-ui/core/";
import styles from "../../modal.style";
export default withStyles(styles, { withTheme: true })(
    ({ classes, input: { name, onChange, value }, meta, ...rest }) => (
        <TextField
            className={classes.field}
            {...rest}
            name={name}
            variant={"outlined"}
            helperText={meta.touched ? meta.error : undefined}
            error={meta.error && meta.touched}
            onChange={onChange}
            value={value}
        />
    )
);
