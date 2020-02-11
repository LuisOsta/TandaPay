import React from "react";
import TextField from "./styled/TextField";
import { Field } from "react-final-form";
import { InputAdornment } from "@material-ui/core";
import { isNumeric } from "validator";
const validate = value => {
  if (value !== undefined && isNumeric(value)) {
    return undefined;
  } else {
    return "Invalid Address";
  }
};
function AddresField() {
  return (
    <Field
      name="address"
      required
      label="Address of Recipient"
      type="text"
      id="amount-field"
      component={TextField}
      validate={validate}
      InputProps={{
        startAdornment: <InputAdornment position="start">0x</InputAdornment>,
      }}
    />
  );
}

export default AddresField;
