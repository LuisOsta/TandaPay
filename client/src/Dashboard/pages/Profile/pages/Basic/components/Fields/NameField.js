import React from "react";
import TextField from "./styled/TextField";
import { Field } from "react-final-form";
import { isEmpty } from "validator";
const validate = value => {
  if (value !== undefined && !isEmpty(value)) {
    return undefined;
  } else {
    return "Must Provide Name";
  }
};
function NameField() {
  return (
    <Field
      name="name"
      label="My Name"
      type="text"
      id="name-field"
      component={TextField}
      validate={validate}
    />
  );
}

export default NameField;
