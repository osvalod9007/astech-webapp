import React, { useState, Fragment, memo } from "react";
import { validateForm } from "./validate";
import {
  Paper,
  Typography,
  Grid,
  FormControl,
  TextField,
  Box,
  Button,
} from "@material-ui/core";
import InputSelectRoles from "./input-select-roles";
import CustomDialog from "../../dialogs/custom-dialog";
import { userInvitationFormTitle } from "../../pages/content/users/texts";

const listElements = Array(8)
  .fill("row-invitation")
  .map((el, i) => `${el}-${i + 1}`);

const defaultSelectValues = Array(8)
  .fill("role-row-invitation")
  .map((_, i) => ({ [`${_}-${i + 1}`]: "2" }))
  .reduce((a, b) => ({ ...a, ...b }), {});

function UserInvitationForm({ submitInvitation, optionsRoles }) {
  const [formValues, setFormValues] = useState(defaultSelectValues);

  const [errors, setErrors] = useState({});

  const errorTextToShow = Array.from(
    new Set(Object.values(errors).filter((v) => v !== "exist"))
  );

  const existOne = Object.entries(errors).some((err) => err[1] === "exist");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorsResult = await validateForm(formValues);
    if (Object.entries(errorsResult).length) {
      setErrors(errorsResult);
    } else {
      const aux = Object.keys(formValues)
        .filter((k) => k.includes("email") && !!formValues[k])
        .map((l) => {
          const splt = l.split("email")[1];
          const roleIndex = `role${splt}`;
          return { email: formValues[l], role: formValues[roleIndex] };
        });
      await submitInvitation(aux);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValues = formValues;
    const oldErrors = { ...errors };
    newValues[name] = value;
    setFormValues(newValues);
    delete oldErrors[name];
    setErrors(oldErrors);
  };

  const handleClose = () => {
    const newErrors = Object.keys(errors)
      .filter((k) => errors[k] !== "exist")
      .map((l) => ({ [l]: errors[l] }))
      .reduce((a, b) => ({ ...a, ...b }), {});
    setErrors(newErrors);
  };

  return (
    <div>
      {errorTextToShow && (
        <CustomDialog open={existOne} onClose={handleClose}>
          <p>This email address already exists in this account</p>
        </CustomDialog>
      )}
      <div className="user-invitation-form">
        {Object.keys(errorTextToShow).length > 0 && (
          <Paper className="error-text">
            {errorTextToShow.map((errText) => (
              <Typography key={errText}>{errText}</Typography>
            ))}
          </Paper>
        )}
        <Typography className="title-text">{userInvitationFormTitle}</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            {listElements.map((item) => (
              <Fragment key={item}>
                <Grid item xs={9}>
                  <FormControl
                    className="form-control"
                    error={errors[`email-${item}`] ? true : false}
                  >
                    <TextField
                      name={`email-${item}`}
                      value={formValues[`email-${item}`] || ""}
                      onChange={handleChange}
                      label="Email"
                      error={errors[`email-${item}`] ? true : false}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <InputSelectRoles
                    options={optionsRoles}
                    name={`role-${item}`}
                    formValues={formValues}
                    handleSelect={setFormValues}
                    errors={errors}
                    setErrors={setErrors}
                  />
                </Grid>
              </Fragment>
            ))}
          </Grid>
          <Box margin="10px auto">
            <Button
              className="default-button background-color-green text-color-white"
              variant="contained"
              type="submit"
            >
              Send Invitation
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default memo(UserInvitationForm);
