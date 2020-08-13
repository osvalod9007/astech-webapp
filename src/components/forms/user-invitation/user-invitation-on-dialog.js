import React, { useState, useEffect, memo } from "react";
import {
  Box,
  FormControl,
  Grid,
  Button,
  MenuItem,
  TextField,
  Select,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { validateBulkForm } from "./validate";
import { Form, Field } from "react-final-form";
import CustomDialog from "../../dialogs/custom-dialog";

function UserInvitationOnDialog({ handleSubmit, optionsRoles }) {
  const [errors, setErrors] = useState({});

  const errorTextToShow = Array.from(
    new Set(Object.values(errors).filter((v) => v !== "exist"))
  );

  useEffect(() => {
    return () => {
      setErrors({});
    };
  }, []);

  const existOne = Object.entries(errors).some((err) => err[1] === "exist");

  const handleClose = () => {
    const newErrors = Object.keys(errors)
      .filter((k) => errors[k] !== "exist")
      .map((l) => ({ [l]: errors[l] }))
      .reduce((a, b) => ({ ...a, ...b }), {});
    setErrors(newErrors);
  };

  const onSubmit = async (values) => {
    const errs = await validateBulkForm(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
    } else {
      const result = values["email-row-invitation"]
        .split(";")
        .map((clearSpace) => {
          return {
            email: clearSpace.trim(),
            role: values["role-row-invitation"],
          };
        });
      await handleSubmit(result);
    }
  };

  return (
    <div className="user-invitation-form-on-dialog">
      {errorTextToShow && (
        <CustomDialog open={existOne} onClose={handleClose}>
          <p>This email address already exists in this account</p>
        </CustomDialog>
      )}
      <Box margin={2}>
        <Form
          initialValues={{
            "role-row-invitation": 2,
          }}
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormControl className="form-control">
                    <InputLabel>Role</InputLabel>
                    <Field name="role-row-invitation">
                      {({ input }) => (
                        <>
                          {optionsRoles.length ? (
                            <Select
                              value={input.value}
                              onChange={input.onChange}
                              name={input.name}
                              label="Role"
                            >
                              {optionsRoles.map((op) => {
                                return (
                                  <MenuItem
                                    key={`role-row-invitation-${op.id}`}
                                    value={op.id.toString()}
                                  >
                                    {op.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          ) : null}
                        </>
                      )}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    className="form-control"
                    error={errors[`email-row-invitation`] ? true : false}
                  >
                    <Field name="email-row-invitation">
                      {({ input }) => (
                        <TextField
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Emails"
                          value={input.value}
                          onChange={input.onChange}
                          name={input.name}
                          multiline={true}
                          helperText="Use a ; to separate email addresses"
                        />
                      )}
                    </Field>
                  </FormControl>
                </Grid>
              </Grid>
              <Box>
                {Object.keys(errorTextToShow).length > 0 && (
                  <div className="bulk-error-text">
                    {errorTextToShow.map((errText) => (
                      <Typography key={errText}>{errText}</Typography>
                    ))}
                  </div>
                )}
                <Box margin="10px auto" textAlign="center">
                  <Button
                    className="default-button background-color-green text-color-white"
                    variant="contained"
                    type="submit"
                    disabled={submitting}
                  >
                    Send Invitation
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        />
      </Box>
    </div>
  );
}

export default memo(UserInvitationOnDialog);
