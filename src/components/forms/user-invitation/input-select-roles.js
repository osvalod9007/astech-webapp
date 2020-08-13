import React, { memo } from "react";
import { InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";

function SelectInputRoles({
  name,
  formValues,
  options,
  errors,
  handleSelect,
  setErrors
}) {
  const handleChange = (event) => {
    const { value } = event.target;
    const newValues = {...formValues};
    const oldErrors = { ...errors };
    newValues[name] = value;
    handleSelect(newValues);
    delete oldErrors[name];
    setErrors(oldErrors);
  };

  return (
    <>
      <FormControl
        className="form-control"
        size="medium"
        error={errors[name] ? true : false}
      >
        <InputLabel id={`label-${name}`}>Role</InputLabel>
        {options.length ? (
          <Select
            error={errors[name] ? true : false}
            onChange={handleChange}
            name={name}
            value={formValues[name] || ""}
          >
            <MenuItem key={`${name}--1`} value={""}>Select a Role</MenuItem>
            {options.map((op) => {
              return (
                <MenuItem key={`${name}-${op.id}`} value={op.id.toString()}>
                  {op.name}
                </MenuItem>
              );
            })}
          </Select>
        ) : null}
      </FormControl>
    </>
  );
}

export default memo(SelectInputRoles);
