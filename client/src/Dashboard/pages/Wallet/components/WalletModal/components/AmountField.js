import React from "react";
import TextField from "./styled/TextField";
import { Field } from "react-final-form";
import { InputAdornment } from "@material-ui/core";
import { isNumeric } from "validator";
const validate = value => {
  if (value !== undefined && isNumeric(value)) {
    return undefined;
  } else {
    return "Invalid Amount";
  }
};
function AmountField() {
  return (
    <Field
      name="amount"
      required
      label="Amount To Send"
      type="text"
      id="amount-field"
      component={TextField}
      validate={validate}
      InputProps={{
        startAdornment: <InputAdornment position="start">ETH</InputAdornment>,
      }}
    />
  );
}

export default AmountField;
