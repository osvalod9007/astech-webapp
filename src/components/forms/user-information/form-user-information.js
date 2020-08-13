import React, { forwardRef } from "react";
import {
  Avatar,
  FormHelperText,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import { Form, Field } from "react-final-form";

function FormUserInformation({userAuthId, userInformation, optionsRoles, onSubmit, type, errors = {}, submitting },
  formRef
) {
  const colSpan = type === "from-user-profile" ? 12 : 6;

  const isFromUserList = type === "from-user-list" ? true : false;

  const activeDate =
    (type === "from-user-list" && userInformation.forwarded_invitation) ||
    (type === "from-user-profile" &&
      Math.min(
        userInformation.organizations.map((org) =>
          new Date(org["forwarded_invitation"]).getTime()
        )
      ));

  const handlerOnSubmit = async (values, form) => {
    await onSubmit(values, form);
  };

  return (
    <>
      <div className="user-information-content-avatar">
        {!isFromUserList && (
          <input
            style={{ display: "none" }}
            accept="image/*"
            id="contained-button-file"
            type="file"
          />
        )}
        <label htmlFor="contained-button-file">
          <IconButton component="span">
            <Avatar
              className="user-information-avatar"
              src={userInformation?.picture}
            />
          </IconButton>
        </label>
        <FormHelperText
          component="span"
          className="user-information-avatar-helper-text"
        >
          Click in the circle to select a photo
        </FormHelperText>
      </div>
      <Form
        initialValues={{
          ...userInformation,
          "active-date": activeDate,
          role: optionsRoles.length ? userInformation?.roles[0].id || "" : "",
          language: userInformation.language.name,
          phone_number:
            userInformation?.phone_number &&
            userInformation.phone_number[0] === "+"
              ? userInformation.phone_number.slice(1)
              : userInformation.phone_number,
        }}
        onSubmit={handlerOnSubmit}
        render={({ handleSubmit, form }) => {
          formRef.current = form;
          return (
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={isFromUserList ? 3 : 0}>
                <Grid
                  item
                  xs={12}
                  sm={colSpan}
                  className="form-user-information"
                >
                  <Field name={"first_name"}>
                    {({ input }) => (
                      <FormControl
                        className="form-control"
                        error={errors?.first_name ? true : false}
                      >
                        <TextField
                          required={!isFromUserList}
                          size="small"
                          label="First Name"
                          name={input.name}
                          value={input.value}
                          onChange={input.onChange}
                          InputProps={{
                            readOnly: isFromUserList,
                          }}
                          error={errors?.first_name ? true : false}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name={"last_name"}>
                    {({ input }) => (
                      <FormControl
                        className="form-control"
                        error={errors?.last_name ? true : false}
                      >
                        <TextField
                          required={!isFromUserList}
                          label="Last Name"
                          name={input.name}
                          value={input.value}
                          onChange={input.onChange}
                          InputProps={{
                            readOnly: isFromUserList,
                          }}
                          error={errors?.last_name ? true : false}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name={"email"}>
                    {({ input }) => (
                      <FormControl
                        className="form-control"
                        error={errors?.email ? true : false}
                      >
                        <TextField
                          label="Email"
                          required={!isFromUserList}
                          name={input.name}
                          value={input.value}
                          onChange={input.onChange}
                          InputProps={{
                            readOnly: isFromUserList,
                          }}
                          error={errors?.email ? true : false}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name={"phone_number"}
                    format={(value) => (value ? value.trim() : value)}
                  >
                    {({ input }) => (
                      <FormControl
                        className="form-control"
                        error={errors?.phone_number ? true : false}
                      >
                        <TextField
                          required={!isFromUserList}
                          label="Phone"
                          name={input.name}
                          value={input.value}
                          onChange={(event) => {
                            if (!isNaN(event.target.value)) {
                              input.onChange(event);
                            }
                          }}
                          InputProps={{
                            readOnly: isFromUserList,
                            startAdornment: "+",
                          }}
                          error={errors?.phone_number ? true : false}
                        />
                        <FormHelperText>E.g +12345678901</FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={colSpan}
                  className="form-user-information"
                >
                  <Field name="role">
                    {({ input }) => (
                      <FormControl
                        className="form-control"
                        error={errors?.role ? true : false}
                      >
                        <InputLabel>Role</InputLabel>
                        <Select
                          label="Role"
                          name={input.name}
                          value={input.value.toString()}
                          onChange={input.onChange}
                          inputProps={{
                            readOnly: !isFromUserList || userAuthId === userInformation.id,
                          }}
                          error={errors?.role ? true : false}
                        >
                          {optionsRoles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="language">
                    {({ input }) => (
                      <FormControl
                        className="form-control"
                        error={errors?.language ? true : false}
                      >
                        <TextField
                          label="Prefered Language"
                          name={input.name}
                          value={input.value}
                          onChange={input.onChange}
                          InputProps={{
                            readOnly: true,
                          }}
                          error={errors?.language ? true : false}
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="active-date"
                    format={(value) =>
                      value ? new Date(value).toDateString() : ""
                    }
                  >
                    {({ input }) => (
                      <FormControl
                        className="form-control"
                        error={errors?.active_date ? true : false}
                      >
                        <TextField
                          label="Active Date"
                          name={input.name}
                          value={input.value}
                          onChange={input.onChange}
                          InputProps={{
                            readOnly: true,
                          }}
                          error={errors?.active_date ? true : false}
                        />
                      </FormControl>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={colSpan}></Grid>
              </Grid>
              <Box margin="40px auto" textAlign="center">
                <Button
                  endIcon={
                    submitting && (
                      <CircularProgress
                        size="small"
                        classes={{
                          root: "button-submitting-spinner",
                        }}
                      />
                    )
                  }
                  className={`default-button ${
                    submitting ? "button-submitting" : ""
                  } background-color-green-hover background-color-green text-color-white`}
                  type="submit"
                  // disabled={submitting}
                >
                  Save Changes
                </Button>
              </Box>
            </form>
          );
        }}
      />
    </>
  );
}

export default forwardRef(FormUserInformation);
