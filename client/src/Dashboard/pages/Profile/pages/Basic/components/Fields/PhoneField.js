import React from "react";
import TextField from "./styled/TextField";
import { Field } from "react-final-form";
import { isMobilePhone } from "validator";
const validate = value => {
  if (value === undefined) {
    return undefined;
  }
  if (value !== undefined && isMobilePhone(value)) {
    return undefined;
  } else {
    return "Invalid Phone Number";
  }
};
function PhoneField() {
  return (
    <Field
      name="phone"
      label="Phone Number"
      type="text"
      id="phone-field"
      component={TextField}
      validate={validate}
    />
  );
}

export default PhoneField;
