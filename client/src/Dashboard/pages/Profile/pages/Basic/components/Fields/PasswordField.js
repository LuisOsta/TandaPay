import React from "react";
import TextField from "./styled/TextField";
import { InfoOutlined } from "@material-ui/icons";
import { InputAdornment, IconButton } from "@material-ui/core";
import { Field } from "react-final-form";
import FieldPopper from "./FieldPopper";

const validate = value => {
  const valid = value !== undefined && value.length >= 8;
  if (value === undefined) {
    return undefined;
  } else if (valid) {
    return undefined;
  } else {
    return "Invalid Password";
  }
};
function PasswordField(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "email-popper" : undefined;

  function handleAdorn(event) {
    if (open) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  }
  return (
    <React.Fragment>
      <Field
        name={props.name}
        label={props.label}
        type="password"
        id={props.name}
        component={TextField}
        validate={validate}
        disabled={props.disabled}
        InputProps={{
          endAdornment: <FieldAdornment handleAdorn={handleAdorn} />
        }}
      />
      <FieldPopper
        anchorEl={anchorEl}
        id={id}
        open={open}
        disabled={props.disabled}
      />
    </React.Fragment>
  );
}

const FieldAdornment = props => {
  const { handleAdorn } = props;
  return (
    <InputAdornment position="end">
      <IconButton onMouseEnter={handleAdorn} onMouseLeave={handleAdorn}>
        <InfoOutlined />
      </IconButton>
    </InputAdornment>
  );
};

export default PasswordField;
